import { createEvent, publishEvent } from '../eventbus/eventBus.js';
import { getTbmMetadata, resolveTbmIdByKey } from '../datastore/metadataStore.js';
import { extractRingNo } from '../utils/parameters/handle.js';

const DEFAULT_HEARTBEAT_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes without heartbeats => MQTT offline
const DEFAULT_REALDATA_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes without realdata => PLC offline
const DEFAULT_POLL_INTERVAL_MS = 30 * 1000; // 30 seconds
const DEFAULT_PERSIST_INTERVAL_MS = 60 * 1000; // 1 minute
const DEFAULT_RING = -999;
const EVENT_TOPIC = 'alerts.tbmConnectivity';

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
    statusTopic: EVENT_TOPIC,
};

let monitorOptions = { ...defaultMonitorOptions, timeoutMs: DEFAULT_HEARTBEAT_TIMEOUT_MS };

// Debug logging helper
const DEBUG_TBM_STATUS = process.env.DEBUG_TBM_STATUS === '1' || process.env.DEBUG_TBM_STATUS === 'true';
const dlog = (...args) => {
    if (DEBUG_TBM_STATUS) console.log('[tbmConnectivity]', ...args);
};



const toMillis = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) return 0;
    return parsed;
};

const toRingNumber = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const trimmed = typeof value === 'string' ? value.trim() : String(value);
    if (!trimmed) return null;
    const numeric = Number(trimmed);
    return Number.isFinite(numeric) ? numeric : null;
};


const computeOverallStatus = (entry) => {
    if (entry.heartbeatStatus === 'offline') return 'offline';
    if (entry.plcStatus === 'offline') return 'degraded';
    if (entry.heartbeatStatus === 'unknown' || entry.plcStatus === 'unknown') return 'unknown';
    return 'online';
};

const ensureEntry = (canonicalKey, seed = {}) => {
    const existing = heartbeatRegistry.get(canonicalKey);
    if (existing) return existing;
    const entry = {
        canonicalKey: canonicalKey,
        status: seed.status || 'unknown',
        heartbeatStatus: seed.heartbeatStatus || 'unknown',
        plcStatus: seed.plcStatus || 'unknown',
        lastHeartbeatAt: seed.lastHeartbeatAt || 0,
        lastRealdataAt: seed.lastRealdataAt || 0,
        lastRing: seed.lastRing || DEFAULT_RING,
    };
    heartbeatRegistry.set(canonicalKey, entry);
    return entry;
};

const markDirty = (canonicalKey, entry) => {
    heartbeatRegistry.set(canonicalKey, entry);
    dirtyKeys.add(canonicalKey);
    dlog('marked-dirty', { canonicalKey, status: entry.status, heartbeatStatus: entry.heartbeatStatus, plcStatus: entry.plcStatus });
};

const emitConnectivityEvent = ({
    canonicalKey,
    ringNo = DEFAULT_RING,
    paramCode = null,
    value = null,
    range = [],
    severity = 'normal',
    message = '',
    payload = {}
} = {}) => {
    if (!canonicalKey) return;
    // Ensure event uses canonicalKey as tbmKey for compatibility; include tbmId in meta when available
    const event = createEvent(monitorOptions.statusTopic, {
        canonicalKey,
        ringNo,
        paramCode,
        value,
        range,
        severity,
        message,
        payload
    });
    publishEvent(monitorOptions.statusTopic, event);
};

export const registerHeartbeat = (canonicalKey, options = {}) => {

    if (!canonicalKey) return null;
    const observedAt = options.observedAt || Date.now();

    const entry = ensureEntry(canonicalKey, {});
    const previousStatus = entry.heartbeatStatus;

    entry.heartbeatStatus = 'online';
    entry.lastHeartbeatAt = toMillis(observedAt) || Date.now();


    entry.status = computeOverallStatus(entry);

    markDirty(canonicalKey, entry);
    dlog('heartbeat', { canonicalKey, observedAt });

    if (previousStatus !== 'online') {
        if (typeof monitorOptions.onOnline === 'function') {
            try {
                monitorOptions.onOnline({ canonicalKey: canonicalKey, reason: 'heartbeat' });
            } catch (err) {
                console.error('[tbmConnectivityProcessor] onOnline handler failed', err);
            }
        }

        emitConnectivityEvent({
            canonicalKey: canonicalKey,
            ringNo: entry.lastRing,
            paramCode: "n010000001",
            value: 1,
            range: [1, 1],
            severity: 'normal',
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

export const registerRealdata = (canonicalKey, payload = {}, options = {}) => {

    if (!canonicalKey) return null;

    const ringNo = extractRingNo(payload);
    const observedAt = payload.recorded_at || Date.now();

    const entry = ensureEntry(canonicalKey, {});
    const previousStatus = entry.plcStatus;
    const previousRingNumber = toRingNumber(entry.lastRing);
    const currentRingNumber = toRingNumber(ringNo);
    // console.log("previousRingNumber", previousRingNumber);
    // console.log("currentRingNumber", currentRingNumber);

    entry.plcStatus = 'online';
    entry.lastRealdataAt = toMillis(observedAt) || Date.now();
    entry.lastRealdataPayload = payload;
    entry.lastRing = ringNo || entry.lastRing || DEFAULT_RING;
    if (currentRingNumber !== null) {
        entry.lastRing = currentRingNumber;
    }

    entry.status = computeOverallStatus(entry);

    markDirty(canonicalKey, entry);
    dlog('realdata', { canonicalKey, observedAt, ringNo: entry.lastRing });

    if (currentRingNumber !== null && previousRingNumber !== null && previousRingNumber !== -999) {
        if (currentRingNumber < previousRingNumber) {
            console.warn("[tbmConnectivity] ring number decreased", { canonicalKey, previousRingNumber, currentRingNumber });
            emitConnectivityEvent({
                canonicalKey: entry.canonicalKey || canonicalKey,
                ringNo: currentRingNumber,
                paramCode: "s100100008",
                value: currentRingNumber,
                range: [previousRingNumber, previousRingNumber + 1],
                severity: 'warning',
                message: '盾构环号回退',
                payload: { s100100008: currentRingNumber, previousRingNumber: previousRingNumber, reason: 'ring_revert' },
                timestamp: new Date().toISOString(),
            });
        } else if (currentRingNumber - previousRingNumber > 3) {
            emitConnectivityEvent({
                canonicalKey: entry.canonicalKey || canonicalKey,
                ringNo: currentRingNumber,
                paramCode: "s100100008",
                value: currentRingNumber,
                range: [previousRingNumber, previousRingNumber + 2],
                severity: 'warning',
                message: '盾构环号跳跃过大',
                payload: { s100100008: currentRingNumber, reason: 'ring_jump' },
                timestamp: new Date().toISOString(),
            });
        }
    }

    if (previousStatus === 'offline') {
        emitConnectivityEvent({
            tbmKey: canonicalKey,
            ringNo: currentRingNumber,
            paramCode: "n010000002",
            value: 1,
            range: [1, 1],
            severity: 'normal',
            message: '盾构 PLC 数据恢复',
            payload: {
                reason: 'plc_recovered',
                lastRealdataAt: new Date(entry.lastRealdataAt).toISOString(),
            }
        });
    }

    return { ...entry };
};

// export const getTbmConnectivity = (tbmId) => {
//     const { canonical: canonicalKey, tbmId: resolvedTbmId } = resolveKeyPair(tbmId);
//     if (!canonicalKey) {
//         return {
//             status: 'unknown',
//             heartbeatStatus: 'unknown',
//             plcStatus: 'unknown',
//             lastHeartbeatAt: null,
//             lastRealdataAt: null,
//         };
//     }
//     const entry = heartbeatRegistry.get(canonicalKey);
//     if (!entry) {
//         return {
//             tbmId: resolvedTbmId || null,
//             status: 'unknown',
//             heartbeatStatus: 'unknown',
//             plcStatus: 'unknown',
//             lastHeartbeatAt: null,
//             lastRealdataAt: null,
//         };
//     }
//     return { tbmId: resolvedTbmId || entry.tbmId || null, canonicalKey, ...entry };
// };

export const listConnectivity = () => {
    return Array.from(heartbeatRegistry.entries()).map(([canonicalKey, entry]) => ({
        canonicalKey,
        ...entry,
    }));
};

const flushDirtyEntries = async () => {
    //console.log("===flushDirtyEntries===");

    if (flushInProgress) {
        console.log('[tbmConnectivity] flush.skipped', 'previous flush still running');
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
                canonicalKey,
                status: entry.status,
                heartbeatStatus: entry.heartbeatStatus,
                plcStatus: entry.plcStatus,
                lastHeartbeatAt: entry.lastHeartbeatAt,
                lastRealdataAt: entry.lastRealdataAt,
                lastRing: entry.lastRing,
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
        // console.log('[tbmConnectivity] flush.done', { persisted: payload.length, after: new Date().toISOString() });
        keysToPersist.forEach((key) => dirtyKeys.delete(key));

    } catch (err) {
        console.error('[tbmConnectivityProcessor] persistHandler failed', err);
    } finally {
        flushInProgress = false;
    }
};

export const hydrateConnectivity = (records = []) => {
    records.forEach((record) => {
        if (!record) return;
        const canonicalKey = record.canonicalKey || null;

        if (!canonicalKey) return;
        const entry = ensureEntry(canonicalKey, {
        });

        entry.heartbeatStatus = record.heartbeatStatus || record.status || entry.heartbeatStatus;
        entry.plcStatus = record.plcStatus || entry.plcStatus;
        entry.status = record.status || computeOverallStatus(entry);
        entry.lastHeartbeatAt = toMillis(record.lastHeartbeatAt ?? record.lastHeartbeat ?? record.lastSeen ?? entry.lastHeartbeatAt);
        entry.lastRealdataAt = toMillis(record.lastRealdataAt ?? entry.lastRealdataAt);
        entry.lastRing = record.lastRing ?? entry.lastRing;

        heartbeatRegistry.set(canonicalKey, entry);
    });
};

export const seedConnectivityEntries = (keys = []) => {
    if (!Array.isArray(keys) || !keys.length) return;
    keys.forEach((key) => {
        const canonicalKey = key;
        if (!key) return;
        ensureEntry(canonicalKey, {});
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
        statusTopic: options.statusTopic || EVENT_TOPIC,
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
        heartbeatRegistry.forEach((entry, canonicalKey) => {


            const heartbeatSeenAt = toMillis(entry.lastHeartbeatAt);
            const hasHeartbeat = heartbeatSeenAt > 0;
            const heartbeatExpired = hasHeartbeat
                ? now - heartbeatSeenAt > monitorOptions.heartbeatTimeoutMs
                : now - monitorStartedAt > monitorOptions.heartbeatTimeoutMs;


            if (heartbeatExpired && entry.heartbeatStatus !== 'offline') {
                const lastHeartbeatAt = hasHeartbeat ? heartbeatSeenAt : 0;
                const heartbeatSilentMs = hasHeartbeat ? now - heartbeatSeenAt : now - monitorStartedAt;
                entry.lastHeartbeatAt = lastHeartbeatAt;
                entry.heartbeatStatus = 'offline';
                entry.status = computeOverallStatus(entry);
                markDirty(canonicalKey, entry);


                if (typeof monitorOptions.onOffline === 'function') {
                    try {
                        monitorOptions.onOffline({ canonicalKey, reason: 'heartbeat', lastHeartbeatAt, silentForMs: heartbeatSilentMs });
                    } catch (err) {
                        console.error('[tbmConnectivityProcessor] onOffline handler failed', err);
                    }
                }


                emitConnectivityEvent({
                    canonicalKey: entry.canonicalKey || canonicalKey,
                    ringNo: entry.lastRing,
                    paramCode: "n010000001",
                    value: 0,
                    range: [1, 1],
                    severity: 'critical',
                    message: 'MQTT 客户端掉线',
                    payload: { n010000001: 0, reason: 'heartbeat_timeout', silentForMs: heartbeatSilentMs },
                    timestamp: new Date().toISOString(),
                });
            }

            const realdataSeenAt = toMillis(entry.lastRealdataAt);
            const hasRealdata = realdataSeenAt > 0;
            const realdataExpired = hasRealdata
                ? now - realdataSeenAt > monitorOptions.realdataTimeoutMs
                : now - monitorStartedAt > monitorOptions.realdataTimeoutMs;

            if (realdataExpired && entry.plcStatus !== 'offline') {
                const lastRealdataAt = hasRealdata ? realdataSeenAt : 0;
                const realdataSilentMs = hasRealdata ? now - realdataSeenAt : now - monitorStartedAt;
                entry.lastRealdataAt = lastRealdataAt;
                entry.plcStatus = 'offline';
                entry.status = computeOverallStatus(entry);
                markDirty(canonicalKey, entry);
                if (typeof monitorOptions.onOffline === 'function') {
                    try {
                        monitorOptions.onOffline({ canonicalKey, reason: 'plc', lastRealdataAt, silentForMs: realdataSilentMs });
                    } catch (err) {
                        console.error('[tbmConnectivityProcessor] onOffline handler failed', err);
                    }
                }
                emitConnectivityEvent({
                    canonicalKey: entry.canonicalKey || canonicalKey,
                    ringNo: entry.lastRing,
                    paramCode: "n010000002",
                    value: 0,
                    range: [1, 1],
                    severity: 'critical',
                    message: '盾构 PLC 掉线',
                    payload: { "n010000002": 0, reason: 'plc_timeout', silentForMs: realdataSilentMs },
                    timestamp: new Date().toISOString(),
                });
            }
        });
    }, pollInterval);

    persistTimer = setInterval(() => {

        flushDirtyEntries().catch((err) => {
            console.error('[tbmConnectivityProcessor] flush dirty failed', err);
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

export const processConnectivityPayload = (canonicalKey, payload = {}, options = {}) => {
    return registerRealdata(canonicalKey, payload, options);
};

export default {
    registerHeartbeat,
    registerRealdata,
    //getTbmConnectivity,
    listConnectivity,
    startMonitoring,
    stopMonitoring,
    hydrateConnectivity,
    processConnectivityPayload,
};
