import { sendWechatNotification } from "../utils/offlineChecker.js";
import { sendSmsNotification } from "../utils/smsSender.js";
import { recordThresholdEvent, findOpenEventsByTbmAndParam, findOpenEventsByTbm, autoResolveEvents } from "./alertsRepository.js";
import { getTbmMetadata, getParameterMetadata } from "../datastore/metadataStore.js";

const MONITORED_KEYS = ["s100206003", "s100206004", "s100206006", "s100206007"];
const THRESHOLD = 50;
const NOTIFY_COOLDOWN = 10 * 60 * 1000; // 10 minutes
const CRITICAL_THRESHOLD = 80;
const RING_KEY = "s100100008";

const normalizeValue = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
};
const shouldSendNotification = (/* placeholder kept for compatibility */) => true;

export const notifyRealdataThreshold = async (tbmcode, payload) => {
    if (!payload || typeof payload !== "object") {
        console.log(
            "[RealdataNotifier] Skipping payload for",
            tbmcode,
            "because it is not an object:",
            payload
        );
        return;
    }

    const exceeded = MONITORED_KEYS.reduce((acc, key) => {
        const normalized = normalizeValue(payload[key]);
        if (normalized !== null && Math.abs(normalized) > THRESHOLD) {
            acc.push({ key, value: normalized });
        }
        return acc;
    }, []);

    if (!exceeded.length) {
        return;
    }

    // Previously we used an in-memory cooldown/growth check. New logic: consult DB open events
    // for this TBM and the same ring. If open events exist for the same ring and there is no
    // escalation, suppress the notification. We'll fetch open events below and use them.

    const metadata = getTbmMetadata(tbmcode);
    const headerParts = [metadata?.projectShortName, metadata?.tunnelName, metadata?.tbmName].filter(Boolean);
    const readableName = headerParts.length ? headerParts.join(" / ") : tbmcode || "未知设备";

    const ringRaw = payload[RING_KEY];
    const ringMeta = getParameterMetadata(RING_KEY);
    const ringLabel = ringMeta?.name || "当前环号";
    const ringDisplay = ringRaw ?? "-";

    const exceededInfo = exceeded.reduce((acc, { key, value }) => {
        acc[key] = {
            abs: Math.abs(value),
            severity:
                Math.abs(value) > CRITICAL_THRESHOLD
                    ? "critical"
                    : "warning",
        };
        return acc;
    }, {});

    // Build details lines exactly in the requested format: one line per monitored key,
    // append unit if available, and append a flag for warning/critical when applicable.
    const detailsLines = MONITORED_KEYS.map((key) => {
        const rawValue = payload[key];
        const paramMeta = getParameterMetadata(key);
        const label = paramMeta?.name || key;
        const unit = paramMeta?.unit ? ` ${paramMeta.unit}` : "";
        const displayValue = rawValue ?? "-";
        const info = exceededInfo[key];
        let flag = "";
        if (info) {
            flag = info.severity === "critical" ? " 🚨严重超限" : " ⚠️超限";
        }
        return `${label}: ${displayValue}${unit}${flag}`;
    });

    const highestSeverity = Object.values(exceededInfo).some((info) => info.severity === "critical")
        ? "严重超限"
        : "超限";

    // Header format per user: emoji + readableName + 导向环号 + 导向指标超限（>50）
    const header = `😟 ${readableName} / 导向环号: ${ringDisplay} 导向指标${highestSeverity}（>${THRESHOLD}）`;
    const message = `${header}\n${detailsLines.join("\n")}`;

    // Log final message for local verification
    console.log('[RealdataNotifier] WeChat message:\n' + message);

    const metricsForStorage = MONITORED_KEYS.map((key) => {
        const paramMeta = getParameterMetadata(key);
        const normalized = normalizeValue(payload[key]);
        const info = exceededInfo[key];
        const severity = info ? info.severity : "normal";

        return {
            paramCode: key,
            paramName: paramMeta?.name ?? null,
            value: normalized,
            unit: paramMeta?.unit ?? null,
            threshold: THRESHOLD,
            severity,
        };
    });


    // Bulk fetch open events for this TBM to reduce DB calls
    const { events: openEvents, byParam, byEvent } = await findOpenEventsByTbm(tbmcode);

    // Early suppression: if for all metrics that exceed, there already exists an open event
    // on the same ring and none of them require escalation to critical, then suppress.
    const existingMetricsOnSameRing = metricsForStorage.filter((metric) => {
        const existingAll = byParam[metric.paramCode] || [];
        const existingSameRing = existingAll.filter((e) => String(e.ring_no) === String(ringDisplay));
        return existingSameRing && existingSameRing.length > 0;
    });

    // If every exceeded metric already has an open event on same ring, and none are escalation -> suppress
    const anyNeedsCreation = metricsForStorage.some((metric) => {
        const existingAll = byParam[metric.paramCode] || [];
        const existingSameRing = existingAll.filter((e) => String(e.ring_no) === String(ringDisplay));
        const anyCriticalOpen = existingSameRing.some((e) => e.severity === "critical");
        // create if no existing on same ring, or escalation to critical
        if (!existingSameRing || existingSameRing.length === 0) return true;
        if (anyCriticalOpen) return false;
        if (metric.severity === "critical") return true;
        return false;
    });

    if (!anyNeedsCreation) {
        console.log(`[RealdataNotifier] ${tbmcode} ring ${ringDisplay} already has open warnings for these params; suppressing duplicate notification.`);
        return;
    }

    // Decide which metrics actually require creating a new event (or escalation to critical).
    // We will create a single event per notification payload and store multiple metric rows in
    // `realtime_threshold_event_metrics` rather than creating one event per metric.
    const metricsToCreate = [];
    for (const metric of metricsForStorage) {
        const param = metric.paramCode;
        const existingAll = byParam[param] || [];
        const existingSameRing = existingAll.filter((e) => String(e.ring_no) === String(ringDisplay));

        const anyCriticalOpen = existingSameRing.some((e) => e.severity === "critical");

        const includeMetric = (() => {
            // no open event for this param on the same ring -> include
            if (!existingSameRing || existingSameRing.length === 0) return true;
            // there is a critical open on same ring -> skip
            if (anyCriticalOpen) return false;
            // open events on same ring are warnings; only include if current is critical (escalation)
            if (metric.severity === "critical") return true;
            return false;
        })();

        if (includeMetric) metricsToCreate.push(metric);
    }

    // If there is nothing to create (all params already have open warnings on same ring and no escalation),
    // suppress notification to avoid repeated broadcasts for the same ring.
    if (metricsToCreate.length === 0) {
        console.log(`[RealdataNotifier] ${tbmcode} ring ${ringDisplay} already has open warnings for these params; suppressing duplicate notification.`);
        return;
    }

    // Build a single event that captures all metrics that need to be created.
    const overallSeverity = metricsToCreate.some((m) => m.severity === "critical") ? "critical" : "warning";
    const metricNames = metricsToCreate.map((m) => m.paramName || m.paramCode).join(", ");
    const messageForEvent = `${readableName} ${metricNames} 超限 (${overallSeverity === "critical" ? "严重" : "普通"})`;

    try {
        await recordThresholdEvent({
            tbmcode,
            ringNo: ringDisplay,
            severity: overallSeverity,
            message: messageForEvent,
            payload,
            metrics: metricsToCreate,
        });
    } catch (err) {
        console.error(`[RealdataNotifier] Failed to record threshold event for ${tbmcode}:`, err);
    }

    try {
        // Use bulk results to find open warning events
        const openWarnings = (openEvents || []).filter((e) => e.severity === "warning");
        const toResolve = [];

        for (const ev of openWarnings) {
            const paramsForEvent = byEvent[ev.id] || [];
            let allBelow = true;
            for (const code of paramsForEvent) {
                const val = normalizeValue(payload[code]);
                if (val === null || Math.abs(val) > THRESHOLD) {
                    allBelow = false;
                    break;
                }
            }
            if (allBelow) toResolve.push(ev.id);
        }

        if (toResolve.length) {
            await autoResolveEvents(toResolve);
            console.log(`[RealdataNotifier] Auto-resolved events:`, toResolve);
        }
    } catch (err) {
        console.error('[RealdataNotifier] Auto-resolve check failed:', err);
    }

    // notification state is managed via DB open events; no in-memory update needed here

    try {
        await sendWechatNotification(message);
    } catch (err) {
        console.error(`[RealdataNotifier] Failed to send WeChat notification for ${tbmcode}:`, err);
    }
};
