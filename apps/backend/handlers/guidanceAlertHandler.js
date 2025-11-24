// import { getBus } from '../eventbus/eventBus.js';
// import { storeGuidanceThresholdEvent } from './guidance.js';

// // Subscribe to alerts.guidance events and log the payload for downstream debugging.
// export const initGuidanceAlertHandler = (opts = {}) => {
//     const bus = getBus();
//     const logger = opts.logger || console;

//     const infoLogger = typeof logger.info === 'function' ? logger.info.bind(logger) : logger.log?.bind(logger) || (() => { });
//     const errorLogger = typeof logger.error === 'function' ? logger.error.bind(logger) : infoLogger;

//     const handleGuidanceEvent = (event) => {
//         try {
//             const { tbmId, ringNo, severity, metrics = [],payload,meta } = event || {};
//             const metricKeys = metrics.map((m) => m.paramCode).filter(Boolean).join(',');
//             // infoLogger(`[handlers/guidance] Received event tbm=${tbmId} ring=${ringNo} severity=${severity} metrics=${metricKeys}`);
//             storeGuidanceThresholdEvent(tbmId, ringNo, severity, metrics, payload, meta).catch((err) => {
//                 errorLogger('[handlers/guidance] storeGuidanceThresholdEvent failed:', err);
//             });
//         } catch (err) {
//             errorLogger('[handlers/guidance] failed to process event', err);
//         }
//     };

//     bus.on('event:alerts.guidance', handleGuidanceEvent);
//     infoLogger('[handlers/guidance] listener registered for event:alerts.guidance');

//     return () => {
//         bus.off('event:alerts.guidance', handleGuidanceEvent);
//         infoLogger('[handlers/guidance] listener removed for event:alerts.guidance');
//     };
// };

// export default initGuidanceAlertHandler;
