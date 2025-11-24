import { supabase } from '../utils/supabase/client.js';
import { getBaseThresholds, getThresholdsForTbm } from '../datastore/thresholdStore.js';
import * as metadataStore from '../datastore/metadataStore.js';

const mergedCache = new Map();
const DEFAULT_CONCURRENCY = 6;
const MERGED_CACHE_TTL = 5 * 60 * 1000; // 5 minutes by default for merged thresholds

// canonical key for cache: strictly use metadataStore.getTbmKey (真实存在的 tbm_key)
const canonicalKey = (tbmId) => {
    if (!metadataStore.getTbmKey) return null;
    const key = metadataStore.getTbmKey(tbmId);
    return key || null;
};

export const mergeThresholds = (base = {}, overrides = {}) => {
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
    // Return a structured threshold object per param suitable for realtime evaluation
    // Shape:
    // { paramCode: { param_id, param_code, param_name, use_absolute, direction, unit, warning: { lower?, upper? }, critical: { lower?, upper? } } }
    const perParam = {};
    for (const [code, r] of Object.entries(rawMap || {})) {
        // r may contain baseline_lower/upper, alert_lower/upper, alert_upper_upper, alert_lower_lower, use_absolute
        const use_absolute = !!r.use_absolute;
        let warningLower = r.alert_lower != null ? Number(r.alert_lower) : undefined;
        let warningUpper = r.alert_upper != null ? Number(r.alert_upper) : undefined;
        let criticalLower = r.alert_lower_lower != null ? Number(r.alert_lower_lower) : undefined;
        let criticalUpper = r.alert_upper_upper != null ? Number(r.alert_upper_upper) : undefined;

        // infer direction
        let direction = 'both';
        if (warningUpper === undefined && criticalUpper === undefined && (warningLower !== undefined || criticalLower !== undefined)) direction = 'low';
        else if (warningLower === undefined && criticalLower === undefined && (warningUpper !== undefined || criticalUpper !== undefined)) direction = 'high';

        // attempt to get unit and authoritative name from metadata store
        let unit = null;
        let paramName = r.param_name || null;
        try {
            const meta = metadataStore.getParameterMetadata(code);
            if (meta) {
                unit = meta.unit || unit;
                paramName = meta.name || paramName;
            }
        } catch (e) {
            // ignore metadata lookup failures
        }

        // Normalization: ensure critical bounds make sense (lower <= upper) and are at least as extreme as warning
        const tbmId = ctx.tbmId || null;
        // swap if inverted
        if (criticalLower !== undefined && criticalUpper !== undefined && criticalLower > criticalUpper) {
            // console.warn(`[thresholdService] normalizing inverted critical bounds for tbm=${tbmId} param=${code} (swapping ${criticalLower} and ${criticalUpper})`);
            const tmp = criticalLower;
            criticalLower = criticalUpper;
            criticalUpper = tmp;
        }
        // ensure critical is at least as extreme as warning; if not, adjust and warn
        if (warningUpper !== undefined && criticalUpper !== undefined && criticalUpper < warningUpper) {
            // console.warn(`[thresholdService] adjusting criticalUpper for tbm=${tbmId} param=${code} from ${criticalUpper} -> ${warningUpper}`);
            criticalUpper = warningUpper;
        }
        if (warningLower !== undefined && criticalLower !== undefined && criticalLower > warningLower) {
            // console.warn(`[thresholdService] adjusting criticalLower for tbm=${tbmId} param=${code} from ${criticalLower} -> ${warningLower}`);
            criticalLower = warningLower;
        }


        perParam[code] = {
            param_id: r.param_id || null,
            param_code: code,
            param_name: paramName,
            use_absolute,
            direction,
            unit,
            ranges: {
                warning_low: warningLower,
                warning_high: warningUpper,
                critical_low: criticalLower,
                critical_high: criticalUpper,
            }
        };


    };

    return perParam;
};

export const initRefreshActiveTbmThresholds = async (canonicalKey) => {
    try {
        // 仅处理已知 TBM：要求能解析出真实 tbm_key 和元数据

        if (!canonicalKey) {
            console.warn('[thresholdService] skip refreshTbm for unknown canonicalKey', { canonicalKey });
            return null;
        }
        const resolvedMeta = metadataStore.getTbmMetadata(canonicalKey);

        // Accept metadata objects that may use either snake_case `tbm_id` or camelCase `tbmId`
        if (!(resolvedMeta?.tbm_id || resolvedMeta?.tbmId)) {
            // include stack and process info to help trace who called initRefreshActiveTbmThresholds
            const debugInfo = {
                tbmId,
                canonicalKey,
                resolvedMeta,
                pid: process?.pid ?? null,
                ts: new Date().toISOString(),
            };
            const stack = new Error('[thresholdService] refreshTbm called from').stack;
            console.warn('[thresholdService] skip refreshTbm: metadata not found', debugInfo, '\ncaller stack:\n', stack);
            return null;
        }
        const resolvedId = resolvedMeta.tbm_id ?? resolvedMeta.tbmId;

        const base = await getBaseThresholds();
        const overridesRes = await getThresholdsForTbm(resolvedId);

        //console.log('[thresholdService] initRefreshActiveTbmThresholds: fetched overrides', { overridesRes });


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

        const mergedRaw = mergeThresholds(base, overrides);
        const perParam = buildPerParam(mergedRaw, { tbmId: chosenKey || resolvedId });
        // store the perParam object directly (no outer wrapper) so callers get the
        // parameter map directly instead of a duplicated { tbmPrefix: { ... } }
        const result = perParam;
        // write only under canonical key (tbmId prefix) to avoid duplicated UUID+code entries
        const writeKey = canonicalKey; // 缓存只用真实 tbm_key
        mergedCache.set(writeKey, { value: result, _fetchedAt: Date.now() });
        // return the perParam map directly
        //console.log("[thresholdService] initRefreshActiveTbmThresholds: fetched result", result);

        return result;
    } catch (err) {
        console.warn('[thresholdService] initRefreshActiveTbmThresholds error:', err?.message || err);
        mergedCache.delete(canonicalKey);
        return null;
    }
};

export const getMergedThresholdsForTbm = async (canonicalKey) => {
    const now = Date.now();

    const cached = mergedCache.get(canonicalKey);
    if (canonicalKey && cached && now - cached._fetchedAt < MERGED_CACHE_TTL) return cached.value;
    // when refreshing, pass through the original tbmId so refresh can resolve overrides
    return initRefreshActiveTbmThresholds(canonicalKey);
};

// Read-only accessor: get cached merged thresholds for a TBM (may be null if not cached or expired)
export const getCachedForTbm = (canonicalKey) => {
    const cached = mergedCache.get(canonicalKey);
    if (!cached) return null;
    return cached.value || null;
};

// Snapshot: return a plain object snapshot of the current merged cache (keys -> value)
export const getMergedCacheSnapshot = () => {
    const out = {};
    for (const [k, v] of mergedCache.entries()) {
        out[k] = v?.value || null;
    }
    return out;
};

const scheduleRefresh = (canonicalKey) => {
    // small debounce could be added here, but keep simple
    initRefreshActiveTbmThresholds(canonicalKey).catch((e) => console.error(e));
};

export const startSubscriptions = () => {
    // subscribe to overrides table changes
    const overridesChannel = supabase
        .channel('tbm_threshold_overrides_updates')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tbm_threshold_overrides' },
            (payload) => {
                try {
                    const rec = payload.new || payload.record || payload.old || null;
                    const tbmId = rec?.tbm_id || null;
                    if (tbmId) {
                        console.log('[thresholdService] override change detected, refreshing tbmId=', tbmId);
                        scheduleRefresh(tbmId);
                    } else {
                        // if no tbm_id present, clear all cache as fallback
                        console.log('[thresholdService] override change without tbm_id, clearing merged cache');
                        mergedCache.clear();
                    }
                } catch (e) {
                    console.error('[thresholdService] override subscription handler error', e);
                }
            }
        )
        .subscribe((status) => console.log('overrides realtime status', status));

    const deltaOverridesChannel = supabase
        .channel('tbm_delta_threshold_overrides_updates')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tbm_delta_threshold_overrides' },
            (payload) => {
                try {
                    const rec = payload.new || payload.record || payload.old || null;
                    const tbmId = rec?.tbm_id || null;
                    if (tbmId) {
                        console.log('[thresholdService] delta override change detected, refreshing tbmId=', tbmId);
                        scheduleRefresh(tbmId);
                    } else {
                        console.log('[thresholdService] delta override change without tbm_id, clearing merged cache');
                        mergedCache.clear();
                    }
                } catch (e) {
                    console.error('[thresholdService] delta override subscription handler error', e);
                }
            }
        )
        .subscribe((status) => console.log('delta overrides realtime status', status));

    // subscribe to parameter changes
    const paramsChannel = supabase
        .channel('tbm_runtime_parameters_updates')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tbm_runtime_parameters' },
            (payload) => {
                try {
                    console.log('[thresholdService] runtime parameter change detected, refreshing base thresholds');
                    // refresh base thresholds cache by calling getBaseThresholds once
                    getBaseThresholds().catch((e) => console.error('[thresholdService] refresh base error', e));
                    // and clear merged cache so next reads will recompute
                    mergedCache.clear();
                } catch (e) {
                    console.error('[thresholdService] parameter subscription handler error', e);
                }
            }
        )
        .subscribe((status) => console.log('params realtime status', status));

    const deltaBaseChannel = supabase
        .channel('tbm_parameter_delta_thresholds_updates')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tbm_parameter_delta_thresholds' },
            (payload) => {
                try {
                    console.log('[thresholdService] delta base threshold change detected, refreshing base thresholds');
                    getBaseThresholds().catch((e) => console.error('[thresholdService] refresh delta base error', e));
                    mergedCache.clear();
                } catch (e) {
                    console.error('[thresholdService] delta base subscription handler error', e);
                }
            }
        )
        .subscribe((status) => console.log('delta base thresholds realtime status', status));

    return { overridesChannel, deltaOverridesChannel, paramsChannel, deltaBaseChannel };
};

export const initLoadActiveTbmThresholds = async (concurrency = DEFAULT_CONCURRENCY) => {
    try {
        // get active TBM ids from metadataStore (refresh if needed)
        const canonicalKeys = metadataStore.getAllTbmCanonicalKeys();
        if (!canonicalKeys || !canonicalKeys.length) return [];

        // batch refresh with limited concurrency
        const results = [];
        for (let i = 0; i < canonicalKeys.length; i += concurrency) {
            const batch = canonicalKeys.slice(i, i + concurrency);
            const batchRes = await Promise.all(batch.map((key) => initRefreshActiveTbmThresholds(key)));
            results.push(...batchRes);
        }
        return results;
    } catch (err) {
        console.error('[thresholdService] initLoadActiveTbmThresholds  failed', err);
        return [];
    }
};

export default {
    mergeThresholds,
    initRefreshActiveTbmThresholds,
    getMergedThresholdsForTbm,
    startSubscriptions,
    initLoadActiveTbmThresholds,
};
