import { sendWechatNotification } from "./offlineChecker.js";
import { sendSmsNotification } from "./smsSender.js";
import { recordThresholdEvent, findOpenEventsByTbmAndParam, autoResolveEvents } from "../alerts/alertsRepository.js";
import { getTbmMetadata, getParameterMetadata } from "../datastore/metadataStore.js";

const MONITORED_KEYS = ["s100206003", "s100206004", "s100206006", "s100206007"];
const THRESHOLD = 50;
const NOTIFY_COOLDOWN = 10 * 60 * 1000; // 10 minutes
const CRITICAL_THRESHOLD = 80;
const RING_KEY = "s100100008";

// 记录每台设备最近一次通知的时间及对应指标的绝对值
const lastNotificationState = new Map();

const normalizeValue = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
};

const shouldSendNotification = (tbmcode, exceeded) => {
    const now = Date.now();
    const record = lastNotificationState.get(tbmcode);

    if (!record) {
        return true;
    }

    const absValues = exceeded.map(({ key, value }) => ({ key, abs: Math.abs(value) }));

    const hasGrowth = absValues.some(({ key, abs }) => {
        const previous = record.values?.[key];
        return previous === undefined || abs > previous;
    });

    if (hasGrowth) {
        return true;
    }

    if (now - record.timestamp >= NOTIFY_COOLDOWN) {
        return true;
    }

    // 记录最新的最大绝对值，便于后续比较
    absValues.forEach(({ key, abs }) => {
        const currentValues = record.values ?? {};
        currentValues[key] = Math.max(currentValues[key] ?? 0, abs);
        record.values = currentValues;
    });
    lastNotificationState.set(tbmcode, record);

    return false;
};

const updateNotificationState = (tbmcode, exceeded) => {
    const absValues = exceeded.reduce((acc, { key, value }) => {
        acc[key] = Math.abs(value);
        return acc;
    }, {});

    lastNotificationState.set(tbmcode, {
        timestamp: Date.now(),
        values: absValues,
    });
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
        // console.log(
        //     `[RealdataNotifier] ${tbmcode} ${key}:`,
        //     payload[key]
        // );
        if (normalized !== null && Math.abs(normalized) > THRESHOLD) {
            acc.push({ key, value: normalized });
        }
        return acc;
    }, []);

    if (!exceeded.length) {
        // console.log(`[RealdataNotifier] ${tbmcode} no values exceeded threshold.`);
        return;
    }

    // console.log(
    //     `[RealdataNotifier] ${tbmcode} exceeded entries:`,
    //     exceeded
    // );

    if (!shouldSendNotification(tbmcode, exceeded)) {
        console.log(
            `[RealdataNotifier] ${tbmcode} notification suppressed (cooldown without growth).`
        );
        return;
    }

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

    const details = MONITORED_KEYS.map((key) => {
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
    }).join("\n");

    const highestSeverity = Object.values(exceededInfo).some((info) => info.severity === "critical")
        ? "严重超限"
        : "超限";

    const message = `😟 ${readableName} ${ringLabel}: ${ringDisplay} 导向指标${highestSeverity}（>${THRESHOLD}）\n${details}`;

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
            range: [-THRESHOLD, THRESHOLD],
        };
    });

    // For each exceeded param decide whether to create a new event:
    // - If there is an open event for this tbm+param and it's not acknowledged, skip creating a new event.
    // - If existing open event is warning and current severity is critical, create a new critical event.
    // We'll collect param-level decisions and only write events when needed.
    for (const metric of metricsForStorage) {
        const param = metric.paramCode;
        const existing = await findOpenEventsByTbmAndParam(tbmcode, param);
        const wantCreate = (() => {
            if (!existing || existing.length === 0) return true; // no open events -> create
            // there are open events:
            const anyCriticalOpen = existing.some((e) => e.severity === "critical");
            if (anyCriticalOpen) return false; // critical already open -> don't create
            // only warnings open:
            if (metric.severity === "critical") return true; // escalate to critical -> create
            return false; // otherwise skip duplicate warning
        })();

        if (wantCreate) {
            try {
                await recordThresholdEvent({
                    tbmcode,
                    ringNo: ringDisplay,
                    severity: metric.severity === "critical" ? "critical" : "warning",
                    message: `${readableName} ${metric.paramName || metric.paramCode} 超限: ${metric.value}`,
                    payload,
                    metrics: [metric],
                });
            } catch (err) {
                console.error(`[RealdataNotifier] Failed to record threshold event for ${tbmcode} param ${param}:`, err);
            }
        }
    }

    // Auto-resolve logic for warning events: if previously open warnings now all fall below THRESHOLD, auto-resolve them
    try {
        // find all open warning events for this tbm
        const openWarnings = [];
        for (const key of MONITORED_KEYS) {
            const opens = await findOpenEventsByTbmAndParam(tbmcode, key);
            for (const ev of opens) {
                if (ev.severity === "warning") openWarnings.push(ev);
            }
        }

        // For each open warning event, check current payload; if corresponding param is below THRESHOLD, resolve it
        const toResolve = [];
        for (const ev of openWarnings) {
            // load metrics for event? we rely on metric table having param codes – query via existing.find earlier is heavy, but ok for now
            // simple approach: if for any monitored key the payload is below threshold and the event contains that key, resolve
            const metrics = await (async () => {
                try {
                    const { data, error } = await (await import('../db.js')).supabase
                        .from('realtime_threshold_event_metrics')
                        .select('param_code')
                        .eq('event_id', ev.id);
                    if (error) throw error;
                    return data || [];
                } catch (e) {
                    console.error('Failed to fetch metrics for event', ev.id, e);
                    return [];
                }
            })();

            let allBelow = true;
            for (const m of metrics) {
                const code = m.param_code;
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

    updateNotificationState(tbmcode, exceeded);

    try {
        await sendWechatNotification(message);
    } catch (err) {
        console.error(`[RealdataNotifier] Failed to send WeChat notification for ${tbmcode}:`, err);
    }

    // const smsContent = `【关爱通】${readableName} 指标超限，请关注：\n${details}`;

    // try {
    //     const smsResponse = await sendSmsNotification({ content: smsContent });
    //     console.log(`[RealdataNotifier] SMS response for ${tbmcode}:`, smsResponse);
    // } catch (err) {
    //     console.error(`[RealdataNotifier] Failed to send SMS notification for ${tbmcode}:`, err);
    // }
};
