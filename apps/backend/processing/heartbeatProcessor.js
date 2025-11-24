import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { getTbmKey as resolveTbmKey, resolveTbmIdByKey } from '../datastore/metadataStore.js';

const DEFAULT_HEARTBEAT_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes without heartbeats => MQTT offline
const DEFAULT_POLL_INTERVAL_MS = 30 * 1000; // 30 seconds
const DEFAULT_PERSIST_INTERVAL_MS = 60 * 1000; // 1 minute
const DEFAULT_RING = '-';
const STATUS_TOPIC = 'alerts.connectivity';

const heartbeatRegistry = new Map();
const dirtyKeys = new Set();
let monitorTimer = null;
let persistTimer = null;
let monitorStartedAt = 0;
let flushInProgress = false;

const defaultMonitorOptions = {
    heartbeatTimeoutMs: DEFAULT_HEARTBEAT_TIMEOUT_MS,
    realdataTimeoutMs: DEFAULT_REALDATA_TIMEOUT_MS,
    onOffline: () => { },
    onOnline: () => { },
    persistHandler: async () => { },
    statusTopic: STATUS_TOPIC,
};

let monitorOptions = { ...defaultMonitorOptions, timeoutMs: DEFAULT_HEARTBEAT_TIMEOUT_MS };


const toMillis = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) return 0;
    return parsed;
};


const computeOverallStatus = (entry) => {
    if (entry.heartbeatStatus === 'offline') return 'offline';
    if (entry.plcStatus === 'offline') return 'degraded';
    if (entry.heartbeatStatus === 'unknown' || entry.plcStatus === 'unknown') return 'unknown';
    return 'online';
};

// Ensure an entry exists for the given canonicalKey; create if missing.
//注释: 确保为给定的 canonicalKey 存在一个条目；如果缺失则创建。
const ensureEntry = (canonicalKey, seed = {}) => {
    const existing = heartbeatRegistry.get(canonicalKey);
    if (existing) return existing;
    const entry = {
        canonicalKey: canonicalKey,
        tbmId: seed.tbmId || null,
        status: seed.status || 'unknown',
        heartbeatStatus: seed.heartbeatStatus || 'unknown',
        plcStatus: seed.plcStatus || 'unknown',
        lastHeartbeatAt: seed.lastHeartbeatAt || 0,
        lastRealdataAt: seed.lastRealdataAt || 0,
        lastRing: seed.lastRing || DEFAULT_RING,
        lastHeartbeatPayload: seed.lastHeartbeatPayload || null,
        lastRealdataPayload: seed.lastRealdataPayload || null,
    };
    heartbeatRegistry.set(canonicalKey, entry);
    return entry;
};

const markDirty = (canonicalKey, entry) => {
    heartbeatRegistry.set(canonicalKey, entry);
    dirtyKeys.add(canonicalKey);
    dlog('marked-dirty', { canonicalKey, status: entry.status, heartbeatStatus: entry.heartbeatStatus, plcStatus: entry.plcStatus });
};

const emitStatusEvent = ({
    canonicalKey,
    ringNo = DEFAULT_RING,
    severity = 'info',
    message = '',
    payload = {},
    meta = {},
} = {}) => {
    if (!canonicalKey) return;
    // Ensure event uses canonicalKey as tbmKey for compatibility; include tbmId in meta when available
    const event = createEvent(monitorOptions.statusTopic, {
        canonicalKey,
        tbmId: meta?.tbmId ?? null,
        ringNo,
        severity,
        message,
        payload,
        meta: { ...meta, tbmKey, tbmId: meta?.tbmId ?? null },
    });
    publishEvent(monitorOptions.statusTopic, event);
};

export const registerHeartbeat = (canonicalKey, options = {}) => {

    const { observedAt = Date.now(), payload = null,tbmId } = options;
    //const { canonical: canonicalKey, tbmId } = resolveKeyPair(tbmKey);

    if (!canonicalKey) return null;

    const entry = ensureEntry(canonicalKey, { tbmId });
    const previousStatus = entry.heartbeatStatus;

    entry.heartbeatStatus = 'online';
    entry.lastHeartbeatAt = toMillis(observedAt) || Date.now();
    entry.lastHeartbeatPayload = payload;
    entry.tbmId = tbmId || entry.tbmId || null;
    entry.status = computeOverallStatus(entry);

    markDirty(canonicalKey, entry);
    dlog('heartbeat', { canonicalKey, tbmId: entry.tbmId, observedAt });

    if (previousStatus !== 'online') {
        if (typeof monitorOptions.onOnline === 'function') {
            try {
                monitorOptions.onOnline({ canonicalKey: canonicalKey, reason: 'heartbeat' });
            } catch (err) {
                console.error('[tbmStatusProcessor] onOnline handler failed', err);
            }
        } 

        emitStatusEvent({
            canonicalKey: canonicalKey,
            ringNo: entry.lastRing,
            severity: 'info',
            message: 'MQTT 心跳恢复',
            payload: {
                reason: 'heartbeat_recovered',
                lastHeartbeatAt: new Date(entry.lastHeartbeatAt).toISOString(),
            },
            meta: { type: 'heartbeat', status: 'online', tbmId: entry.tbmId },
        });
    }

    return { ...entry };
};



export const getTbmStatus = (tbmId) => {
    const { canonical: canonicalKey, tbmId: resolvedTbmId } = resolveKeyPair(tbmId);
    if (!canonicalKey) {
        return {
            status: 'unknown',
            heartbeatStatus: 'unknown',
            plcStatus: 'unknown',
            lastHeartbeatAt: null,
            lastRealdataAt: null,
        };
    }
    const entry = heartbeatRegistry.get(canonicalKey);
    if (!entry) {
        return {
            tbmId: resolvedTbmId || null,
            status: 'unknown',
            heartbeatStatus: 'unknown',
            plcStatus: 'unknown',
            lastHeartbeatAt: null,
            lastRealdataAt: null,
        };
    }
    return { tbmId: resolvedTbmId || entry.tbmId || null, canonicalKey, ...entry };
};

export const listStatuses = () => {
    return Array.from(heartbeatRegistry.entries()).map(([canonicalKey, entry]) => ({
        canonicalKey,
        ...entry,
    }));
};

const flushDirtyEntries = async () => {
    //console.log("===flushDirtyEntries===");
    
    if (flushInProgress) {
        console.log('[tbmStatus] flush.skipped', 'previous flush still running');
        return;
    }

    const keysToPersist = Array.from(dirtyKeys);

    //console.log("keysToPersist", keysToPersist);
    

    if (!keysToPersist.length) return;

    flushInProgress = true;

    dlog('flush-start', { dirtyCount: dirtyKeys.size });
    const payload = keysToPersist
        .map((canonicalKey) => {
            const entry = heartbeatRegistry.get(canonicalKey);
            //console.log("flushDirtyEntries", entry);

            if (!entry) return null;

            return {
                tbmId: entry.tbmId || null,
                canonicalKey,
                status: entry.status,
                heartbeatStatus: entry.heartbeatStatus,
                plcStatus: entry.plcStatus,
                lastHeartbeatAt: entry.lastHeartbeatAt,
                lastRealdataAt: entry.lastRealdataAt,
                lastRing: entry.lastRing,
                lastHeartbeatPayload: entry.lastHeartbeatPayload,
                lastRealdataPayload: entry.lastRealdataPayload,
            };
        })
        .filter(Boolean);



    if (!payload.length) {
        keysToPersist.forEach((key) => dirtyKeys.delete(key));
        flushInProgress = false;
        return;
    }

    try {
        await monitorOptions.persistHandler(payload);
        dlog('flush-done', { persisted: payload.length });
        // console.log('[tbmStatus] flush.done', { persisted: payload.length, after: new Date().toISOString() });
        keysToPersist.forEach((key) => dirtyKeys.delete(key));

    } catch (err) {
        console.error('[tbmStatusProcessor] persistHandler failed', err);
    } finally {
        flushInProgress = false;
    }
};

//把一组“快照”记录（通常来自数据库或持久化快照）加载到内存的状态注册表（heartbeatRegistry）中，建立/更新每个 TBM 的运行状态条目，供后续监控、计算与持久化使用。
export const hydrateStatuses = (records = []) => {
    records.forEach((record) => {
        if (!record) return;
        const identifier = record.canonicalKey || record.tbmId || record.tbmKey;
        const { canonical: canonicalKey, tbmId } = resolveKeyPair(identifier);
        if (!canonicalKey) return;
        const entry = ensureEntry(canonicalKey, {
            tbmId: record.tbmId || tbmId || null,
        });

        entry.heartbeatStatus = record.heartbeatStatus || record.status || entry.heartbeatStatus;
        entry.plcStatus = record.plcStatus || entry.plcStatus;
        entry.status = record.status || computeOverallStatus(entry);
        entry.lastHeartbeatAt = toMillis(record.lastHeartbeatAt ?? record.lastHeartbeat ?? record.lastSeen ?? entry.lastHeartbeatAt);
        entry.lastRealdataAt = toMillis(record.lastRealdataAt ?? entry.lastRealdataAt);
        entry.lastRing = record.lastRing ?? entry.lastRing;
        entry.lastHeartbeatPayload = record.lastHeartbeatPayload ?? entry.lastHeartbeatPayload;
        entry.lastRealdataPayload = record.lastRealdataPayload ?? entry.lastRealdataPayload;

        heartbeatRegistry.set(canonicalKey, entry);
    });
};

export const seedStatusEntries = (keys = []) => {
    if (!Array.isArray(keys) || !keys.length) return;
    keys.forEach((key) => {
        const { canonical: canonicalKey, dbKey } = resolveKeyPair(key);
        if (!canonicalKey || !dbKey) return;
        ensureEntry(canonicalKey, { tbmKey: dbKey });
    });
};

export const startMonitoring = (options = {}) => {
    const restarting = Boolean(monitorTimer);

    if (monitorTimer) {
        clearInterval(monitorTimer);
        monitorTimer = null;
    }
    if (persistTimer) {
        clearInterval(persistTimer);
        persistTimer = null;
    }

    monitorStartedAt = Date.now();
    monitorOptions = {
        ...defaultMonitorOptions,
        heartbeatTimeoutMs: options.heartbeatTimeoutMs ?? options.timeoutMs ?? DEFAULT_HEARTBEAT_TIMEOUT_MS,
        realdataTimeoutMs: options.realdataTimeoutMs ?? DEFAULT_REALDATA_TIMEOUT_MS,
        onOffline: options.onOffline || defaultMonitorOptions.onOffline,
        onOnline: options.onOnline || defaultMonitorOptions.onOnline,
        persistHandler: options.persistHandler || defaultMonitorOptions.persistHandler,
        statusTopic: options.statusTopic || STATUS_TOPIC,
    };
    monitorOptions.timeoutMs = monitorOptions.heartbeatTimeoutMs;

    dlog(restarting ? 'monitor-restarted' : 'monitor-started', {
        heartbeatTimeoutMs: monitorOptions.heartbeatTimeoutMs,
        realdataTimeoutMs: monitorOptions.realdataTimeoutMs,
        pollInterval: options.intervalMs ?? DEFAULT_POLL_INTERVAL_MS,
        persistInterval: options.persistIntervalMs ?? DEFAULT_PERSIST_INTERVAL_MS,
    });

    const pollInterval = options.intervalMs ?? DEFAULT_POLL_INTERVAL_MS;
    const persistInterval = options.persistIntervalMs ?? DEFAULT_PERSIST_INTERVAL_MS;

    monitorTimer = setInterval(() => {
        const now = Date.now();
        heartbeatRegistry.forEach((entry, tbmKey) => {


            const heartbeatSeenAt = toMillis(entry.lastHeartbeatAt);
            const hasHeartbeat = heartbeatSeenAt > 0;
            const heartbeatExpired = hasHeartbeat
                ? now - heartbeatSeenAt > monitorOptions.heartbeatTimeoutMs
                : now - monitorStartedAt > monitorOptions.heartbeatTimeoutMs;


            if (heartbeatExpired && entry.heartbeatStatus !== 'offline') {
                const lastHeartbeatAt = hasHeartbeat ? heartbeatSeenAt : 0;
                entry.lastHeartbeatAt = lastHeartbeatAt;
                entry.heartbeatStatus = 'offline';
                entry.status = computeOverallStatus(entry);
                markDirty(tbmKey, entry);


                if (typeof monitorOptions.onOffline === 'function') {
                    try {
                        monitorOptions.onOffline({ tbmKey, reason: 'heartbeat', lastHeartbeatAt });
                    } catch (err) {
                        console.error('[tbmStatusProcessor] onOffline handler failed', err);
                    }
                }


                emitStatusEvent({
                    tbmKey: entry.tbmKey || tbmKey,
                    ringNo: entry.lastRing,
                    severity: 'critical',
                    message: 'MQTT 客户端掉线',
                    payload: {
                        reason: 'heartbeat_timeout',
                        lastHeartbeatAt: lastHeartbeatAt ? new Date(lastHeartbeatAt).toISOString() : null,
                        timeoutMs: monitorOptions.heartbeatTimeoutMs,
                    },
                    meta: { type: 'heartbeat', status: 'offline' },
                });
            }

            const realdataSeenAt = toMillis(entry.lastRealdataAt);
            const hasRealdata = realdataSeenAt > 0;
            const realdataExpired = hasRealdata
                ? now - realdataSeenAt > monitorOptions.realdataTimeoutMs
                : now - monitorStartedAt > monitorOptions.realdataTimeoutMs;

            if (realdataExpired && entry.plcStatus !== 'offline') {
                const lastRealdataAt = hasRealdata ? realdataSeenAt : 0;
                entry.lastRealdataAt = lastRealdataAt;
                entry.plcStatus = 'offline';
                entry.status = computeOverallStatus(entry);
                markDirty(tbmKey, entry);
                if (typeof monitorOptions.onOffline === 'function') {
                    try {
                        monitorOptions.onOffline({ tbmKey, reason: 'plc', lastRealdataAt });
                    } catch (err) {
                        console.error('[tbmStatusProcessor] onOffline handler failed', err);
                    }
                }
                emitStatusEvent({
                    tbmKey: entry.tbmKey || tbmKey,
                    ringNo: entry.lastRing,
                    severity: 'critical',
                    message: '盾构 PLC 掉线',
                    payload: {
                        reason: 'plc_realdata_timeout',
                        lastRealdataAt: lastRealdataAt ? new Date(lastRealdataAt).toISOString() : null,
                        timeoutMs: monitorOptions.realdataTimeoutMs,
                    },
                    meta: { type: 'plc', status: 'offline' },
                });
            }
        });
    }, pollInterval);

    persistTimer = setInterval(() => {

        flushDirtyEntries().catch((err) => {
            console.error('[tbmStatusProcessor] flush dirty failed', err);
        });
    }, persistInterval);

    return monitorTimer;
};

export const stopMonitoring = () => {
    if (monitorTimer) {
        clearInterval(monitorTimer);
        monitorTimer = null;
    }
    if (persistTimer) {
        clearInterval(persistTimer);
        persistTimer = null;
    }
    dirtyKeys.clear();
};

export const processStatusPayload = (tbmId, payload = {}, options = {}) => {
    return registerRealdata(tbmId, payload, options);
};

export default {
    registerHeartbeat,    
    getTbmStatus,
    listStatuses,
    startMonitoring,
    stopMonitoring,
    hydrateStatuses,
    processStatusPayload,
};
