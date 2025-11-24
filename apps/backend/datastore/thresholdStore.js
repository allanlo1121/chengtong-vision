import { supabase } from "../utils/supabase/client.js";
import { resolveTbmIdByKey, refreshTbmMetadata } from "./metadataStore.js";

const cache = new Map();
const CACHE_TTL = 30 * 1000; // 30s
const baseCache = new Map(); // cache for profile-based base thresholds (added to fix undefined error)

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const TBM_TABLE_CANDIDATES = ["tbms", "tunnels"];


const normalizeNumeric = (value) => {
    if (value === null || value === undefined) return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
};

const normalizeDeltaRow = (row) => {
    if (!row) return null;
    return {
        id: row.id ?? null,
        window_ms: row.window_ms != null ? Number(row.window_ms) : null,
        delta_warning_abs: normalizeNumeric(row.delta_warning_abs),
        delta_critical_abs: normalizeNumeric(row.delta_critical_abs),
        updated_by: row.updated_by ?? null,
        updated_at: row.updated_at ?? null,
        profile_name: row.profile_name ?? null,
    };
};

const normalizeDeltaRows = (rows = []) => {
    const list = [];
    if (!Array.isArray(rows)) return list;
    for (const row of rows) {
        const normalized = normalizeDeltaRow(row);
        if (normalized) list.push(normalized);
    }
    list.sort((a, b) => (a.window_ms ?? Number.POSITIVE_INFINITY) - (b.window_ms ?? Number.POSITIVE_INFINITY));
    return list;
};


const fetchParameterMetadata = async (paramIds = []) => {
    if (!Array.isArray(paramIds) || !paramIds.length) return {};
    if (!supabase) return {};
    try {
        const { data, error } = await supabase
            .from('tbm_runtime_parameters')
            .select('id,code,name')
            .in('id', paramIds);
        if (error || !Array.isArray(data)) {
            if (error) {
                console.warn('[thresholdStore] fetchParameterMetadata error:', error.message || error);
            }
            return {};
        }
        const map = {};
        for (const row of data) {
            if (!row?.id) continue;
            map[row.id] = {
                code: row.code || String(row.id),
                name: row.name ?? null,
            };
        }
        return map;
    } catch (err) {
        console.warn('[thresholdStore] fetchParameterMetadata unexpected error:', err?.message || err);
        return {};
    }
};


const fetchTbmRow = async (columns, columnName, value) => {
    for (const table of TBM_TABLE_CANDIDATES) {
        try {
            const { data, error } = await supabase
                .from(table)
                .select(columns)
                .eq(columnName, value)
                .limit(1);

            if (error) continue;
            if (Array.isArray(data) && data.length) {
                return { row: data[0], table };
            }
        } catch (err) {
            // ignore lookup failures and try the next candidate
        }
    }
    return { row: null, table: null };
};

const resolveTbmId = async (identifier) => {
    if (!identifier) return null;
    if (typeof identifier === 'string' && UUID_REGEX.test(identifier)) {
        return identifier;
    }

    let resolved = null;

    if (typeof identifier === 'string') {
        try {
            resolved = resolveTbmIdByKey ? resolveTbmIdByKey(identifier) : null;
            if (!resolved && typeof refreshTbmMetadata === 'function') {
                await refreshTbmMetadata();
                resolved = resolveTbmIdByKey ? resolveTbmIdByKey(identifier) : null;
            }
        } catch (err) {
            // ignore metadata refresh errors and continue with direct lookups
        }

        if (!resolved) {
            const { row } = await fetchTbmRow('id', 'tbm_code', identifier);
            if (row?.id) {
                resolved = row.id;
            }
        }
    }

    return typeof resolved === 'string' ? resolved : null;
};

/**
 * Returns thresholds for standard TBMs.
 * Result shape:
 * {
 *   defaultWarning: number,
 *   defaultCritical: number,
 *   perParam: { [paramCode]: { warningThreshold, criticalThreshold } }
 * }
 */
export const getThresholdsForTbm = async (tbmIdentifier) => {
    const now = Date.now();
    const inputKey = tbmIdentifier ?? '__unknown__';
    const cached = cache.get(inputKey);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    try {
        if (!supabase) throw new Error('supabase client not configured');

        const resolvedTbmId = await resolveTbmId(tbmIdentifier);

        if (resolvedTbmId) {
            const secondaryCached = cache.get(resolvedTbmId);
            if (secondaryCached && now - secondaryCached._fetchedAt < CACHE_TTL) {
                cache.set(inputKey, secondaryCached);
                return secondaryCached.value;
            }
        }

        if (!resolvedTbmId) {
            console.warn('[thresholdStore] getThresholdsForTbm: unable to resolve tbm identifier', { tbmIdentifier });
            const empty = {};
            cache.set(inputKey, { _fetchedAt: now, value: empty });
            return empty;
        }

        const { data: ovs, error: ovsErr } = await supabase
            .from('tbm_threshold_overrides')
            .select('*')
            .eq('tbm_id', resolvedTbmId)
            .eq('is_active', true);

        if (ovsErr) {
            console.warn('[thresholdStore] could not fetch tbm_threshold_overrides:', ovsErr.message || ovsErr);
            cache.set(resolvedTbmId, { _fetchedAt: now, value: {} });
            if (inputKey !== resolvedTbmId) {
                cache.set(inputKey, { _fetchedAt: now, value: {} });
            }
            return {};
        }

        const overrideParamIds = new Set((ovs || []).map((o) => o?.param_id).filter(Boolean));
        const paramIds = Array.from(overrideParamIds);
        const paramMap = await fetchParameterMetadata(paramIds);

        const out = {};
        const ensureEntry = (paramId) => {
            if (!paramId) return null;
            const metadata = paramMap[paramId] || {};
            const code = metadata.code || String(paramId);
            if (!out[code]) {
                out[code] = {
                    param_id: paramId,
                    param_code: code,
                    param_name: metadata.name ?? null,
                };
            } else {
                out[code].param_id = out[code].param_id ?? paramId;
                out[code].param_code = out[code].param_code ?? code;
                if (!out[code].param_name && metadata.name) out[code].param_name = metadata.name;
            }
            if (!out[code].name && out[code].param_name) out[code].name = out[code].param_name;
            return out[code];
        };

        if (Array.isArray(ovs)) {
            for (const o of ovs) {
                if (!o?.param_id) continue;
                const entry = ensureEntry(o.param_id);
                if (!entry) continue;
                entry.baseline_lower = o.baseline_lower != null ? Number(o.baseline_lower) : null;
                entry.baseline_upper = o.baseline_upper != null ? Number(o.baseline_upper) : null;
                entry.alert_lower = o.alert_lower != null ? Number(o.alert_lower) : null;
                entry.alert_upper = o.alert_upper != null ? Number(o.alert_upper) : null;
                entry.alert_upper_upper = o.alert_upper_upper != null ? Number(o.alert_upper_upper) : null;
                entry.alert_lower_lower = o.alert_lower_lower != null ? Number(o.alert_lower_lower) : null;
                entry.use_absolute = !!o.use_absolute;
                entry.updated_by = o.updated_by ?? entry.updated_by ?? null;
                entry.updated_at = o.updated_at ?? entry.updated_at ?? null;
                entry.profile_name = o.profile_name ?? entry.profile_name ?? null;
            }
        }


        const result = {};
        result[resolvedTbmId] = out;
        if (typeof tbmIdentifier === 'string' && tbmIdentifier && tbmIdentifier !== resolvedTbmId) {
            result[tbmIdentifier] = out;
        }

        const payload = { _fetchedAt: now, value: result };
        cache.set(resolvedTbmId, payload);
        cache.set(inputKey, payload);
        return result;
    } catch (err) {
        console.warn('[thresholdStore] error reading overrides:', err?.message || err);
        cache.set(inputKey, { _fetchedAt: now, value: {} });
        return {};
    }
};
export default { getThresholdsForTbm };

/**
 * Get a concrete threshold record for a specific TBM and param_id.
 * Priority: overrides (tbm_threshold_overrides) -> mapped thresholds (threshold_tbm_types -> tbm_parameter_thresholds)
 * -> global tbm_parameter_thresholds (no mapping) -> null
 */
export const getThresholdForTbmParam = async (tbmIdentifier, param_id) => {
    try {
        if (!supabase) throw new Error('supabase client not configured');

        const resolvedTbmId = await resolveTbmId(tbmIdentifier);

        if (!resolvedTbmId) {
            console.warn('[thresholdStore] getThresholdForTbmParam: unable to resolve tbm identifier', { tbmIdentifier, param_id });
            return null;
        }

        // 1) check overrides
        const { data: ov, error: ovErr } = await supabase
            .from('tbm_threshold_overrides')
            .select('*')
            .eq('tbm_id', resolvedTbmId)
            .eq('param_id', param_id)
            .eq('is_active', true)
            .limit(1);
        const deltaOverrides = await fetchDeltaOverridesForParam(resolvedTbmId, param_id);

        if (!ovErr && Array.isArray(ov) && ov.length) {
            const overrideRecord = { ...ov[0] };
            if (deltaOverrides.length) overrideRecord.delta_thresholds = deltaOverrides;
            return overrideRecord;
        }

        if (deltaOverrides.length) {
            const profileFromDeltaOverride = deltaOverrides.find((d) => d.profile_name)?.profile_name ?? null;
            return {
                tbm_id: resolvedTbmId,
                param_id,
                delta_thresholds: deltaOverrides,
                profile_name: profileFromDeltaOverride,
            };
        }

        // 2) determine tbm_type_code for this tbm
        let tbmTypeCode = null;
        try {
            const { row: t } = await fetchTbmRow('tbm_type_id', 'id', resolvedTbmId);
            if (t && t.tbm_type_id) {
                const { data: tt } = await supabase.from('tbm_types').select('code').eq('id', t.tbm_type_id).limit(1);
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
                        if (!mappedErr && Array.isArray(mappedThresholds) && mappedThresholds.length) {
                            const mappedRecord = { ...mappedThresholds[0] };
                            const profileName = mappedRecord.profile_name ?? null;
                            const deltaBaseForProfile = await fetchDeltaBaseForParam(param_id, profileName);
                            if (deltaBaseForProfile.length) mappedRecord.delta_thresholds = deltaBaseForProfile;
                            return mappedRecord;
                        }
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
            .eq('is_active', true)
            .limit(1);
        if (!gErr && Array.isArray(globals) && globals.length) {
            const globalRecord = { ...globals[0] };
            const deltaBaseDefault = await fetchDeltaBaseForParam(param_id, globalRecord.profile_name ?? null);
            if (deltaBaseDefault.length) globalRecord.delta_thresholds = deltaBaseDefault;
            return globalRecord;
        }

        const deltaFallback = await fetchDeltaBaseForParam(param_id, null);
        if (deltaFallback.length) {
            const profileFromDelta = deltaFallback.find((d) => d.profile_name)?.profile_name ?? null;
            return {
                param_id,
                delta_thresholds: deltaFallback,
                profile_name: profileFromDelta,
            };
        }

        return null;
    } catch (err) {
        console.warn('[thresholdStore] getThresholdForTbmParam error:', err?.message || err);
        return null;
    }
};


export const getBaseThresholds = async () => {
    // console.log("start getBaseThresholds");

    const cacheKey = 'base';
    const now = Date.now();
    const cached = baseCache.get(cacheKey);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    try {
        if (!supabase) throw new Error('supabase client not configured');

        const { data: rows, error } = await supabase
            .from('tbm_parameter_thresholds')
            .select('*')
            .eq('is_active', true);

        if (error) {
            console.warn('[thresholdStore] could not fetch base thresholds for profile', error.message || error);
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }


        const hasStatic = Array.isArray(rows) && rows.length > 0;


        if (!hasStatic) {
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }
        // map param_id -> param_code via tbm_runtime_parameters
        const staticParamIds = hasStatic ? rows.map((r) => r?.param_id).filter(Boolean) : [];

        const uniqueParamIds = Array.from(new Set([...staticParamIds]));
        const paramMap = await fetchParameterMetadata(uniqueParamIds);

        const out = {};
        const ensureEntry = (paramId) => {
            if (!paramId) return null;
            const metadata = paramMap[paramId] || {};
            const code = metadata.code || String(paramId);
            if (!out[code]) {
                out[code] = {
                    param_id: paramId,
                    param_code: code,
                    param_name: metadata.name ?? null,
                };
            } else {
                out[code].param_id = out[code].param_id ?? paramId;
                out[code].param_code = out[code].param_code ?? code;
                if (!out[code].param_name && metadata.name) out[code].param_name = metadata.name;
            }
            if (!out[code].name && out[code].param_name) out[code].name = out[code].param_name;
            return out[code];
        };

        if (hasStatic) {
            for (const r of rows) {
                if (!r?.param_id) continue;
                const entry = ensureEntry(r.param_id);
                if (!entry) continue;
                entry.baseline_lower = r.baseline_lower != null ? Number(r.baseline_lower) : null;
                entry.baseline_upper = r.baseline_upper != null ? Number(r.baseline_upper) : null;
                entry.alert_lower = r.alert_lower != null ? Number(r.alert_lower) : null;
                entry.alert_upper = r.alert_upper != null ? Number(r.alert_upper) : null;
                entry.alert_upper_upper = r.alert_upper_upper != null ? Number(r.alert_upper_upper) : null;
                entry.alert_lower_lower = r.alert_lower_lower != null ? Number(r.alert_lower_lower) : null;
                entry.use_absolute = !!r.use_absolute;
                entry.profile_name = r.profile_name ?? entry.profile_name ?? null;
                entry.updated_by = r.updated_by ?? entry.updated_by ?? null;
                entry.updated_at = r.updated_at ?? entry.updated_at ?? null;
            }
        }


        baseCache.set(cacheKey, { _fetchedAt: now, value: out });
        return out;
    } catch (err) {
        console.warn('[thresholdStore] getBaseThresholds error:', err?.message || err);
        baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
        return {};
    }
};