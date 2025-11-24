
const normalizeValue = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
};


const evaluateThreshold = (normalizedValue, ranges) => {
    if (normalizedValue === null || !ranges) return null;


    const toNumber = (value) => {
        if (value === undefined || value === null) return null;
        const num = Number(value);
        return Number.isFinite(num) ? num : null;
    };

    const warningLow = toNumber(ranges.warning_low);
    const warningHigh = toNumber(ranges.warning_high);
    const criticalLow = toNumber(ranges.critical_low);
    const criticalHigh = toNumber(ranges.critical_high);

    const hasAnyBounds = [warningLow, warningHigh, criticalLow, criticalHigh].some((v) => v !== null);
    if (!hasAnyBounds) return null;

    const buildRange = (low, high) => {
        const parts = [];
        if (low !== null) parts.push(low);
        if (high !== null) parts.push(high);
        return parts.length ? parts : null;
    };

    let severity = 'normal';
    let threshold = null;
    let range = null;

    if (criticalLow !== null && normalizedValue < criticalLow) {
        severity = 'critical';
        threshold = criticalLow;
        range = buildRange(criticalLow, criticalHigh);
    } else if (criticalHigh !== null && normalizedValue > criticalHigh) {
        severity = 'critical';
        threshold = criticalHigh;
        range = buildRange(criticalLow, criticalHigh);
    } else if (warningLow !== null && normalizedValue < warningLow) {
        severity = 'warning';
        threshold = warningLow;
        range = buildRange(warningLow, warningHigh);
    } else if (warningHigh !== null && normalizedValue > warningHigh) {
        severity = 'warning';
        threshold = warningHigh;
        range = buildRange(warningLow, warningHigh);
    } else {
        return {
            severity,
            threshold,
            range,
        };
    }
    // console.log("normalizedValue", normalizedValue);
    // console.log("definition", definition);

    return {
        severity,
        threshold,
        range,
    };
};

export const evaluateAndCheckThreshold = (canonicalKey, ringCandidate, paramCode, rawValue, eventTimes, options = {}) => {
    if (!paramCode) return;


    const normalized = normalizeValue(rawValue);
    if (normalized === null) return;

    const ranges = options.ranges;
    if (!ranges) return;

    const evaluation = evaluateThreshold(normalized, ranges);
    if (!evaluation) return;

    // const s10payload = extractS10FromPayload(sourcePayload ?? rawPayload);

    return {
        canonicalKey,
        ringNo: ringCandidate,
        paramCode,
        value: normalized,
        timestamp: eventTimes.timestamp,
        severity: evaluation.severity,        
        range: evaluation.range,
        windowMs: 0,
        payload: {
            reason: 'param_threshold_exceeded',
            //s10: Object.keys(s10payload).length ? s10payload : undefined,
        },
    };

};