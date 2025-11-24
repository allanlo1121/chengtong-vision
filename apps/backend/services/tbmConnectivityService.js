import { getTbmKey, getAllTbmCanonicalKeys, resolveTbmIdByKey } from "../datastore/metadataStore.js";
import {
    upsertTbmConnectivitySnapshots,
    selectTbmConnectivitySnapshots,
} from "../db/tbmConnectivitySnapshots.js";
import {
    hydrateConnectivity,
    startMonitoring,
    registerHeartbeat,
    registerRealdata,
    seedConnectivityEntries,
} from "../processing/tbmConnectivityProcessor.js";

const DEBUG_TBM_CONNECTIVITY = process.env.DEBUG_TBM_CONNECTIVITY === '1' || process.env.DEBUG_TBM_CONNECTIVITY === 'true';
const dlog = (...args) => {
    if (DEBUG_TBM_CONNECTIVITY) console.log('[tbmConnectivityService]', ...args);
};

// Metrics for persistence decisions (debug/monitoring)
const persistMetrics = {
    totalAttempts: 0,
    lastBatch: { byId: 0, byKey: 0, skipped: 0 },
    totals: { byId: 0, byKey: 0, skipped: 0 },
};

export const getPersistMetrics = () => ({ ...persistMetrics });
export const resetPersistMetrics = () => {
    persistMetrics.totalAttempts = 0;
    persistMetrics.lastBatch = { byId: 0, byKey: 0, skipped: 0 };
    persistMetrics.totals = { byId: 0, byKey: 0, skipped: 0 };
};

const normalizeMetadataEntry = (entry) => {
    //console.log("entry", entry);

    if (!entry) return null;
    const canonicalKey = entry.canonicalKey || null;


    if (!canonicalKey) return null;

    return {
        canonical_key: canonicalKey,
        status: "unknown",
        heartbeat_status: "unknown",
        plc_status: "unknown",
        last_heartbeat_at: null,
        last_realdata_at: null,
        last_ring: null
    };
};

export const initializeConnectivitySnapshots = async (tbmMetadataEntries = []) => {
    //console.log("===initializeConnectivitySnapshots===", tbmMetadataEntries.length, tbmMetadataEntries[0]);

    // 首先从数据库读取已有快照
    const existingSnapshots = await selectTbmConnectivitySnapshots();
    //console.log("existingSnapshots", existingSnapshots[0]);

    const existingMap = new Map(
        (existingSnapshots || []).map((s) => [String(s.canonical_key).trim(), s])
    );
    //console.log("existingMap", existingMap[0]);

    // 将 metadata 列表标准化为候选行
    const requested = (tbmMetadataEntries || [])
        .map((entry) => normalizeMetadataEntry(entry))
        .filter(Boolean);
    //console.log("requested", requested[0]);

    // 如果没有传入 metadata，则直接返回数据库中的快照
    if (!requested.length) {
        dlog('init-snapshots.no-metadata', { count: existingSnapshots.length });
        return existingSnapshots;
    }

    // 对于每个 metadata 条目：如果数据库中已有快照则使用数据库的值（优先），否则使用 unknown 的标准化条目
    const toUpsert = requested.map((meta) => {
        const key = String(meta.canonical_key).trim();
        const existing = existingMap.get(key);

        let tbmId = resolveTbmIdByKey(key) || null;
        if (!tbmId && existing?.tbm_id) {
            tbmId = String(existing.tbm_id).trim();
        }

        //console.log("tbmId", tbmId);
        if (existing && tbmId) {
            //console.log("existing", existing, tbmId);

            dlog('init-snapshots.use-existing', { canonicalKey: key });
            // 保证返回的对象包含与 upsertTbmStatusSnapshots 兼容的字段
            return {
                tbmId: tbmId,
                canonicalKey: key,
                status: existing.status,
                heartbeatStatus: existing.heartbeat_status ?? existing.heartbeatStatus,
                plcStatus: existing.plc_status ?? existing.plcStatus,
                lastHeartbeatAt: existing.last_heartbeat_at ?? existing.lastHeartbeatAt,
                lastRealdataAt: existing.last_realdata_at ?? existing.lastRealdataAt,
                lastRing: existing.last_ring ?? existing.lastRing,
                updatedAt: existing.updated_at ?? existing.updatedAt,
            };
        }

        //给每个requested entry都加上tbmId
        if (tbmId) {
            meta.tbm_id = tbmId;
        }


        dlog('init-snapshots.new-unknown', { canonicalKey: key });
        // 使用 normalizeMetadataEntry 生成的 unknown 行（字段名是下划线风格），
        // upsertTbmConnectivitySnapshots 的 normalizeRow 会接受并规范化它们
        return meta;
    });

    // console.log("toUpsert", toUpsert[0]);

    if (!toUpsert.length) return [];
    dlog('init-snapshots.upsert', { count: toUpsert.length });
    return upsertTbmConnectivitySnapshots(toUpsert);
};

export const hydrateConnectivityCache = async () => {
    // console.log("===hydrateConnectivityCache===");

    const snapshots = await selectTbmConnectivitySnapshots();
    dlog('hydrate.start', { count: snapshots.length });
    hydrateConnectivity(
        snapshots.map((snapshot) => ({
            tbmId: snapshot.tbm_id || null,
            canonicalKey: snapshot.canonical_key || null,
            status: snapshot.status,
            heartbeatStatus: snapshot.heartbeat_status,
            plcStatus: snapshot.plc_status,
            lastHeartbeatAt: snapshot.last_heartbeat_at,
            lastRealdataAt: snapshot.last_realdata_at,
            lastRing: snapshot.last_ring,
        }))
    );
    dlog('hydrate.done');
    return snapshots;
};

export const startConnectivityMonitoring = (options = {}) => {
    //const USE_TBM_ID = process.env.USE_TBM_ID === '1' || process.env.USE_TBM_ID === 'true';
    const allKnownKeys = getAllTbmCanonicalKeys();
    if (allKnownKeys.length) {
        dlog('seed.keys', { count: allKnownKeys.length });
        seedConnectivityEntries(allKnownKeys);
    } else {
        dlog('seed.keys', { count: 0 });
    }

    const persistHandler = async (rows = []) => {
        //console.log("tbmConnectivityService-persistHandler-tbmId", rows);

        if (!Array.isArray(rows) || !rows.length) return [];



        const prepared = rows
            .map((row) => {
                // If USE_TBM_ID is enabled, prefer explicit tbmId when provided
                const canonicalKey = row.canonicalKey || null;
                //console.log("tbmConnectivityService-persistHandler-rows", tbmId);
                const tbmId = resolveTbmIdByKey(canonicalKey);

                if (canonicalKey && tbmId) {
                    dlog('persist.map.byId', { canonical: row.canonicalKey });
                    return {
                        tbm_id: tbmId,
                        status: row.status,
                        heartbeatStatus: row.heartbeatStatus,
                        plcStatus: row.plcStatus,
                        lastHeartbeatAt: row.lastHeartbeatAt,
                        lastRealdataAt: row.lastRealdataAt,
                        lastRing: row.lastRing,
                        updatedAt: row.updatedAt,
                    };
                }

                // No tbmId provided: skip persist. We require tbm_id for DB writes.
                console.warn(
                    `[tbmConnectivityService] Skipping TBM connectivity persist because tbmId is missing (tbm_key path removed).`,
                    { tbmId: row.tbmId, canonicalKey: row.canonicalKey }
                );
                return null;
            })
            .filter(Boolean);

        if (!prepared.length) return [];

        // compute batch counts (before persist) — now only byId path is supported
        const byId = prepared.filter((p) => p.tbm_id).length;
        const byKey = 0;
        const skipped = rows.length - byId;
        persistMetrics.lastBatch = { byId, byKey, skipped };
        persistMetrics.totalAttempts += prepared.length;

        dlog('persist.upsert', { count: prepared.length, byId, byKey, skipped });

        const result = await upsertTbmConnectivitySnapshots(prepared);

        // on success increment totals
        persistMetrics.totals.byId += byId;
        persistMetrics.totals.byKey += byKey;
        persistMetrics.totals.skipped += skipped;

        return result;
    };
    startMonitoring({ ...options, persistHandler });
};

export default {
    initializeConnectivitySnapshots,
    hydrateConnectivityCache,
    startConnectivityMonitoring,
};

export { registerHeartbeat, registerRealdata };
