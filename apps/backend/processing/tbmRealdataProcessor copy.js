import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { hangdleGuidanceThreshold } from './guidanceProcessor.js';
import { getParameterMetadataByCode, getParameterMetadataById } from '../datastore/metadataStore.js';
import {
    ensureThresholdStateReady,
    upsertActiveThresholdState,
    clearActiveThresholdState,
    listActiveThresholdStatesForTbm,
} from '../services/thresholdStateTracker.js';
import { extractRingNo } from '../utils/parameters/handle.js';
import { recordAndCheckDelta } from './paramDeltaTracker.js';

// Configure which params to watch for delta-based alerts. Each entry can
// override windowMs and threshold. Add more entries as needed.
const DEFAULT_DELTA_WATCH_LIST = [
    { paramCode: 's100206003', windowMs: 10 * 60 * 1000, threshold: 10, criticalThreshold: 20 },
    { paramCode: 's100206004', windowMs: 10 * 60 * 1000, threshold: 10, criticalThreshold: 20 },
    { paramCode: 's100206006', windowMs: 10 * 60 * 1000, threshold: 10, criticalThreshold: 20 },
    { paramCode: 's100206007', windowMs: 10 * 60 * 1000, threshold: 10, criticalThreshold: 20 },
];

// Allow overriding via environment variable (JSON) or runtime `options` passed
// to `handleRealdataThreshold` (see use below). This avoids a hard-coded value
// in the module and makes it configurable per-deployment or per-call.
let DELTA_WATCH_LIST = DEFAULT_DELTA_WATCH_LIST;
if (process.env.DELTA_WATCH_LIST) {
    try {
        const parsed = JSON.parse(process.env.DELTA_WATCH_LIST);
        if (Array.isArray(parsed) && parsed.length) DELTA_WATCH_LIST = parsed;
    } catch (err) {
        console.warn('[tbmRealdataProcessor] failed to parse DELTA_WATCH_LIST from env, using default', err?.message || err);
    }
}

const generateDeltaPayloads = (canonicalKey, payload, ringCandidate, watchList = []) => {
    const outputs = [];
    if (!canonicalKey || !payload || !Array.isArray(watchList) || !watchList.length) return outputs;

    for (const cfg of watchList) {
        const { paramCode, windowMs, threshold, criticalThreshold } = cfg;
        const rawVal = resolvePayloadValue(payload, paramCode);
        const numeric = rawVal !== undefined && rawVal !== null ? Number(rawVal) : NaN;
        if (!Number.isFinite(numeric)) continue;
        try {
            const res = recordAndCheckDelta(canonicalKey, paramCode, numeric, { windowMs, threshold });
            if (res && res.exceeded) {
                const sev = (criticalThreshold && res.delta >= criticalThreshold) ? 'critical' : 'warning';
                const times = getEventTimestamps(payload);
                // create a derived paramCode for delta events to avoid confusion
                // with the original param's threshold events. Example: original 's100206003'
                // -> derived 's10s100206003' (prefix with s10). Consumers can recognize
                // s10* as "10-minute delta" metrics.
                // derive a new paramCode by adding 100 to the numeric part of the original
                // e.g. 's100206003' -> prefix 's' + (100206003 + 100) -> 's100206103'
                let derivedParamCode = `s10${paramCode}`;
                try {
                    const m = String(paramCode).match(/^([a-zA-Z]+)(\d+)$/);
                    if (m) {
                        const prefix = m[1];
                        const digits = m[2];
                        const num = Number(digits);
                        if (Number.isFinite(num)) {
                            derivedParamCode = `${prefix}${num + 100}`;
                        }
                    }
                } catch (err) {
                    // fallback uses s10 prefix
                    derivedParamCode = `s10${paramCode}`;
                }
                const s10info = {
                    delta: res.delta,
                    min: res.min,
                    max: res.max,
                    windowStart: res.windowStart ? new Date(res.windowStart).toISOString() : null,
                    sampleCount: res.sampleCount,
                };

                outputs.push({
                    canonicalKey,
                    ringNo: ringCandidate,
                    // use derived paramCode so downstream handlers treat this as a separate metric
                    paramCode: derivedParamCode,
                    // value for the derived metric is the observed delta (magnitude)
                    value: res.delta,
                    // include original min/max range for context
                    range: [res.min, res.max],
                    timestamp: times.timestamp,
                    recorded_at: times.recorded_at_iso,
                    recorded_at_ts: times.recorded_at_ts,
                    severity: sev,
                    payload: {
                        reason: 'delta_exceeded',
                        // embed by-original-param under s10 to avoid colliding with original fields
                        s10: { [paramCode]: s10info },
                    },
                    message: `参数 ${paramCode} 在 ${Math.round((windowMs || 0) / 1000)}s 窗口内变化 ${res.delta}`,
                });
            }
        } catch (err) {
            console.error('[tbmRealdataProcessor] delta check failed for', paramCode, err);
        }
    }

    return outputs;
};

const GUIDANCE_KEYS = ["s100206003", "s100206004", "s100206006", "s100206007"];
const RING_KEY = "s100100008";

// Placeholder guidance handler - replace with real implementation or import
const handleGuidanceParam = async (canonicalKey, paramCode, value, ctx = {}) => {
    // TODO: call actual guidance evaluator / threshold checker
    // For now we just log and return a simple result object
    // e.g. { paramCode, exceeded: true/false, level: 'warning' }
    try {
        // minimal synthetic check: null/undefined -> no-op
        if (value === null || value === undefined) return { paramCode, handled: false };
        // Example: if value is numeric and > some threshold (placeholder)
        const numeric = typeof value === 'number' ? value : Number(value);
        const exceeded = Number.isFinite(numeric) ? numeric > 100 : false; // placeholder
        return { paramCode, handled: true, exceeded, value: numeric };
    } catch (err) {
        console.error('[tbmRealdataProcessor] handleGuidanceParam error', err);
        return { paramCode, handled: false, error: String(err) };
    }
};

// Placeholder ring handler - replace with domain logic
const handleRingValue = async (canonicalKey, ringValue, ctx = {}) => {
    try {
        // normalize to number if possible
        const numeric = Number.isFinite(Number(ringValue)) ? Number(ringValue) : null;
        // Example checks: ring decreased or jump too large are handled elsewhere by processor,
        // here we simply return the parsed ring and whether it's numeric
        return { handled: true, ring: numeric, raw: ringValue };
    } catch (err) {
        console.error('[tbmRealdataProcessor] handleRingValue error', err);
        return { handled: false, error: String(err) };
    }
};

const normalizeRingValue = (value) => {
    if (value === null || value === undefined) return null;
    if (value === '' || value === '-') return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
};

const buildMetricFromItem = (item, overrides = {}) => {
    const value = overrides.value !== undefined ? overrides.value : item.value;
    const paramName = overrides.paramName ?? item.paramName ?? null;
    const unit = overrides.unit ?? item.unit ?? null;
    const severity = overrides.severity ?? item.severity ?? 'warning';
    const threshold = overrides.threshold !== undefined ? overrides.threshold : item.threshold ?? null;
    const ranges = overrides.bounds !== undefined ? overrides.bounds : item.ranges ?? null;

    return {
        paramCode: overrides.paramCode ?? item.paramCode ?? null,
        paramName,
        value: typeof value === 'number' ? Math.round(value) : value,
        unit,
        threshold,
        severity,
        bounds: ranges ? { ...ranges } : null,
        magnitude: value !== null && value !== undefined && Number.isFinite(Number(value))
            ? Math.abs(Number(value))
            : null,
    };
};

const resolvePayloadValue = (payload, paramCode) => {
    if (!payload || typeof payload !== 'object' || !paramCode) return undefined;
    if (Object.prototype.hasOwnProperty.call(payload, paramCode)) {
        return payload[paramCode];
    }
    return undefined;
};

// Normalize timestamp information from incoming payloads.
// Accepts ISO string in `recorded_at` or numeric `ts`/`recorded_at_ts`.
// Returns an object with: { recorded_at_iso, recorded_at_ts, timestamp } where
// - recorded_at_iso: ISO string from payload if available
// - recorded_at_ts: milliseconds number if available
// - timestamp: chosen ISO string to use for event timestamp (payload preferred, else now)
const getEventTimestamps = (payload = {}) => {
    let recorded_at_iso = null;
    let recorded_at_ts = null;

    if (payload === null || payload === undefined) payload = {};

    // payload.recorded_at may be ISO string
    if (payload.recorded_at) {
        if (typeof payload.recorded_at === 'string') {
            recorded_at_iso = payload.recorded_at;
            const parsed = Date.parse(recorded_at_iso);
            if (!Number.isNaN(parsed)) recorded_at_ts = parsed;
        } else if (typeof payload.recorded_at === 'number' && Number.isFinite(payload.recorded_at)) {
            recorded_at_ts = payload.recorded_at;
            recorded_at_iso = new Date(recorded_at_ts).toISOString();
        }
    }

    // payload.ts or recorded_at_ts may be numeric timestamp
    if ((recorded_at_ts === null || recorded_at_ts === undefined) && payload.ts) {
        const t = Number(payload.ts);
        if (Number.isFinite(t)) {
            recorded_at_ts = t;
            recorded_at_iso = new Date(t).toISOString();
        }
    }

    if ((recorded_at_ts === null || recorded_at_ts === undefined) && payload.recorded_at_ts) {
        const t = Number(payload.recorded_at_ts);
        if (Number.isFinite(t)) {
            recorded_at_ts = t;
            recorded_at_iso = new Date(t).toISOString();
        }
    }

    const timestamp = recorded_at_iso ?? new Date().toISOString();
    return {
        recorded_at_iso: recorded_at_iso ?? null,
        recorded_at_ts: recorded_at_ts ?? null,
        timestamp,
    };
};

// Main dispatcher: route relevant keys from payload to specific handlers
export const handleRealdataThreshold = async (canonicalKey, payload = {}, options = {}) => {
    //console.log("===handleRealdataThreshold===");


    if (!canonicalKey) return null;
    if (!payload || typeof payload !== 'object') return null;

    const ringNo = extractRingNo(payload) ?? null;

    // compute a ring candidate early (use payload ring if available).
    // generate delta payloads early so guidance handling can consider derived params
    // like s100206103 as regular guidance params. We avoid relying on payload.s10
    // being present (some callers attach s10 at event-level instead).
    const earlyRingCandidate = normalizeRingValue(payload[RING_KEY]) ?? null;
    let preDeltaPayloads = [];
    try {
        const watchList = options?.deltaWatchList ?? DELTA_WATCH_LIST;
        preDeltaPayloads = generateDeltaPayloads(canonicalKey, payload, earlyRingCandidate, watchList) || [];
        console.log("preDeltaPayloads",preDeltaPayloads);
        
    } catch (err) {
        console.error('[tbmRealdataProcessor] pre-generate delta payloads failed', err);
        preDeltaPayloads = [];
    }

    try {
        await ensureThresholdStateReady();
    } catch (err) {
        console.warn('[tbmRealdataProcessor] failed to initialize threshold state cache:', err?.message || err);
    }

    const results = {
        guidance: [],
        ring: null,
        ignoredKeys: [],
    };

    // If guidance params and/or ring are present, handle them in parallel to improve throughput
    const hasGuidanceKey = GUIDANCE_KEYS.some((k) => Object.prototype.hasOwnProperty.call(payload, k));
    const hasRingKey = Object.prototype.hasOwnProperty.call(payload, RING_KEY);

    const tasks = [];

    if (hasGuidanceKey) {
        // Collect top-level guidance entries (e.g. payload.s100206003 = -64)
        const entries = Object.entries(payload).filter(([key]) => GUIDANCE_KEYS.includes(key));

        // Inject any pre-generated delta payloads as guidance entries so derived
        // params (e.g. s100206103) are evaluated by the guidance handler the same
        // way as native params. preDeltaPayloads elements have shape produced by
        // generateDeltaPayloads (paramCode, value, payload, ...).
        if (Array.isArray(preDeltaPayloads) && preDeltaPayloads.length) {
            for (const p of preDeltaPayloads) {
                if (!p || !p.paramCode) continue;
                // only add numeric values
                if (!Number.isFinite(Number(p.value))) continue;
                entries.push([p.paramCode, Number(p.value)]);
            }
        }

        const guidanceTask = (async () => {
            const outputs = [];
            try {
                for (const [paramCode, value] of entries) {
                    const result = await hangdleGuidanceThreshold(canonicalKey, paramCode, value, payload);
                    if (result) {
                        outputs.push(result);
                    }
                }
                return { guidance: outputs };
            } catch (err) {
                console.error('[tbmRealdataProcessor] notifyRealdataThreshold failed', err);
                return { guidance: outputs, error: err };
            }
        })();

        tasks.push(guidanceTask);
    }

    if (hasRingKey) {
        const ringTask = (async () => {
            try {
                const ringRes = await handleRingValue(canonicalKey, payload[RING_KEY], options);
                return { ring: ringRes };
            } catch (err) {
                console.error('[tbmRealdataProcessor] ring handler failed', err);
                return { ring: { handled: false, error: String(err) } };
            }
        })();
        tasks.push(ringTask);
    }

    if (tasks.length) {
        const settled = await Promise.all(tasks);
        for (const r of settled) {
            if (Array.isArray(r.guidance) && r.guidance.length) {
                results.guidance.push(...r.guidance);
            }
            if (r.ring) results.ring = r.ring;
        }
    }

    // Collect any other keys for logging if helpful
    for (const k of Object.keys(payload)) {
        if (GUIDANCE_KEYS.includes(k) || k === RING_KEY) continue;
        results.ignoredKeys.push(k);
    }

    //处理指标为非normal的情况
    const exceeded = results.guidance.filter((item) => item && item.severity && item.severity !== 'normal');
    const ringRaw = payload[RING_KEY];
    const ringCandidate = normalizeRingValue(ringRaw) ?? normalizeRingValue(ringHint);


    const touchedParamCodes = new Set();
    const eventPayloads = [];

    // prepare timestamps based on payload (prefer payload.recorded_at or payload.ts if supplied)
    const eventTimes = getEventTimestamps(payload);


    for (const item of exceeded) {
        //console.log("item", item);
        const severity = String(item.severity || 'warning').toLowerCase();
        const canonicalKey = item.canonicalKey;
        const paramCode = item.paramCode;
        const range = Array.isArray(item.range) ? item.range : null;

        let shouldEmit = true;
        let previousSeverity = null;

        if (canonicalKey && paramCode !== null && paramCode !== undefined) {
            const { changed, previous } = upsertActiveThresholdState({
                canonicalKey,
                severity,
                ringNo: ringCandidate,
                paramCode: item.paramCode,
            });
            previousSeverity = previous?.severity ?? null;
            touchedParamCodes.add(paramCode);
            if (!changed) {
                shouldEmit = false;
            }
        }


        //if (!shouldEmit) continue;
        //console.log("severity", severity);

        eventPayloads.push({
            canonicalKey,
            ringNo: ringCandidate,
            paramCode,
            value: item.value,
            range,
            timestamp: eventTimes.timestamp,
            severity,
            payload: item.payload,
            recorded_at: eventTimes.recorded_at_iso,
            recorded_at_ts: eventTimes.recorded_at_ts,
        });
    }

    //console.log("touchedParamCodes", touchedParamCodes);


    //处理恢复到normal的情况
    if (canonicalKey) {
        const activeStates = listActiveThresholdStatesForTbm(canonicalKey);
        for (const state of activeStates) {
            const { paramId, severity, ringNo: activeRing, paramCode: cachedCode } = state;

            if (!severity || severity === 'normal') continue;
            if (activeRing !== null && ringCandidate !== null && activeRing !== ringCandidate) continue;

            const paramMeta = getParameterMetadataById(paramId) || {};
            const paramCode = cachedCode ?? paramMeta?.code ?? null;
            if (!paramCode) continue;
            if (touchedParamCodes.has(paramCode)) continue;

            const payloadValue = resolvePayloadValue(payload, paramCode);

            eventPayloads.push({
                canonicalKey,
                ringNo: ringCandidate,
                paramCode,
                value: payloadValue,
                range: null,
                timestamp: eventTimes.timestamp,
                severity: 'normal',
                payload,
            });

            clearActiveThresholdState({ canonicalKey, paramId });
        }
    }

    // Append any pre-generated delta payloads (we generated them early so guidance
    // evaluation could include derived params). Reuse preDeltaPayloads to avoid
    // duplicate generation.
    if (Array.isArray(preDeltaPayloads) && preDeltaPayloads.length) {
        for (const p of preDeltaPayloads) {
            // ensure timestamp/recorded_at are set (fall back to eventTimes)
            if (!p.timestamp) p.timestamp = eventTimes.timestamp;
            if (!p.recorded_at) p.recorded_at = eventTimes.recorded_at_iso;
            if (!p.recorded_at_ts) p.recorded_at_ts = eventTimes.recorded_at_ts;
            eventPayloads.push(p);
        }
    }

    for (const body of eventPayloads) {
        try {
            const ev = createEvent('alerts.realdata', body);
            publishEvent('alerts.realdata', ev);
        } catch (err) {
            console.error('[tbmRealdataProcessor] failed to create/publish realdata event', err);
        }
    }

    return results;
};