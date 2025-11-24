import { supabase } from "../utils/supabase/client.js";

const DELTA_BASE_TABLE = 'tbm_parameter_delta_thresholds';
const DELTA_OVERRIDE_TABLE = 'tbm_delta_threshold_overrides';

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
        paramId: row.param_id ?? null,
        windowMs: row.window_ms != null ? Number(row.window_ms) : null,
        deltaWarningAbs: normalizeNumeric(row.delta_warning_abs),
        deltaCriticalAbs: normalizeNumeric(row.delta_critical_abs),
        updatedBy: row.updated_by ?? null,
        isActive: row.is_active ?? true,
    };
};

const normalizeDeltaRows = (rows = []) => {
    const list = [];
    if (!Array.isArray(rows)) return list;
    for (const row of rows) {
        const normalized = normalizeDeltaRow(row);
        if (normalized) list.push(normalized);
    }
    list.sort((a, b) => (a.windowMs ?? Number.POSITIVE_INFINITY) - (b.windowMs ?? Number.POSITIVE_INFINITY));
    return list;
};

export const fetchDeltaBaseForParam = async (paramId) => {
    if (!paramId || !supabase) return [];
    try {
        let query = supabase
            .from(DELTA_BASE_TABLE)
            .select('*')
            .eq('param_id', paramId)
            .eq('is_active', true);

        const { data, error } = await query;
        if (error) {
            console.warn('[deltaThresholdStore] fetchDeltaBaseForParam error:', error.message || error);
            return [];
        }
        if (!Array.isArray(data) || !data.length) return [];
        return normalizeDeltaRows(data);
    } catch (err) {
        console.warn('[deltaThresholdStore] fetchDeltaBaseForParam unexpected error:', err?.message || err);
        return [];
    }
};

export const fetchDeltaOverridesForParam = async (tbmId, paramId) => {
    if (!tbmId || !paramId || !supabase) return [];
    try {
        const { data, error } = await supabase
            .from(DELTA_OVERRIDE_TABLE)
            .select('*')
            .eq('tbm_id', tbmId)
            .eq('param_id', paramId)
            .eq('is_active', true);
        if (error) {
            console.warn('[deltaThresholdStore] fetchDeltaOverridesForParam error:', error.message || error);
            return [];
        }
        return normalizeDeltaRows(data);
    } catch (err) {
        console.warn('[deltaThresholdStore] fetchDeltaOverridesForParam unexpected error:', err?.message || err);
        return [];
    }
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
                console.warn('[deltaThresholdStore] fetchParameterMetadata error:', error.message || error);
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
        console.warn('[deltaThresholdStore] fetchParameterMetadata unexpected error:', err?.message || err);
        return {};
    }
};


export const getBaseDeltaThresholds = async () => {
    // console.log("start getBaseDeltaThresholds");

    const cacheKey = 'base';
    const now = Date.now();
    const cached = baseCache.get(cacheKey);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    try {
        if (!supabase) throw new Error('supabase client not configured');

        const { data: rows, error } = await supabase
            .from(DELTA_BASE_TABLE)
            .select('*')
            .eq('is_active', true);

        if (error) {
            console.warn('[deltaThresholdStore] could not fetch base delta thresholds for profile', error.message || error);
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }


        const hasStatic = Array.isArray(rows) && rows.length > 0;


        if (!hasStatic) {
            baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
            return {};
        }
        const normalizedRows = normalizeDeltaRows(rows);
        // map paramId -> paramCode via tbm_runtime_parameters
        const staticParamIds = hasStatic ? normalizedRows.map((r) => r?.paramId).filter(Boolean) : [];

        const uniqueParamIds = Array.from(new Set([...staticParamIds]));
        const paramMap = await fetchParameterMetadata(uniqueParamIds);

        const out = {};
        const ensureEntry = (paramId) => {
            if (!paramId) return null;
            const metadata = paramMap[paramId] || {};
            const code = metadata.code || String(paramId);
            if (!out[code]) {
                out[code] = {
                    paramId: paramId,
                    paramCode: code,
                    paramName: metadata.name ?? null,
                };
            } else {
                out[code].paramId = out[code].param_id ?? paramId;
                out[code].paramCode = out[code].param_code ?? code;
                if (!out[code].paramName && metadata.name) out[code].param_name = metadata.name;
            }
            if (!out[code].name && out[code].paramName) out[code].name = out[code].paramName;
            return out[code];
        };

        if (hasStatic) {
            for (const r of normalizedRows) {
                if (!r?.paramId) continue;
                const entry = ensureEntry(r.paramId);
                if (!entry) continue;
                entry.windowMs = r.windowMs;
                entry.deltaWarningAbs = r.deltaWarningAbs;
                entry.deltaCriticalAbs = r.deltaCriticalAbs;
            }
        }

        baseCache.set(cacheKey, { _fetchedAt: now, value: out });
        return out;
    } catch (err) {
        console.warn('[deltaThresholdStore] getBaseDeltaThresholds error:', err?.message || err);
        baseCache.set(cacheKey, { _fetchedAt: now, value: {} });
        return {};
    }
};


export const getDeltaThresholdsForTbm = async (tbmId) => {
    const now = Date.now();
    const inputKey = tbmId ?? '__unknown__';
    const cached = cache.get(inputKey);
    if (cached && now - cached._fetchedAt < CACHE_TTL) return cached.value;

    try {
        if (!supabase) throw new Error('supabase client not configured');

        if (tbmId) {
            const secondaryCached = cache.get(tbmId);
            if (secondaryCached && now - secondaryCached._fetchedAt < CACHE_TTL) {
                cache.set(inputKey, secondaryCached);
                return secondaryCached.value;
            }
        }

        if (!tbmId) {
            console.warn('[deltaThresholdStore] getDelataThresholdsForTbm: unable to resolve tbm identifier', { tbmId });
            const empty = {};
            cache.set(inputKey, { _fetchedAt: now, value: empty });
            return empty;
        }

        const { data: ovs, error: ovsErr } = await supabase
            .from(DELTA_OVERRIDE_TABLE)
            .select('*')
            .eq('tbm_id', tbmId)
            .eq('is_active', true);

        if (ovsErr) {
            console.warn('[deltaThresholdStore] could not fetch tbm_delta_threshold_overrides:', ovsErr.message || ovsErr);
            cache.set(tbmId, { _fetchedAt: now, value: {} });
            if (inputKey !== tbmId) {
                cache.set(inputKey, { _fetchedAt: now, value: {} });
            }
            return {};
        }

        const normalizedOvs = normalizeDeltaRows(ovs);

        const overrideParamIds = new Set((normalizedOvs || []).map((o) => o?.paramId).filter(Boolean));
        const paramIds = Array.from(overrideParamIds);
        const paramMap = await fetchParameterMetadata(paramIds);

        const out = {};
        const ensureEntry = (paramId) => {
            if (!paramId) return null;
            const metadata = paramMap[paramId] || {};
            const code = metadata.code || String(paramId);
            if (!out[code]) {
                out[code] = {
                    paramId: paramId,
                    paramCode: code,
                    paramName: metadata.name ?? null,
                };
            } else {
                out[code].paramId = out[code].paramId ?? paramId;
                out[code].paramCode = out[code].paramCode ?? code;
                if (!out[code].paramName && metadata.name) out[code].paramName = metadata.name;
            }
            if (!out[code].name && out[code].paramName) out[code].name = out[code].paramName;
            return out[code];
        };

        if (Array.isArray(ovs)) {
            for (const o of ovs) {
                if (!o?.paramId) continue;
                const entry = ensureEntry(o.paramId);
                if (!entry) continue;
                entry.windowMs = o.windowMs;
                entry.deltaWarningAbs = o.deltaWarningAbs;
                entry.deltaCriticalAbs = o.deltaCriticalAbs;
            }
        }


        const result = {};
        result[tbmId] = out;
        if (typeof tbmId === 'string' && tbmId && tbmId !== tbmId) {
            result[tbmId] = out;
        }

        const payload = { _fetchedAt: now, value: result };
        cache.set(tbmId, payload);
        cache.set(inputKey, payload);
        return result;
    } catch (err) {
        console.warn('[deltaThresholdStore] error reading overrides:', err?.message || err);
        cache.set(inputKey, { _fetchedAt: now, value: {} });
        return {};
    }
};

