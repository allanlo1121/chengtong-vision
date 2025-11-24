import { getCachedForTbm, getMergedThresholdsForTbm } from '../services/thresholdService.js';
import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { recordAndCheckDelta } from './paramDeltaTracker.js';
import { getMergedDeltaThresholdsForTbm } from '../services/deltaThresholdService.js';

const normalizeValue = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
};

const loadThresholdMap = async (canonicalKey) => {
    if (!canonicalKey) return {};

    try {
        let merged = getCachedForTbm(canonicalKey);
        if (!merged) {
            merged = await getMergedThresholdsForTbm(canonicalKey);
        }
        return merged && typeof merged === 'object' ? merged : {};
    } catch (err) {
        console.warn('[guidanceProcessor] failed to load merged thresholds for', canonicalKey, err?.message || err);
        return {};
    }
};

const evaluateThreshold = (normalizedValue, definition) => {
    //console.log("evaluateThreshold", { normalizedValue, definition });
    if (normalizedValue === null || !definition) return null;

    const ranges = definition.ranges || {};
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

export const extractGuidanceFromPayload = (rawPayload = {}) => {
    const collected = {};
    if (!rawPayload || typeof rawPayload !== 'object') return collected;

    try {
        for (const [key, value] of Object.entries(rawPayload)) {
            if (typeof key === 'string' && key.startsWith('s10')) {
                collected[key] = value;
            }
        }

        if (rawPayload?.s10 && typeof rawPayload.s10 === 'object') {
            for (const [key, value] of Object.entries(rawPayload.s10)) {
                collected[key] = value;
            }
        }
    } catch (err) {
        console.warn('[guidanceProcessor] failed to extract s10 params from payload', err?.message || err);
    }

    return collected;
};

// 选出指定字段绝对值最大的整个 item
export function getMaxAbsValueItem(results, field = 'value') {
    if (!Array.isArray(results) || results.length === 0) return null;
    return results.reduce((maxItem, item) => {
        const maxVal = Math.abs(maxItem[field]);
        const curVal = Math.abs(item[field]);
        return (curVal > maxVal) ? item : maxItem;
    });
}


export const evaluateGuidanceThresholds = async (canonicalKey, ringNo, eventTimes, rawPayload = {}, options = {}) => {
    if (!canonicalKey) return null;
    if (!ringNo) return null;
    //console.log("canonicalKey", canonicalKey);
    //console.log("ringNo", ringNo);

    const perParam = await loadThresholdMap(canonicalKey);
    if (!perParam || !Object.keys(perParam).length) return [];

    //console.log("perParm", Object.keys(perParam));
    //console.log("rawPayload",rawPayload);

    const results = [];

    for (const key of Object.keys(perParam)) {
        //console.log("perParam key",key);

        const rawValue = rawPayload[key];
        if (rawValue === undefined || rawValue === null || isNaN(Number(rawValue))) return;
        const definition = perParam[key];
        if (!definition) return;

        const evaluation = evaluateThreshold(rawValue, definition);
        if (!evaluation) return;

        //console.log("evaluation", evaluation);

        results.push({
            paramCode: key,
            value: rawValue,
            severity: evaluation.severity,
            threshold: evaluation.threshold,
            range: evaluation.range,
        });
    }

    //console.log("results", results);

    const maxItem = getMaxAbsValueItem(results);
    //console.log("maxItem", maxItem);

    let eventPayloads = [];

    if (maxItem) {
        const { value, severity, range } = maxItem;


        let paramCode = 'g020206000';
        //console.log("maxItem", paramCode,value, severity, range);
        if (severity === 'warning') {
            paramCode = 'g020206001'; // 统一用一个参数代码表示警告级别
        } if (severity === 'critical') {
            paramCode = 'g020206002'; // 统一用一个参数代码表示警告级别
        }

        eventPayloads.push({
            canonicalKey,
            ringNo,
            paramCode,
            value,
            range,
            timestamp: eventTimes.timestamp,
            severity,
            payload: results
        });
    }

    for (const body of eventPayloads) {
        try {
            const ev = createEvent('alerts.guidance', body);
            //console.log("ev",ev);

            publishEvent('alerts.guidance', ev);
        } catch (err) {
            console.error('[guidanceProcessor] failed to create/publish guidance event', err);
        }
    }


};


export const evaluateGuidanceDeltaThresholds = async (canonicalKey, ringNo, eventTimes, rawPayload = {}, options = {}) => {
    if (!canonicalKey) return null;
    if (!ringNo) return null;

    let deltaWatchList = await getMergedDeltaThresholdsForTbm(canonicalKey); //预热delta阈值缓存
    //console.log("deltaWatchList", deltaWatchList);
    const keys = Object.keys(deltaWatchList);

    //console.log("perParm", perParam);
    //console.log("rawPayload",rawPayload);

    if (!keys.length) return null;
    const deltaResults = [];

    for (const key of keys) {
        const thresholdConfig = deltaWatchList[key];
        const value = rawPayload[key];
        try {
            const res = recordAndCheckDelta(canonicalKey, ringNo, value, eventTimes, thresholdConfig);
            // console.log("recordAndCheckDelta", res);
            deltaResults.push(res);
            // console.log("deltaResults", deltaResults);
        } catch (err) {
            console.error('[tbmRealdataProcessor] pre-generate delta payloads failed', err);
            continue;
        }

    }

    if (!deltaResults.length) return null;

    const maxItem = getMaxAbsValueItem(deltaResults, 'deltaValue');

    // console.log("maxItem", maxItem);


    const eventPayloads = [];

    if (maxItem) {
        const { deltaValue, severity, range } = maxItem;


        let paramCode = 'g020206010';
        //console.log("maxItem", paramCode,value, severity, range);
        if (severity === 'warning') {
            paramCode = 'g020206011'; // 统一用一个参数代码表示警告级别
        } if (severity === 'critical') {
            paramCode = 'g020206012'; // 统一用一个参数代码表示警告级别
        }

        eventPayloads.push({
            canonicalKey,
            ringNo,
            paramCode,
            value: deltaValue,
            range,
            timestamp: eventTimes.timestamp,
            severity,
            payload: deltaResults
        });
    }

    for (const body of eventPayloads) {
        try {
            const ev = createEvent('alerts.deltaGuidance', body);
            //console.log("ev",ev);

            publishEvent('alerts.deltaGuidance', ev);
        } catch (err) {
            console.error('[guidanceProcessor] failed to create/publish guidance delta data event', err);
        }
    }

    //return eventPayloads;
}




export const hangdleGuidanceThreshold = async (canonicalKey, paramCode, rawValue, rawPayload = {}) => {
    if (!canonicalKey || !paramCode) return null;

    const results = await evaluateGuidanceThresholds(
        canonicalKey,
        {},
        {
            allowedParamCodes: [paramCode],
            additionalValues: [{ paramCode, value: rawValue, payload: rawPayload }],
            dedupe: false,
        },
    );

    return results.length ? results[0] : null;
};


export default { hangdleGuidanceThreshold, evaluateGuidanceThresholds };
