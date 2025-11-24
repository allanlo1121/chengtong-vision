import { supabase } from "../utils/supabase/client.js";
import { getParameterMetadataById, getParameterMetadataByCode } from "../datastore/metadataStore.js";
import { normalizeTbmKey } from "../utils/tbmKey.js";

const OPEN_RESOLUTION_STATUSES = ["pending", "in_progress"];

const stateByCanonicalKey = new Map(); // canonicalKey -> Map(paramId -> { severity, ringNo, paramCode, updatedAt })
let initialized = false;
let initializingPromise = null;

const normalizeSeverity = (value) => {
    if (!value) return null;
    return String(value).toLowerCase();
};

const normalizeRingNo = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
};

const resolveParamCode = (paramId, fallbackCode = null) => {
    if (fallbackCode) return fallbackCode;
    const meta = getParameterMetadataById(paramId);
    return meta?.code ?? null;
};

const resolveParamId = (paramCode, fallbackId = null) => {
    if (fallbackId !== null && fallbackId !== undefined) return fallbackId;
    if (!paramCode) return null;
    const meta = getParameterMetadataByCode(paramCode);
    return meta?.id ?? null;
};

const resolveCanonicalKey = (identifier) => {
    const normalized = normalizeTbmKey(identifier);
    return normalized ?? null;
};

const getParamMap = (identifier) => {
    const canonicalKey = resolveCanonicalKey(identifier);
    if (!canonicalKey) return null;
    if (!stateByCanonicalKey.has(canonicalKey)) {
        stateByCanonicalKey.set(canonicalKey, new Map());
    }
    return stateByCanonicalKey.get(canonicalKey);
};

//加载参数超限初始状态
const loadInitialState = async () => {
    try {
        const { data, error } = await supabase
            .from("realtime_threshold_events")
            .select("tbm_id, ring_no, param_id, severity")
            .in("resolution_status", OPEN_RESOLUTION_STATUSES);

        if (error) throw error;
        if (!Array.isArray(data)) return;

        let inserted = 0;
        for (const row of data) {
            const tbmId = row?.tbm_id ?? row?.tbmId ?? null;
            const canonicalKey = resolveCanonicalKey(tbmId);
            const paramId = row?.param_id ?? row?.paramId ?? null;
            if (!canonicalKey || paramId === null || paramId === undefined) continue;
            const paramMap = getParamMap(canonicalKey);
            if (!paramMap) continue;

            const normalizedSeverity = normalizeSeverity(row?.severity);
            const normalizedRing = normalizeRingNo(row?.ring_no ?? row?.ringNo ?? null);
            const paramCode = resolveParamCode(paramId, null);

            paramMap.set(paramId, {
                severity: normalizedSeverity,
                ringNo: normalizedRing,
                paramCode: paramCode ?? null,
                updatedAt: Date.now(),
            });
            inserted += 1;
        }

        if (stateByCanonicalKey.size) {
            const sample = Array.from(stateByCanonicalKey.entries())
                .slice(0, 5)
                .map(([key, paramMap]) => ({
                    canonicalKey: key,
                    size: paramMap.size,
                    params: Array.from(paramMap.entries())
                        .slice(0, 3)
                        .map(([paramId, meta]) => ({ paramId, ...meta })),
                }));
            console.log(
                `[thresholdStateTracker] 初始化完成，缓存 ${stateByCanonicalKey.size} 台 TBM，${inserted} 条异常状态。样例:`,
                sample, sample[0].params
            );
        } else {
            console.log("[thresholdStateTracker] 初始化完成，当前无未解决的指标异常。");
        }
    } catch (err) {
        console.error("[thresholdStateTracker] Failed to load initial state:", err);
    }
};

//确保阈值状态已准备好
export const ensureThresholdStateReady = async () => {
    if (initialized) return;
    if (initializingPromise) {
        await initializingPromise;
        return;
    }
    initializingPromise = loadInitialState();
    try {
        await initializingPromise;
        initialized = true;
    } finally {
        initializingPromise = null;
    }
};

//保存活动的阈值状态
export const upsertActiveThresholdState = ({ canonicalKey, severity, ringNo, paramCode }) => {
    //const resolvedKey = resolveCanonicalKey(canonicalKey ?? tbmId);
    if (!canonicalKey || paramCode === null || paramCode === undefined) {
        return { changed: true, previous: null };
    }

    const paramId = resolveParamId(paramCode, null);
    if (!paramId) return { changed: true, previous: null };

    const paramMap = getParamMap(canonicalKey);
    if (!paramMap) {
        return { changed: true, previous: null };
    }

    const normalizedSeverity = normalizeSeverity(severity);
    const normalizedRing = normalizeRingNo(ringNo);
    const existing = paramMap.get(paramId) ?? null;    

    const changed = !existing
        || existing.severity !== normalizedSeverity
        || existing.ringNo !== normalizedRing;

    paramMap.set(paramId, {
        severity: normalizedSeverity,
        ringNo: normalizedRing,
        paramCode: paramCode ?? null,
        updatedAt: Date.now(),
    });

    return { changed, previous: existing };
};

export const clearActiveThresholdState = ({ canonicalKey, tbmId, paramId }) => {
    const resolvedKey = resolveCanonicalKey(canonicalKey ?? tbmId);
    if (!resolvedKey || paramId === null || paramId === undefined) return null;
    const paramMap = stateByCanonicalKey.get(resolvedKey);
    if (!paramMap) return null;
    const existing = paramMap.get(paramId) ?? null;
    if (existing) {
        paramMap.delete(paramId);
        if (paramMap.size === 0) {
            stateByCanonicalKey.delete(resolvedKey);
        }
    }
    return existing;
};

export const listActiveThresholdStatesForTbm = (identifier) => {
    const resolvedKey = resolveCanonicalKey(identifier);
    const paramMap = resolvedKey ? stateByCanonicalKey.get(resolvedKey) : null;
    if (!paramMap) return [];
    return Array.from(paramMap.entries()).map(([paramId, state]) => ({
        paramId,
        ...state,
    }));
};

export const getActiveThresholdState = ({ canonicalKey, tbmId, paramId }) => {
    const resolvedKey = resolveCanonicalKey(canonicalKey ?? tbmId);
    if (!resolvedKey) return null;
    const paramMap = stateByCanonicalKey.get(resolvedKey);
    if (!paramMap) return null;
    return paramMap.get(paramId) ?? null;
};

export const resetThresholdStateTracker = () => {
    stateByCanonicalKey.clear();
    initialized = false;
    initializingPromise = null;
};