import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { evaluateGuidanceThresholds, extractGuidanceFromPayload,evaluateGuidanceDeltaThresholds } from './guidanceProcessor.js';
import { getParameterMetadataByCode, getParameterMetadataById } from '../datastore/metadataStore.js';
import {
    ensureThresholdStateReady,
    upsertActiveThresholdState,
    clearActiveThresholdState,
    listActiveThresholdStatesForTbm,
} from '../services/thresholdStateTracker.js';
import { getMergedDeltaThresholdsForTbm } from '../services/deltaThresholdService.js';
import { getMergedThresholdsForTbm } from '../services/thresholdService.js';
import { recordAndCheckDelta } from './paramDeltaTracker.js';
import { evaluateAndCheckThreshold } from './paramThresholdTracker.js';

// Configure which params to watch for delta-based alerts. Each entry can
// override windowMs and threshold. Add more entries as needed.
const DEFAULT_DELTA_WINDOW_MS = 10 * 60 * 1000; // 10 minutes


const DEFAULT_DELTA_WATCH_LIST = ['s100206003', 's100206004', 's100206006', 's100206007'];


const generateDeltaPayload = (value, thresholdConfig) => {

    //console.log("===generateDeltaPayload===", value, thresholdConfig);

    // const outputs = [];
    if (!value || typeof value !== 'number') return null;
    const { windowMs = DEFAULT_DELTA_WINDOW_MS, deltaWarningAbs = 10, deltaCriticalAbs = 20 } = thresholdConfig || {};

    //console.log(windowMs, deltaWarningAbs, deltaCriticalAbs);

    // const configByParam = mapWatchList(deltaWatchList);
    // const times = eventTimes ?? getEventTimestamps(payload);

    // for (const [paramCode, rawVal] of Object.entries(payload)) {
    //     if (!isParamCodeCandidate(paramCode)) continue;

    //     const numeric = coerceNumeric(rawVal);
    //     if (!Number.isFinite(numeric)) continue;

    //     const cfg = configByParam.get(paramCode) || {};
    //     const windowMs = cfg.windowMs ?? DEFAULT_DELTA_WINDOW_MS;

    //     try {
    //         const res = recordAndCheckDelta(canonicalKey, paramCode, numeric, { windowMs, threshold });
    //         if (!res) continue;

    //         const windowStartIso = res.windowStart ? new Date(res.windowStart).toISOString() : null;

    //         outputs.push({
    //             canonicalKey,
    //             ringNo: ringNo,
    //             paramCode,
    //             deltaValue10m: res.delta,
    //             current: numeric,
    //             min: res.min,
    //             max: res.max,
    //             sampleCount: res.sampleCount,
    //             windowStart: windowStartIso,
    //             windowMs,
    //             timestamp: times.timestamp,
    //         });
    //     } catch (err) {
    //         console.error('[tbmRealdataProcessor] delta check failed for', paramCode, err);
    //     }

    //  return outputs;
};

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
    //console.log("===handleRealdataThreshold===", canonicalKey, payload);
    if (!canonicalKey) return null;
    if (!payload || typeof payload !== 'object') return null;

    const eventTimes = getEventTimestamps(payload);
    const ringRaw = payload[RING_KEY];
    //console.log("===handleRealdataThreshold=== ringRaw", ringRaw);

    const ringNo = normalizeRingValue(ringRaw);

    //console.log("===handleRealdataThreshold=== ringNo", ringNo);

    if (ringNo === null) {
        console.warn('[tbmRealdataProcessor] missing valid ring number in payload, drop realdata event');
        return null;
    }

    const guidanceFromPayload = extractGuidanceFromPayload(payload);
    //console.log("guidanceFromPayload",guidanceFromPayload);

    let guidanceResults = evaluateGuidanceThresholds(canonicalKey, ringNo,eventTimes,guidanceFromPayload, options);

    let guidanceDeltaResults = evaluateGuidanceDeltaThresholds(canonicalKey, ringNo,eventTimes,guidanceFromPayload,options); 
    

    // let eventPayloads = [];
    // let deltaWatchList = await getMergedDeltaThresholdsForTbm(canonicalKey); //预热delta阈值缓存
    // //console.log("deltaWatchList", deltaWatchList);
    // const keys = Object.keys(deltaWatchList);


    // for (const key of keys) {
    //     const thresholdConfig = deltaWatchList[key];
    //     const value = payload[key];
    //     try {
    //         const res = recordAndCheckDelta(canonicalKey, ringNo, value, eventTimes, thresholdConfig);
    //         //console.log("recordAndCheckDelta", res);
    //         eventPayloads.push(res);
    //         //console.log("eventPayloads", eventPayloads);
    //     } catch (err) {
    //         console.error('[tbmRealdataProcessor] pre-generate delta payloads failed', err);
    //         continue;
    //     }

    // }


    // let thresholdList = await getMergedThresholdsForTbm(canonicalKey); //预热delta阈值缓存

    // const thresholdKeys = Object.keys(thresholdList);

    //console.log("thresholdList", thresholdList);

    // for (const key of thresholdKeys) {
    //     const thresholdConfig = thresholdList[key];
    //     const value = payload[key];
    //     try {
    //         const res = evaluateAndCheckThreshold(canonicalKey, ringNo, key, value, eventTimes, thresholdConfig);
    //         //console.log("evaluateAndCheckThreshold", res);
    //         eventPayloads.push(res);
    //         //console.log("eventPayloads", eventPayloads);

    //     } catch (err) {
    //         console.error('[tbmRealdataProcessor] pre-generate payloads failed', err);
    //         continue;
    //     }

    // }

    // try {
    //     preDeltaPayloads = generateDeltaPayloads(canonicalKey, payload, ringNo, deltaWatchList, eventTimes) || [];
    // } catch (err) {
    //     console.error('[tbmRealdataProcessor] pre-generate delta payloads failed', err);
    //     preDeltaPayloads = [];
    // }

    // try {
    //     await ensureThresholdStateReady();
    // } catch (err) {
    //     console.warn('[tbmRealdataProcessor] failed to initialize threshold state cache:', err?.message || err);
    // }

    // const results = {
    //     guidance: [],
    //     ring: null,
    //     ignoredKeys: [],
    // };

    // const deltaInfoByParam = new Map();
    // if (Array.isArray(preDeltaPayloads)) {
    //     for (const entry of preDeltaPayloads) {
    //         if (entry && entry.paramCode) {
    //             deltaInfoByParam.set(entry.paramCode, entry);
    //         }
    //     }
    // }

    // const paramKeys = [];
    // const ignoredKeys = [];
    // for (const key of Object.keys(payload)) {
    //     if (key === RING_KEY) {
    //         paramKeys.push(key);
    //         continue;
    //     }
    //     if (isParamCodeCandidate(key)) {
    //         paramKeys.push(key);
    //     } else {
    //         ignoredKeys.push(key);
    //     }
    // }

    // const hasThresholdCandidates = paramKeys.length > 0;
    // const hasRingKey = Object.prototype.hasOwnProperty.call(payload, RING_KEY);

    // const tasks = [];

    // if (hasThresholdCandidates) {
    //     const guidanceTask = (async () => {
    //         try {
    //             const outputs = await evaluateAndCheckThreshold(canonicalKey, payload);
    //             prePayloads.push(...outputs);
    //         } catch (err) {
    //             console.error('[tbmRealdataProcessor] notifyRealdataThreshold failed', err);
    //             return { guidance: [], error: err };
    //         }
    //     })();

    //     tasks.push(guidanceTask);
    // }

    // if (hasRingKey) {
    //     const ringTask = (async () => {
    //         try {
    //             const ringRes = await handleRingValue(canonicalKey, payload[RING_KEY], options);
    //             return { ring: ringRes };
    //         } catch (err) {
    //             console.error('[tbmRealdataProcessor] ring handler failed', err);
    //             return { ring: { handled: false, error: String(err) } };
    //         }
    //     })();
    //     tasks.push(ringTask);
    // }

    // if (tasks.length) {
    //     const settled = await Promise.all(tasks);
    //     for (const r of settled) {
    //         if (Array.isArray(r.guidance) && r.guidance.length) {
    //             results.guidance.push(...r.guidance);
    //         }
    //         if (r.ring) results.ring = r.ring;
    //     }
    // }

    // if (ignoredKeys.length) {
    //     results.ignoredKeys.push(...ignoredKeys);
    // }

    // //处理指标为非normal的情况
    // const exceeded = results.guidance.filter((item) => item && item.severity && item.severity !== 'normal');


    // const touchedParamCodes = new Set();
    // const eventPayloads = [];


    // for (const item of exceeded) {
    //     //console.log("item", item);
    //     const severity = String(item.severity || 'warning').toLowerCase();
    //     const canonicalKey = item.canonicalKey;
    //     const paramCode = item.paramCode;
    //     const range = Array.isArray(item.range) ? item.range : null;

    //     let shouldEmit = true;
    //     let previousSeverity = null;

    //     if (canonicalKey && paramCode !== null && paramCode !== undefined) {
    //         const { changed, previous } = upsertActiveThresholdState({
    //             canonicalKey,
    //             severity,
    //             ringNo: ringNo,
    //             paramCode: item.paramCode,
    //         });
    //         previousSeverity = previous?.severity ?? null;
    //         touchedParamCodes.add(paramCode);
    //         if (!changed) {
    //             shouldEmit = false;
    //         }
    //     }


    //     //if (!shouldEmit) continue;
    //     //console.log("severity", severity);

    //     const payloadWithDelta = item.payload ? { ...item.payload } : {};
    //     const deltaInfo = deltaInfoByParam.get(paramCode);
    //     if (deltaInfo) {
    //         payloadWithDelta.deltaValue10m = deltaInfo.value;
    //         payloadWithDelta.deltaCurrent = deltaInfo.current ?? null;
    //         payloadWithDelta.deltaWindowMs = deltaInfo.windowMs ?? null;
    //         payloadWithDelta.deltaRange = deltaInfo.min !== undefined && deltaInfo.max !== undefined
    //             ? [deltaInfo.min, deltaInfo.max]
    //             : null;
    //         payloadWithDelta.deltaSampleCount = deltaInfo.sampleCount ?? null;
    //         payloadWithDelta.deltaWindowStart = deltaInfo.windowStart ?? null;
    //         payloadWithDelta.deltaTimestamp = deltaInfo.timestamp ?? null;
    //     }

    //     eventPayloads.push({
    //         canonicalKey,
    //         ringNo: ringNo,
    //         paramCode,
    //         value: item.value,
    //         range,
    //         timestamp: eventTimes.timestamp,
    //         severity,
    //         payload: payloadWithDelta,
    //         recorded_at: eventTimes.recorded_at_iso,
    //         recorded_at_ts: eventTimes.recorded_at_ts,
    //     });
    // }

    // //console.log("touchedParamCodes", touchedParamCodes);


    // //处理恢复到normal的情况
    // if (canonicalKey) {
    //     const activeStates = listActiveThresholdStatesForTbm(canonicalKey);
    //     for (const state of activeStates) {
    //         const { paramId, severity, ringNo: activeRing, paramCode: cachedCode } = state;

    //         if (!severity || severity === 'normal') continue;
    //         if (activeRing !== null && ringNo !== null && activeRing !== ringNo) continue;

    //         const paramMeta = getParameterMetadataById(paramId) || {};
    //         const paramCode = cachedCode ?? paramMeta?.code ?? null;
    //         if (!paramCode) continue;
    //         if (touchedParamCodes.has(paramCode)) continue;

    //         const payloadValue = resolvePayloadValue(payload, paramCode);

    //         eventPayloads.push({
    //             canonicalKey,
    //             ringNo: ringNo,
    //             paramCode,
    //             value: payloadValue,
    //             range: null,
    //             timestamp: eventTimes.timestamp,
    //             severity: 'normal',
    //             payload,
    //         });

    //         clearActiveThresholdState({ canonicalKey, paramId });
    //     }
    // }

    // 只保留 warning 和 critical
    // eventPayloads = eventPayloads.filter(e => e && (e.severity === 'warning' || e.severity === 'critical'));
    // for (const body of eventPayloads) {
    //     try {
    //         const ev = createEvent('alerts.realdata', body);
    //         publishEvent('alerts.realdata', ev);
    //     } catch (err) {
    //         console.error('[tbmRealdataProcessor] failed to create/publish realdata event', err);
    //     }
    // }

    // return results;
};