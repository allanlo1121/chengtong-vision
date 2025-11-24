import { supabase } from "../utils/supabase/client.js";
import { normalizeTbmKey } from "../utils/tbmKey.js";

const TABLE_NAME = "tbm_connectivity_snapshots";

const DEBUG_TBM_CONNECTIVITY = process.env.DEBUG_TBM_CONNECTIVITY === '1' || process.env.DEBUG_TBM_CONNECTIVITY === 'true';
const dlog = (...args) => {
    if (DEBUG_TBM_CONNECTIVITY) console.log('[tbmConnectivityDB]', ...args);
};

const normalizeTimestamp = (value) => {
    if (value === null || value === undefined) return null;

    if (value instanceof Date) {
        const time = value.getTime();
        if (Number.isFinite(time)) return value.toISOString();
        return null;
    }

    if (typeof value === "string") {
        const parsed = Date.parse(value);
        if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
        return null;
    }

    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
        try {
            return new Date(numeric).toISOString();
        } catch (err) {
            return null;
        }
    }

    return null;
};

const normalizeRow = (row) => {
    if (!row) return null;
    const {
        tbm_id,
        tbmId,
        status = "unknown",
        heartbeat_status,
        heartbeatStatus,
        plc_status,
        plcStatus,
        last_heartbeat_at,
        lastHeartbeatAt,
        last_realdata_at,
        lastRealdataAt,
        last_ring,
        lastRing,
        last_heartbeat_payload,
        lastHeartbeatPayload,
        last_realdata_payload,
        lastRealdataPayload,
        updated_at,
        updatedAt,
    } = row;

    const resolvedId = tbm_id ?? tbmId ?? null;

    const normalizedId = resolvedId !== null && resolvedId !== undefined ? String(resolvedId).trim() : null;

    // Prefer tbm_id when available; otherwise require tbm_key
    if (!normalizedId) return null;

    const result = {
        status,
        heartbeat_status: heartbeat_status ?? heartbeatStatus ?? "unknown",
        plc_status: plc_status ?? plcStatus ?? "unknown",
        last_heartbeat_at: normalizeTimestamp(last_heartbeat_at ?? lastHeartbeatAt),
        last_realdata_at: normalizeTimestamp(last_realdata_at ?? lastRealdataAt),
        last_ring: last_ring ?? lastRing ?? null,
        last_heartbeat_payload: last_heartbeat_payload ?? lastHeartbeatPayload ?? null,
        last_realdata_payload: last_realdata_payload ?? lastRealdataPayload ?? null,
        updated_at: normalizeTimestamp(updated_at ?? updatedAt) || new Date().toISOString(),
    };

    if (normalizedId) result.tbm_id = normalizedId;


    return result;
};

export const upsertTbmConnectivitySnapshots = async (rows = []) => {
    // console.log("===upsertTbmConnectivitySnapshots===");
    // console.log("rows", rows[0]);

    if (!Array.isArray(rows) || !rows.length) return [];
    const payload = rows
        .map((row) => normalizeRow(row))
        .filter(Boolean);

    if (!payload.length) return [];
    // Split payloads: those with tbm_id (preferred) and those without (fallback to tbm_key)
    const withId = payload.filter((p) => p.tbm_id);


    let results = [];

    if (withId.length) {
        dlog('upsert.start.byId', { count: withId.length, ids: withId.map(p => p.tbm_id) });
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .upsert(withId, { onConflict: "tbm_id" })
            .select();
        dlog('upsert.done.byId', { error: error ? error.message : null, rows: data ? data.length : 0 });
        if (error) throw error;
        results = results.concat(data ?? []);
    }


    return results;
};

export const selectTbmConnectivitySnapshots = async (filters = {}) => {
    // console.log("===selectTbmConnectivitySnapshots===");
    // console.log("filters", filters);

    let query = supabase.from(TABLE_NAME).select("*");

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        query = query.eq(key, value);
    });

    const { data, error } = await query;
    if (error) throw error;
    const rows = data ?? [];

    //console.log("selectTbmConnectivitySnapshots",rows[0]);


    // Attach canonicalKey (derived from tbm_id preferred, otherwise tbm_key)
    return rows.map((r) => {
        const tbmId = r?.tbm_id ?? r?.tbmId ?? null;
        const canonical_key = normalizeTbmKey(tbmId) || null;
        //console.log("selectTbmConnectivitySnapshots canonical_key",canonical_key);

        return {
            ...r,
            canonical_key,
        };
    });
};

// export const deleteTbmConnectivitySnapshots = async (tbmKeys = []) => {
//     if (!Array.isArray(tbmKeys) || !tbmKeys.length) return { count: 0 };
//     // Accept either array of ids or keys; detect numeric-ish ids
//     const idLike = tbmKeys.every(k => k !== null && k !== undefined && String(k).trim() !== '' && !isNaN(Number(k)));
//     if (idLike) {
//         const { data, error } = await supabase
//             .from(TABLE_NAME)
//             .delete()
//             .in("tbm_id", tbmKeys)
//             .select("tbm_id");
//         if (error) throw error;
//         return { count: data?.length ?? 0 };
//     }

//     const { data, error } = await supabase
//         .from(TABLE_NAME)
//         .delete()
//         .in("tbm_key", tbmKeys)
//         .select("tbm_key");

//     if (error) throw error;
//     return { count: data?.length ?? 0 };
// };

export default {
    upsertTbmConnectivitySnapshots,
    selectTbmConnectivitySnapshots,
    //deleteTbmConnectivitySnapshots,
};
