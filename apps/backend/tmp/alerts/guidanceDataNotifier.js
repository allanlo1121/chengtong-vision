import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { getTbmMetadata, getParameterMetadata } from "../datastore/metadataStore.js";

const ALERT_TYPE_CODE = 'guidance';
// simple in-memory map to prevent concurrent processing for the same tbm:ring:type
const inflightLocks = new Map();
const MONITORED_KEYS = ["s100206003", "s100206004", "s100206006", "s100206007"];
const THRESHOLD = 50;
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
        console.log(`[Flow] NOT_EXCEEDED tbm=${tbmcode} exceeded=0`);
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

    // short-circuit if there's already an in-flight write for this tbm:ring:type
    const lockKey = `${tbmcode}:${ringDisplay}:${ALERT_TYPE_CODE}`;
    if (inflightLocks.get(lockKey)) {
        console.log(`[RealdataNotifier] Skipping processing for ${lockKey} because a previous write is in-flight.`);
        return;
    }
    // mark in-flight and ensure release in finally
    inflightLocks.set(lockKey, true);
    try {

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
        console.log(`[Flow] EXCEEDED tbm=${tbmcode} ring=${ringDisplay} params=${exceeded.map(e => e.key).join(',')}`);

        // Only include metrics that actually exceeded thresholds (from `exceeded` array)
        const metricsForStorage = exceeded.map(({ key, value }) => {
            const paramMeta = getParameterMetadata(key);
            const normalized = normalizeValue(payload[key]);
            const info = exceededInfo[key];
            const severity = info ? info.severity : "warning"; // default to warning if present in exceeded

            return {
                paramCode: key,
                paramName: paramMeta?.name ?? null,
                value: normalized,
                unit: paramMeta?.unit ?? null,
                threshold: THRESHOLD,
                severity,
            };
        });


        // Build an event body and publish to the generic event bus topic 'alerts.guidance'.
        // Do NOT include a human-readable `message` here; the persistence/processing layer
        // will synthesize the message from `metrics` and metadata.
        const highestSeverityFlag = Object.values(exceededInfo).some((info) => info.severity === "critical") ? 'critical' : 'warning';
        const eventBody = {
            tbmcode,
            ringNo: ringDisplay,
            severity: highestSeverityFlag,
            payload,
            metrics: metricsForStorage,
            meta: { rawExceeded: exceeded }
        };

        try {
            const ev = createEvent('alerts.guidance', eventBody);
            console.log(`[Flow] PUBLISH_EVENT tbm=${tbmcode} ring=${ringDisplay} severity=${ev.severity} params=${exceeded.map(e => e.key).join(',')}`);
            publishEvent('alerts.guidance', ev);
        } catch (err) {
            console.error('[RealdataNotifier] failed to create/publish event to bus:', err);
        }
    } finally {
        // release inflight lock
        inflightLocks.delete(lockKey);
    }
};

