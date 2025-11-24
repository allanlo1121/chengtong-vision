import { supabase } from "../db.js";

const TBM_REFRESH_DELAY = 500; // ms
const PARAM_REFRESH_DELAY = 500; // ms

const tbmMetadataCache = new Map();
const parameterMetadataCache = new Map();

let tbmRefreshTimeout = null;
let parameterRefreshTimeout = null;
let tbmChannel = null;
let parameterChannel = null;
let tbmMetadataLastRefreshed = 0;
let parameterMetadataLastRefreshed = 0;

const upsertTbmMetadata = (records = []) => {
    tbmMetadataCache.clear();
    records.forEach((item) => {
        if (!item?.tbm_code) return;
        tbmMetadataCache.set(item.tbm_code, {
            projectShortName: item.project_short_name,
            tunnelName: item.name,
            tbmName: item.tbm_name,
            status: item.status,
        });
    });
    tbmMetadataLastRefreshed = Date.now();
    console.log(`✅ TBM metadata refreshed. Cached ${tbmMetadataCache.size} entries.`);
};

const upsertParameterMetadata = (records = []) => {
    parameterMetadataCache.clear();
    records.forEach((item) => {
        if (!item?.code) return;
        parameterMetadataCache.set(item.code, {
            name: item.name,
            unit: item.unit,
        });
    });
    parameterMetadataLastRefreshed = Date.now();
    console.log(`✅ Parameter metadata refreshed. Cached ${parameterMetadataCache.size} entries.`);
    console.log(
        "🔍 Sample parameter metadata:",
        Array.from(parameterMetadataCache.entries())
            .slice(0, 10)
            .map(([code, meta]) => ({ code, ...meta }))
    );
};

export const refreshTbmMetadata = async () => {
    try {
        const { data, error } = await supabase
            .from("v_tunnels_overview")
            .select("project_short_name,name,tbm_name,tbm_code,status");

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
            .select("code,name,unit");

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
        .channel("tunnels-updates")
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
        .channel("tbm-parameters-updates")
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

export const getTbmMetadata = (tbmcode) => tbmMetadataCache.get(tbmcode) ?? null;

export const getAllTbmMetadata = () => ({
    lastRefreshedAt: tbmMetadataLastRefreshed,
    entries: Array.from(tbmMetadataCache.entries()).map(([code, meta]) => ({
        tbm_code: code,
        ...meta,
    })),
});

export const getTbmCodes = async () => {
    if (!tbmMetadataCache.size) {
        try {
            await refreshTbmMetadata();
        } catch (err) {
            console.error("❌ Unable to populate TBM metadata cache:", err);
            return [];
        }
    }

    const activeCodes = Array.from(tbmMetadataCache.entries())
        .filter(([, meta]) => meta?.status === "InProgress")
        .map(([code]) => code);

    if (!activeCodes.length) {
        console.warn("⚠️ No active TBM codes found in cache");
    }

    return activeCodes;
};

export const getParameterMetadata = (code) => parameterMetadataCache.get(code) ?? null;

export const getAllParameterMetadata = () => ({
    lastRefreshedAt: parameterMetadataLastRefreshed,
    entries: Array.from(parameterMetadataCache.entries()).map(([code, meta]) => ({
        code,
        ...meta,
    })),
});
