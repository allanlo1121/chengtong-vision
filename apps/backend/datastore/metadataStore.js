import { supabase } from "../utils/supabase/client.js";
import { normalizeTbmKey } from "../utils/tbmKey.js";

const TBM_CHANNEL_NAME = "tunnels-updates";
const PARAM_CHANNEL_NAME = "tbm-parameters-updates";
const TBM_REFRESH_DELAY = 500; // ms
const PARAM_REFRESH_DELAY = 500; // ms

const tbmMetadataCache = new Map();
const parameterMetadataCache = new Map();
const parameterMetadataById = new Map();

let tbmRefreshTimeout = null;
let parameterRefreshTimeout = null;
let tbmChannel = null;
let parameterChannel = null;
let tbmMetadataLastRefreshed = 0;
let parameterMetadataLastRefreshed = 0;

// 标准化 TBM Key，用于索引和匹配
const upsertTbmMetadata = (records = []) => {
    tbmMetadataCache.clear();


    records.forEach((item) => {
        if (!item?.tbm_id) return;

        const sourceKey = item.tbm_key ? String(item.tbm_key).trim() : null;
        const canonicalKey = normalizeTbmKey(sourceKey) || normalizeTbmKey(item.tbm_id);

        const record = {
            tbmId: item.tbm_id,
            tbmcode: item.tbm_code,
            projectShortName: item.project_short_name,
            tunnelName: item.name,
            tbmName: item.tbm_name,
            status: item.status,
            canonicalKey: canonicalKey || null,
            currentRing: item.current_ring || null,
        };

        // 使用 canonicalKey 作为缓存的主键，系统主要以 canonicalKey 为权威标识
        const cacheKey = record.canonicalKey || item.tbm_id;
        tbmMetadataCache.set(cacheKey, record);
    });

    tbmMetadataLastRefreshed = Date.now();
    console.log(`✅ TBM metadata refreshed. Cached ${tbmMetadataCache.size} entries.`);
    console.log(
        "🔍 Sample TBM  metadata:",
        Array.from(tbmMetadataCache.entries())
            .slice(0, 2)
            .map(([code, meta]) => ({ code, ...meta }))
    )
};

const upsertParameterMetadata = (records = []) => {
    parameterMetadataCache.clear();
    parameterMetadataById.clear();
    records.forEach((item) => {
        if (!item?.code) return;
        const subsystem = Array.isArray(item?.subsystem) ? item.subsystem[0] : item?.subsystem;
        const meta = {
            id: item.id ?? null,
            code: item.code ?? null,
            name: item.name,
            unit: item.unit,
            subsystemId: item.subsystem_id ?? subsystem?.id ?? null,
            subsystemCode: subsystem?.code ?? null,
            subsystemName: subsystem?.name ?? null,
        };

        parameterMetadataCache.set(item.code, meta);

        if (item.id !== undefined && item.id !== null) {
            const numericId = Number(item.id);
            if (!Number.isNaN(numericId)) {
                parameterMetadataById.set(numericId, meta);
            }
            parameterMetadataById.set(String(item.id), meta);
        }
    });
    parameterMetadataLastRefreshed = Date.now();
    console.log(
        `✅ Parameter metadata refreshed. Cached ${parameterMetadataCache.size} entries.`
    );
    console.log(
        "🔍 Sample parameter metadata:",
        Array.from(parameterMetadataCache.entries())
            .slice(0, 2)
            .map(([code, meta]) => ({ code, ...meta }))
    );
};

// 从 Supabase 读取最新的 TBM 元数据并更新缓存
export const refreshTbmMetadata = async () => {
    try {
        const { data, error } = await supabase
            .from("v_tunnels_overview")
            .select("project_short_name,name,tbm_name,tbm_code,status,tbm_id,current_ring")
            .in('status', ['InProgress', 'Suspended']);

        if (error) throw error;

        if (!data || !data.length) {
            console.warn("⚠️ No tunnel metadata received from v_tunnels_overview");
            tbmMetadataCache.clear();
            tbmMetadataLastRefreshed = Date.now();
            return tbmMetadataCache;
        }

        upsertTbmMetadata(data);
        return tbmMetadataCache;
    } catch (err) {
        console.error("❌ Failed to refresh TBM metadata:", err);
        throw err;
    }
};

export const refreshParameterMetadata = async () => {
    try {
        const { data, error } = await supabase
            .from("tbm_runtime_parameters")
            .select(`
                id,
                code,
                name,
                unit,
                subsystem_id,
                subsystem:tbm_subsystems (
                    id,
                    code,
                    name
                )
            `);

        if (error) throw error;

        if (!data || !data.length) {
            console.warn("⚠️ No parameter metadata received from tbm_runtime_parameters");
            parameterMetadataCache.clear();
            parameterMetadataLastRefreshed = Date.now();
            return parameterMetadataCache;
        }

        upsertParameterMetadata(data);
        return parameterMetadataCache;
    } catch (err) {
        console.error("❌ Failed to refresh parameter metadata:", err);
        throw err;
    }
};

const scheduleTbmRefresh = () => {
    if (tbmRefreshTimeout) return;
    tbmRefreshTimeout = setTimeout(async () => {
        tbmRefreshTimeout = null;
        try {
            await refreshTbmMetadata();
        } catch (err) {
            console.error("❌ TBM metadata refresh (scheduled) failed:", err);
        }
    }, TBM_REFRESH_DELAY);
};

const scheduleParameterRefresh = () => {
    if (parameterRefreshTimeout) return;
    parameterRefreshTimeout = setTimeout(async () => {
        parameterRefreshTimeout = null;
        try {
            await refreshParameterMetadata();
        } catch (err) {
            console.error("❌ Parameter metadata refresh (scheduled) failed:", err);
        }
    }, PARAM_REFRESH_DELAY);
};

export const startTunnelsRealtimeSubscription = () => {
    if (tbmChannel) {
        return tbmChannel;
    }

    tbmChannel = supabase
        .channel(TBM_CHANNEL_NAME)
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "tunnels" },
            (payload) => {
                console.log("🔔 Tunnels table change detected:", payload.eventType);
                scheduleTbmRefresh();
            }
        )
        .subscribe((status) => {
            console.log("🛰️ Tunnels realtime channel status:", status);
        });

    return tbmChannel;
};

export const startParameterRealtimeSubscription = () => {
    if (parameterChannel) {
        return parameterChannel;
    }

    parameterChannel = supabase
        .channel(PARAM_CHANNEL_NAME)
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "tbm_runtime_parameters" },
            (payload) => {
                console.log("🔔 Runtime parameter change detected:", payload.eventType);
                scheduleParameterRefresh();
            }
        )
        .subscribe((status) => {
            console.log("🛰️ Runtime parameter realtime channel status:", status);
        });

    return parameterChannel;
};

export const stopTunnelsRealtimeSubscription = async () => {
    if (!tbmChannel) return;
    await tbmChannel.unsubscribe();
    tbmChannel = null;
    console.log("🛑 Tunnels realtime channel unsubscribed.");
};

export const stopParameterRealtimeSubscription = async () => {
    if (!parameterChannel) return;
    await parameterChannel.unsubscribe();
    parameterChannel = null;
    console.log("🛑 Runtime parameter realtime channel unsubscribed.");
};

export const getTbmMetadata = (idOrKey) => {
    if (!idOrKey) return null;
    // 尝试按 tbm_id 直接查找
    // 先按缓存键（canonicalKey 或 tbm_id）直接查找
    if (tbmMetadataCache.has(idOrKey)) return tbmMetadataCache.get(idOrKey) || null;

    // 否则按规范化 key 在缓存值中查找第一个匹配项
    const normalized = normalizeTbmKey(idOrKey);
    if (!normalized) return null;

    for (const meta of tbmMetadataCache.values()) {
        if (!meta) continue;
        // 优先匹配 canonicalKey
        if (meta.canonicalKey && normalizeTbmKey(meta.canonicalKey) === normalized) return meta;
        // 兼容旧字段名（如果存在）
        if (meta.tbmKey && normalizeTbmKey(meta.tbmKey) === normalized) return meta;
        // 也尝试 tbmId 字符串前缀匹配作为最后手段
        if (String(meta.tbmId || meta.tbm_id || "").slice(0, 8).toUpperCase() === normalized) return meta;
    }

    return null;
};

export const getAllTbmMetadata = () => ({
    lastRefreshedAt: tbmMetadataLastRefreshed,
    entries: Array.from(tbmMetadataCache.values()).map((meta) => ({
        ...meta,
        canonicalKey: meta.canonicalKey || normalizeTbmKey(meta.tbm_id),
    })),
});

export const getTbmIds = async () => {
    if (!tbmMetadataCache.size) {
        try {
            await refreshTbmMetadata();
        } catch (err) {
            console.error("❌ Unable to populate TBM metadata cache:", err);
            return [];
        }
    }

    // tbmMetadataCache 的键现在是 canonicalKey（或回退为 tbm_id），因此需要从值中取 tbm_id
    const activeIds = Array.from(tbmMetadataCache.values())
        .filter((meta) => meta?.status === "InProgress")
        .map((meta) => meta.tbmId)
        .filter(Boolean);

    if (!activeIds.length) {
        console.warn("⚠️ No active TBM IDs found in cache");
    }

    return activeIds;
};

export const getParameterMetadata = (idOrCode) => {
    if (idOrCode === null || idOrCode === undefined) return null;

    if (parameterMetadataCache.has(idOrCode)) {
        return parameterMetadataCache.get(idOrCode) ?? null;
    }

    const numeric = Number(idOrCode);
    if (!Number.isNaN(numeric) && parameterMetadataById.has(numeric)) {
        return parameterMetadataById.get(numeric) ?? null;
    }

    if (parameterMetadataById.has(String(idOrCode))) {
        return parameterMetadataById.get(String(idOrCode)) ?? null;
    }

    return null;
};

export const getParameterMetadataByCode = (code) => {
    if (code === null || code === undefined) return null;
    return parameterMetadataCache.get(code) ?? null;
};

export const getParameterMetadataById = (id) => {
    if (id === null || id === undefined) return null;
    const numeric = Number(id);
    if (!Number.isNaN(numeric) && parameterMetadataById.has(numeric)) {
        return parameterMetadataById.get(numeric) ?? null;
    }
    return parameterMetadataById.get(String(id)) ?? null;
};

export const getAllParameterMetadata = () => ({
    lastRefreshedAt: parameterMetadataLastRefreshed,
    entries: Array.from(parameterMetadataCache.entries()).map(([id, meta]) => ({
        id,
        ...meta,
    })),
});

// export const resolveTbmMetadataByKey = (key) => {
//     if (!key) return null;
//     // reuse getTbmMetadata behaviour
//     return getTbmMetadata(key);
// };

export const resolveTbmIdByKey = (key) => {
    const meta = getTbmMetadata(key);
    // accommodate both tbmId and tbm_id naming
    return meta?.tbmId ?? meta?.tbm_id ?? null;
};

export const getAllTbmCanonicalKeys = () => {
    const keys = new Set();
    for (const meta of tbmMetadataCache.values()) {
        const key = meta.canonicalKey;
        if (key) keys.add(key);
    }
    return Array.from(keys);
};

export const getTbmKey = (value) => {
    if (!value) return null;

    // 严格返回真实存在于 metadata 的 tbm_key（与 tbms.tbm_key 一致的大小写）
    const direct = tbmMetadataCache.get(value);
    if (direct?.canonicalKey) return direct.canonicalKey;

    const normalized = normalizeTbmKey(value);
    if (!normalized) return null;
    for (const record of tbmMetadataCache.values()) {
        if (!record) continue;
        if (record.canonicalKey && normalizeTbmKey(record.canonicalKey) === normalized) return record.canonicalKey;
    }

    return null;
};
