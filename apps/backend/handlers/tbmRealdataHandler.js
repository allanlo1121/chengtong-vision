import { getBus } from '../eventbus/eventBus.js';
import { guidanceThresholdsMessage} from '../handlers/notify/hangdleMessage.js';
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

export const initTbmRealdataHandler = (opts = {}) => {
    const bus = getBus();
    const logger = opts.logger || console;
    const infoLogger = typeof logger.info === 'function' ? logger.info.bind(logger) : logger.log?.bind(logger) || (() => { });
    const errorLogger = typeof logger.error === 'function' ? logger.error.bind(logger) : infoLogger;

    const handleRealdataEvent = async (event) => {
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
           // console.log("event", event);

            infoLogger(
                `[handlers/tbmRealdata] event tbmKey=${canonicalKey} ring=${ringNo} severity=${severity} paramCode=${paramCode} value=${value} range=${range} windowMs=${windowMs} message=${message} reason=${payload.reason || ''}`
            );

            const tbmMeta = canonicalKey ? getTbmMetadata(canonicalKey) : null;
            const tbmId = tbmMeta?.tbmId ?? null;
            const paramMeta = paramCode ? getParameterMetadata(paramCode) : null;
            const paramId = paramMeta?.id ?? null;

            const normalizedRange = Array.isArray(range) ? range : resolveRange(range);
            //infoLogger(`[handlers/tbmStatus] found existing event: ${existingEvent.id}`);
                // 这里可以选择更新现有事件，或者根据业务需求进行其他处理
            

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
                        infoLogger(`[handlers/tbmRealdata] created threshold event ${id}`);
                        const content = guidanceThresholdsMessage(event);
                        console.log("tbmRealdata", content);
                        // sendWechatNotification(content);
                        // sendSmsNotification({ content });
                    }
                } catch (persistErr) {
                    errorLogger('[handlers/tbmRealdata] recordThresholdEvent failed:', persistErr);
                }
            }


        } catch (err) {
            errorLogger('[handlers/tbmRealdata] failed to process event', err);
        }
    };

    bus.on('event:alerts.realdata', handleRealdataEvent);
    infoLogger('[handlers/tbmRealdata] listener registered for event:alerts.tbmRealdata');

    return () => {
        bus.off('event:alerts.realdata', handleRealdataEvent);
        infoLogger('[handlers/tbmRealdata] listener removed for event:alerts.tbmRealdata');
    };
};

export default initTbmRealdataHandler;
