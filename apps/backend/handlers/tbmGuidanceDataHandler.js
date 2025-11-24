import { getBus } from '../eventbus/eventBus.js';
import { guidanceThresholdsMessage, guidanceDeltaThresholdsMessage } from '../handlers/notify/hangdleMessage.js';
import { sendWechatNotification } from '../utils/wechat/wechatNotifier.js';
//import { recordThresholdEvent, autoResolveEvents, findOpenEventsByTbmAndParam } from '../tmp/alerts/alertsRepository.js';
import { getTbmMetadata, getParameterMetadata } from '../datastore/metadataStore.js';
import { findOpenThresholdEvent, recordThresholdEvent } from '../services/thresholdEventsService.js';
import { sendSmsNotification } from '../utils/wechat/smsNotifier.js';

const resolveRange = (input) => {
    if (input === null || input === undefined) return null;

    if (Array.isArray(input)) {
        const normalized = input
            .map((value) => {
                if (value === null || value === undefined || value === '') return null;
                const numeric = Number(value);
                return Number.isFinite(numeric) ? numeric : null;
            })
            .filter((value) => value !== null);
        return normalized.length ? normalized.slice(0, 2) : null;
    }

    if (typeof input === 'object') {
        const candidates = {
            low: input.low ?? input.min ?? input.lower ?? null,
            high: input.high ?? input.max ?? input.upper ?? null,
        };

        const low = candidates.low !== null && candidates.low !== undefined ? Number(candidates.low) : null;
        const high = candidates.high !== null && candidates.high !== undefined ? Number(candidates.high) : null;

        const result = [];
        if (Number.isFinite(low)) result[0] = low;
        if (Number.isFinite(high)) result[1] = high;
        return result.length ? result : null;
    }

    const numeric = Number(input);
    if (Number.isFinite(numeric)) {
        return [-numeric, numeric];
    }

    return null;
};

export const initTbmGuidanceDataHandler = (opts = {}) => {
    const bus = getBus();
    const logger = opts.logger || console;
    const infoLogger = typeof logger.info === 'function' ? logger.info.bind(logger) : logger.log?.bind(logger) || (() => { });
    const errorLogger = typeof logger.error === 'function' ? logger.error.bind(logger) : infoLogger;

    const handleGuidanceDataEvent = async (event) => {
        try {
            const {
                canonicalKey,
                ringNo,
                paramCode,
                value,
                range,
                windowMs,
                severity,
                message,
                payload = {},

            } = event || {};
            //console.log("event", event);

            infoLogger(
                `[handlers/tbmGuidanceData] event tbmKey=${canonicalKey} ring=${ringNo} severity=${severity} paramCode=${paramCode} value=${value} range=${range} windowMs=${windowMs} message=${message} reason=${payload.reason || ''}`
            );

            const tbmMeta = canonicalKey ? getTbmMetadata(canonicalKey) : null;
            const tbmId = tbmMeta?.tbmId ?? null;
            const paramMeta = paramCode ? getParameterMetadata(paramCode) : null;
            const paramId = paramMeta?.id ?? null;

            const normalizedRange = Array.isArray(range) ? range : resolveRange(range);
            //infoLogger(`[handlers/tbmStatus] found existing event: ${existingEvent.id}`);
            // 这里可以选择更新现有事件，或者根据业务需求进行其他处理
            // const content = guidanceThresholdsMessage(event);
            // console.log("tbmGuidanceData", content);

            // const content = tbmConnectivityMessage(canonicalKey, ringNo, severity, message);
            // console.log("tbmStatus", content);
            // sendWechatNotification(content);
            if (tbmId && paramId && ringNo !== null && ringNo !== undefined) {
                try {
                    const result = await recordThresholdEvent({
                        tbmId,
                        ringNo,
                        paramId,
                        metricValue: value ?? null,
                        severity,
                        message,
                        payload,
                        normalRange: normalizedRange ?? undefined,
                        notifiedChannels: [],
                    });



                    const { id, created, updated } = result || {};
                    if (created || updated) {
                        infoLogger(`[handlers/tbmGuidanceData] created threshold event ${id}`);
                        const content = guidanceThresholdsMessage(event);
                        console.log("tbmGuidanceData", content);
                        sendWechatNotification(content);
                        sendSmsNotification({ content });
                    }
                } catch (persistErr) {
                    errorLogger('[handlers/tbmGuidanceData] recordThresholdEvent failed:', persistErr);
                }
            }


        } catch (err) {
            errorLogger('[handlers/tbmGuidanceData] failed to process event', err);
        }
    };

    const handleDeltaGuidanceDataEvent = async (event) => {
        try {
            const {
                canonicalKey,
                ringNo,
                paramCode,
                value,
                range,
                windowMs,
                severity,
                message,
                payload = {},

            } = event || {};
            //console.log("event", event);

            infoLogger(
                `[handlers/tbmGuidanceDeltaData] event tbmKey=${canonicalKey} ring=${ringNo} severity=${severity} paramCode=${paramCode} value=${value} range=${range} windowMs=${windowMs} message=${message} reason=${payload.reason || ''}`
            );

            const tbmMeta = canonicalKey ? getTbmMetadata(canonicalKey) : null;
            const tbmId = tbmMeta?.tbmId ?? null;
            const paramMeta = paramCode ? getParameterMetadata(paramCode) : null;
            const paramId = paramMeta?.id ?? null;

            const normalizedRange = Array.isArray(range) ? range : resolveRange(range);

            if (tbmId && paramId && ringNo !== null && ringNo !== undefined) {
                try {
                    const result = await recordThresholdEvent({
                        tbmId,
                        ringNo,
                        paramId,
                        metricValue: value ?? null,
                        severity,
                        message,
                        payload,
                        normalRange: normalizedRange ?? undefined,
                        notifiedChannels: [],
                    });



                    const { id, created, updated } = result || {};
                    if (created || updated) {
                        infoLogger(`[handlers/tbmDeltaGuidanceData] created threshold event ${id}`);
                        const content = guidanceDeltaThresholdsMessage(event);
                        //console.log("tbmDeltaGuidanceData", content);
                        sendWechatNotification(content);
                        sendSmsNotification({ content });
                    }
                } catch (persistErr) {
                    errorLogger('[handlers/tbmDeltaGuidanceData] recordThresholdEvent failed:', persistErr);
                }
            }


        } catch (err) {
            errorLogger('[handlers/tbmDeltaGuidanceData] failed to process event', err);
        }
    };
    bus.on('event:alerts.guidance', handleGuidanceDataEvent);
    infoLogger('[handlers/tbmGuidanceData] listener registered for event:alerts.tbmGuidanceData');
    bus.on('event:alerts.deltaGuidance', handleDeltaGuidanceDataEvent);
    infoLogger('[handlers/tbmGuidanceDeltaData] listener registered for event:alerts.deltaGuidanceData');

    return () => {
        bus.off('event:alerts.guidance', handleGuidanceDataEvent);
        infoLogger('[handlers/tbmGuidanceData] listener removed for event:alerts.tbmGuidanceData');
        bus.off('event:alerts.deltaGuidance', handleDeltaGuidanceDataEvent);
        infoLogger('[handlers/tbmGuidanceDeltaData] listener removed for event:alerts.deltaGuidanceData');
    };
};

export default initTbmGuidanceDataHandler;
