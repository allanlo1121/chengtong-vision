import { supabase } from '../utils/supabase/client.js';
import { getBaseDeltaThresholds, getDeltaThresholdsForTbm } from '../datastore/deltaThresholdStore.js';
import { fetchDeltaBaseForParam, fetchDeltaOverridesForParam } from '../datastore/deltaThresholdStore.js';
// 批量初始化所有 TBM 的 delta 阀值缓存
import * as metadataStore from '../datastore/metadataStore.js';

const mergedCache = new Map();
const DEFAULT_CONCURRENCY = 6;
const MERGED_CACHE_TTL = 5 * 60 * 1000; // 5 minutes by default for merged thresholds


export const mergeDeltaThresholds = (base = {}, overrides = {}) => {
    // base and overrides are maps keyed by paramCode
    // console.log("base", base);
    // console.log("overrides", overrides);

    const out = { ...base };
    for (const [code, o] of Object.entries(overrides || {})) {
        out[code] = { ...(out[code] || {}), ...o };
    }
    //console.log("out", out);
    return out;

};

const buildPerParam = (rawMap, ctx = {}) => {
    // Return a structured delta threshold object per param suitable for realtime evaluation
    // Shape:
    // { paramCode: { param_id, param_code, param_name, window_ms, delta_warning_abs,delta_critical_abs } }
    const perParam = {};
    for (const [code, r] of Object.entries(rawMap || {})) {

        let windowMs = r.windowMs != null ? Number(r.windowMs) : undefined;
        let deltaWarningAbs = r.deltaWarningAbs != null ? Number(r.deltaWarningAbs) : undefined;
        let deltaCriticalAbs = r.deltaCriticalAbs != null ? Number(r.deltaCriticalAbs) : undefined;


        // attempt to get unit and authoritative name from metadata store
        let unit = null;
        let paramName = r.paramName || null;
        try {
            const meta = metadataStore.getParameterMetadata(code);
            if (meta) {
                unit = meta.unit || unit;
                paramName = meta.name || paramName;
            }
        } catch (e) {
            // ignore metadata lookup failures
        }


        perParam[code] = {
            paramId: r.paramId || null,
            paramCode: code,
            paramName: paramName,
            windowMs: windowMs,
            deltaWarningAbs: deltaWarningAbs,
            deltaCriticalAbs: deltaCriticalAbs,
            unit,
        };


    };

    return perParam;
};



// 获取合并后的 delta 阀值（优先覆盖，没有则用基础）
export const getMergedDeltaThresholdsForParam = async (tbmId, paramId, profileName = null) => {
    const overrides = await getDeltaOverridesForParam(tbmId, paramId) || [];
    const base = await getDeltaThresholdsForParam(paramId, profileName) || [];
    // 用 window_ms + profile_name 做唯一 key
    const keyOf = (row) => `${row.window_ms ?? ''}|${row.profile_name ?? ''}`;
    const merged = new Map();
    for (const row of base) {
        merged.set(keyOf(row), row);
    }
    for (const row of overrides) {
        merged.set(keyOf(row), row); // 覆盖同 key
    }
    return Array.from(merged.values());
};



export const initLoadActiveTbmDeltaThresholds = async (concurrency = 6) => {
    try {
        // get active TBM ids from metadataStore (refresh if needed)
        const canonicalKeys = metadataStore.getAllTbmCanonicalKeys();
        if (!canonicalKeys || !canonicalKeys.length) return [];

        // batch refresh with limited concurrency
        const results = [];
        for (let i = 0; i < canonicalKeys.length; i += concurrency) {
            const batch = canonicalKeys.slice(i, i + concurrency);
            const batchRes = await Promise.all(batch.map((key) => initRefreshActiveTbmDeltaThresholds(key)));
            results.push(...batchRes);
        }
        return results;
    } catch (err) {
        console.error('[thresholdService] initLoadActiveTbmThresholds  failed', err);
        return [];
    }
};



const deltaCache = new Map();
const DELTA_CACHE_TTL = 5 * 60 * 1000; // 5分钟

export const getDeltaThresholdsForParam = async (paramId) => {
    const cacheKey = `${paramId}:${profileName ?? 'default'}`;
    const now = Date.now();
    const cached = deltaCache.get(cacheKey);
    if (cached && now - cached._fetchedAt < DELTA_CACHE_TTL) return cached.value;
    const base = await fetchDeltaBaseForParam(paramId, profileName);
    deltaCache.set(cacheKey, { value: base, _fetchedAt: now });
    return base;
};

export const getDeltaOverridesForParam = async (tbmId, paramId) => {
    const cacheKey = `${tbmId}:${paramId}`;
    const now = Date.now();
    const cached = deltaCache.get(cacheKey);
    if (cached && now - cached._fetchedAt < DELTA_CACHE_TTL) return cached.value;
    const overrides = await fetchDeltaOverridesForParam(tbmId, paramId);
    deltaCache.set(cacheKey, { value: overrides, _fetchedAt: now });
    return overrides;
};

export const clearDeltaCache = () => {
    deltaCache.clear();
};

export const initRefreshActiveTbmDeltaThresholds = async (canonicalKey) => {
    try {
        // 仅处理已知 TBM：要求能解析出真实 tbm_key 和元数据

        if (!canonicalKey) {
            console.warn('[thresholdService] skip refreshTbm for unknown canonicalKey', { canonicalKey });
            return null;
        }
        const resolvedMeta = metadataStore.getTbmMetadata(canonicalKey);


        const resolvedId = resolvedMeta.tbm_id ?? resolvedMeta.tbmId;

        const base = await getBaseDeltaThresholds();
        const overridesRes = await getDeltaThresholdsForTbm(resolvedId);

        console.log('[deltaThresholdService] initRefreshActiveTbmThresholds: fetched overrides', { overridesRes });


        // getThresholdsForTbm returns an object which may contain keys for resolved tbm_id and/or tbm_code
        // determine the best key to pick overrides from (prefer tbm_code when available)
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        let overrides = {};
        let chosenKey = null;
        if (overridesRes) {
            if (overridesRes[resolvedId]) {
                chosenKey = resolvedId;
                overrides = overridesRes[resolvedId];
            } else {
                const keys = Object.keys(overridesRes);
                const codeKey = keys.find((k) => !uuidRegex.test(k));
                const idKey = keys.find((k) => uuidRegex.test(k));
                chosenKey = codeKey || idKey || (keys.length ? keys[0] : null);
                if (chosenKey) overrides = overridesRes[chosenKey] || {};
            }
        }
        //console.log("handle-overrides", overrides);

        const mergedRaw = mergeDeltaThresholds(base, overrides);
        const perParam = buildPerParam(mergedRaw, { tbmId: chosenKey || resolvedId });
        // store the perParam object directly (no outer wrapper) so callers get the
        // parameter map directly instead of a duplicated { tbmPrefix: { ... } }
        const result = perParam;
        // write only under canonical key (tbmId prefix) to avoid duplicated UUID+code entries
        const writeKey = canonicalKey; // 缓存只用真实 tbm_key
        mergedCache.set(writeKey, { value: result, _fetchedAt: Date.now() });
        // return the perParam map directly
        //console.log("[deltaThresholdService] initRefreshActiveTbmThresholds: fetched result", result);

        return result;
    } catch (err) {
        console.warn('[tdeltaThresholdService] initRefreshActiveTbmThresholds error:', err?.message || err);
        mergedCache.delete(canonicalKey);
        return null;
    }
};

export const getMergedDeltaThresholdsForTbm = async (canonicalKey) => {
    const now = Date.now();

    const cached = mergedCache.get(canonicalKey);
    if (canonicalKey && cached && now - cached._fetchedAt < MERGED_CACHE_TTL) return cached.value;
    // when refreshing, pass through the original tbmId so refresh can resolve overrides
    return initRefreshActiveTbmDeltaThresholds(canonicalKey);
};

export default {
    mergeDeltaThresholds,
    initRefreshActiveTbmDeltaThresholds,
    getDeltaThresholdsForTbm,
    initLoadActiveTbmDeltaThresholds,
};
