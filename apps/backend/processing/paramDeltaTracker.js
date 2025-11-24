// Lightweight in-memory param delta tracker
// Purpose: record recent values for a (canonicalKey,paramCode) and detect
// whether the value changed more than `threshold` within a sliding `windowMs`.

const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_WARNING_THRESHOLD = 10; // 10 (units, e.g., mm)
const DEFAULT_CRITICAL_THRESHOLD = 20; // 20 (units, e.g., mm)
const CLEANUP_INTERVAL_MS = 60 * 1000; // cleanup every minute

const store = new Map(); // key -> [{ts, value}, ...]

const makeKey = (canonicalKey, paramCode) => `${canonicalKey}::${paramCode}`;

const nowMs = () => Date.now();

const pruneList = (list, windowMs) => {
    const cutoff = nowMs() - windowMs;
    let i = 0;
    while (i < list.length && list[i].ts < cutoff) i++;
    if (i > 0) list.splice(0, i);
    return list;
};

// Record a numeric value and return whether delta exceeds threshold within window
export const recordAndCheckDelta = (canonicalKey, ringCandidate, value, eventTimes, options = {}) => {
    let severity = 'normal';
    let range = [0, 10]
    if (!canonicalKey) return { severity };
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return { severity };

    //console.log("recordAndCheckDelta", canonicalKey, value, options);

    const paramCode = options.paramCode || null;
    if (!paramCode) return { severity };
    const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
    const warningThreshold = options.deltaWarningAbs ?? DEFAULT_WARNING_THRESHOLD;
    const criticalThreshold = options.deltaCriticalAbs ?? DEFAULT_CRITICAL_THRESHOLD;


    const key = makeKey(canonicalKey, paramCode);
    let list = store.get(key);
    if (!list) {
        list = [];
        store.set(key, list);
    }

    const entry = { ts: nowMs(), value: numeric };
    list.push(entry);

    // prune old
    pruneList(list, windowMs);

    if (list.length === 0) return { severity };

    // compute min, max in window
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const it of list) {
        if (it.value < min) min = it.value;
        if (it.value > max) max = it.value;
    }

    const delta = Math.abs(max - min);

    if (delta > criticalThreshold) {
        severity = "critical";
        range = [criticalThreshold, 50];
    } else if (delta > warningThreshold) {
        severity = "warning";
        range = [warningThreshold, criticalThreshold];
    } else {
        severity = 'normal';
    }

    return {
        paramCode,
        severity,
        value,
        deltaValue: delta,
        range,
        min,
        max,
        windowMs,
        timestamp: eventTimes.timestamp,
    };
};

// Optional: expose a method to clear stored history for a key
export const clearHistory = (canonicalKey, paramCode) => {
    const key = makeKey(canonicalKey, paramCode);
    store.delete(key);
};

// Background cleanup (trim everything periodically to avoid unbounded growth)
setInterval(() => {
    const cutoff = nowMs() - DEFAULT_WINDOW_MS * 2;
    for (const [k, list] of store.entries()) {
        // remove lists where last sample is older than extended cutoff
        if (!list.length) {
            store.delete(k);
            continue;
        }
        const lastTs = list[list.length - 1].ts;
        if (lastTs < cutoff) store.delete(k);
    }
}, CLEANUP_INTERVAL_MS).unref && setInterval(() => { }).unref();

export default {
    recordAndCheckDelta,
    clearHistory,
};
