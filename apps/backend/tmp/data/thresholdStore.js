import { supabase } from "../utils/supabase/client.js";

// Defaults
export const DEFAULT_WARNING = 50;
export const DEFAULT_CRITICAL = 80;

const cache = new Map();
const CACHE_TTL = 30 * 1000; // 30s

const baseCache = new Map(); // cache for profile-based base thresholds

/**
 * Returns thresholds for a given tbmcode.
 * Result shape:
 * {
 *   defaultWarning: number,
 *   defaultCritical: number,
 *   perParam: { [paramCode]: { warningThreshold, criticalThreshold } }
 * }
 */
export const getThresholdsForTbm = async (tbmId) => {
    const now = Date.now();
    const cached = cache.get(tbmId);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    // return shape: { [tbmId]: { [paramCode]: fullRow } }
    const result = {};

    try {
        if (!supabase) throw new Error('supabase client not configured');

        // fetch overrides for this tbm (no merging with base thresholds)
        const { data: ovs, error: ovsErr } = await supabase
            .from('tbm_threshold_overrides')
            .select('*')
            .eq('tbm_id', tbmId)
            .eq('is_active', true);

        if (ovsErr) {
            console.warn('[thresholdStore] could not fetch tbm_threshold_overrides:', ovsErr.message || ovsErr);
            cache.set(tbmId, { _fetchedAt: now, value: {} });
            return {};
        }

        console.log("ovs", ovs);


        const out = {};
        if (Array.isArray(ovs) && ovs.length) {
            const overrideParamIds = Array.from(new Set(ovs.map(o => o.param_id).filter(Boolean)));
            const paramMap = {};
            if (overrideParamIds.length) {
                const { data: params, error: pErr } = await supabase
                    .from('tbm_runtime_parameters')
                    .select('id,code,name')
                    .in('id', overrideParamIds);
                if (!pErr && Array.isArray(params)) {
                    for (const p of params) paramMap[p.id] = { code: p.code, name: p.name };
                }
            }

            for (const o of ovs) {
                const mapEntry = paramMap[o.param_id];
                const code = mapEntry ? mapEntry.code : String(o.param_id);
                out[code] = {
                    param_id: o.param_id,
                    param_code: code,
                    param_name: mapEntry ? mapEntry.name : null,
                    baseline_lower: o.baseline_lower != null ? Number(o.baseline_lower) : null,
                    baseline_upper: o.baseline_upper != null ? Number(o.baseline_upper) : null,
                    alert_lower: o.alert_lower != null ? Number(o.alert_lower) : null,
                    alert_upper: o.alert_upper != null ? Number(o.alert_upper) : null,
                    alert_upper_upper: o.alert_upper_upper != null ? Number(o.alert_upper_upper) : null,
                    alert_lower_lower: o.alert_lower_lower != null ? Number(o.alert_lower_lower) : null,
                    use_absolute: !!o.use_absolute,
                };
            }
        }

        result[tbmId] = out;
        cache.set(tbmId, { _fetchedAt: now, value: result });
        return result;
    } catch (err) {
        console.warn('[thresholdStore] error reading overrides:', err?.message || err);
        cache.set(tbmId, { _fetchedAt: now, value: {} });
        return {};
    }
};

export default { getThresholdsForTbm };

/**
 * Get a concrete threshold record for a specific TBM and param_id.
 * Priority: overrides (tbm_threshold_overrides) -> mapped thresholds (threshold_tbm_types -> tbm_parameter_thresholds)
 * -> global tbm_parameter_thresholds (no mapping) -> null
 */
export const getThresholdForTbmParam = async (tbmcode, param_id) => {
    try {
        if (!supabase) throw new Error('supabase client not configured');

        // 1) check overrides
        const { data: ov, error: ovErr } = await supabase
            .from('tbm_threshold_overrides')
            .select('*')
            .eq('tbm_code', tbmcode)
            .eq('param_id', param_id)
            .eq('active', true)
            .limit(1);
        if (!ovErr && Array.isArray(ov) && ov.length) return ov[0];

        // 2) determine tbm_type_code for this tbm
        let tbmTypeCode = null;
        try {
            const { data: t } = await supabase.from('tunnels').select('tbm_type_id').eq('tbm_code', tbmcode).limit(1);
            if (t && t.length && t[0].tbm_type_id) {
                const { data: tt } = await supabase.from('tbm_types').select('code').eq('id', t[0].tbm_type_id).limit(1);
                if (tt && tt.length) tbmTypeCode = tt[0].code;
            }
        } catch (e) {
            // ignore
        }

        if (tbmTypeCode) {
            // 3) find thresholds mapped to this tbm_type using a two-step query compatible with supabase-js
            try {
                const { data: mappings, error: mappingsErr } = await supabase
                    .from('threshold_tbm_types')
                    .select('threshold_id')
                    .eq('tbm_type_code', tbmTypeCode);

                if (!mappingsErr && Array.isArray(mappings) && mappings.length) {
                    const ids = mappings.map(m => m.threshold_id).filter(Boolean);
                    if (ids.length) {
                        const { data: mappedThresholds, error: mappedErr } = await supabase
                            .from('tbm_parameter_thresholds')
                            .select('*')
                            .in('id', ids)
                            .eq('param_id', param_id)
                            .eq('active', true)
                            .limit(1);
                        if (!mappedErr && Array.isArray(mappedThresholds) && mappedThresholds.length) return mappedThresholds[0];
                    }
                }
            } catch (e) {
                // ignore and fall through to global fallback
            }
        }

        // 4) global fallback: any threshold rows for param_id without mapping
        const { data: globals, error: gErr } = await supabase
            .from('tbm_parameter_thresholds')
            .select('*')
            .eq('param_id', param_id)
            .eq('active', true)
            .limit(1);
        if (!gErr && Array.isArray(globals) && globals.length) return globals[0];

        return null;
    } catch (err) {
        console.warn('[thresholdStore] getThresholdForTbmParam error:', err?.message || err);
        return null;
    }
};

/**
 * Load base thresholds for a given profile (default profile_name = 'default')
 * Returns mapping: { paramCode: { ...thresholdRow } }
 */
export const getBaseThresholds = async (profileName = 'default') => {
    const cacheKey = `base:${profileName}`;
    const now = Date.now();
    const cached = baseCache.get(cacheKey);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    try {
        if (!supabase) throw new Error('supabase client not configured');

        const { data: rows, error } = await supabase
            .from('tbm_parameter_thresholds')
            .select('*')
            .eq('profile_name', profileName)
            .eq('active', true);

        if (error) {
            console.warn('[thresholdStore] could not fetch base thresholds for profile', profileName, error.message || error);
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }

        if (!Array.isArray(rows) || !rows.length) {
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }

        // map param_id -> param_code via tbm_runtime_parameters
        const paramIds = Array.from(new Set(rows.map(r => r.param_id).filter(Boolean)));
        const paramMap = {};
        if (paramIds.length) {
            const { data: params, error: pErr } = await supabase
                .from('tbm_runtime_parameters')
                .select('id,code,name')
                .in('id', paramIds);
            if (!pErr && Array.isArray(params)) {
                for (const p of params) paramMap[p.id] = { code: p.code, name: p.name };
            }
        }

        const out = {};
        for (const r of rows) {
            const mapEntry = paramMap[r.param_id];
            const code = mapEntry ? mapEntry.code : String(r.param_id);
            out[code] = {
                name: mapEntry ? mapEntry.name : null,
                baseline_lower: r.baseline_lower,
                baseline_upper: r.baseline_upper,
                alert_lower: r.alert_lower,
                alert_upper: r.alert_upper,
                alert_upper_upper: r.alert_upper_upper,
                alert_lower_lower: r.alert_lower_lower,
                use_absolute: r.use_absolute,
            };
        }

        baseCache.set(cacheKey, { _fetchedAt: now, value: out });
        return out;
    } catch (err) {
        console.warn('[thresholdStore] getBaseThresholds error:', err?.message || err);
        baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
        return {};
    }
};
