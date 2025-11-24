

// import { insertThresholdEvent, selectThresholdEvents, insertThresholdEventMetrics, updateThresholdEventById } from '../db/thresholdEvent.js';
// // import { sendWechatNotification } from '../utils/wechat/wechatNotifier.js';
// // import { sendSmsNotification } from '../utils/wechat/smsSender.js';

// const buildMetricRows = (metrics, eventId) => {
//     if (!Array.isArray(metrics) || !eventId) return [];
//     return metrics.map((metric) => ({
//         event_id: eventId,
//         param_code: metric.paramCode,
//         param_name: metric.paramName || null,
//         value: metric.value || null,
//         unit: metric.unit || null,
//         threshold: metric.threshold || null,
//         severity: metric.severity || "normal",
//     }));
// };

// //我要存储导向系统数据超限事件
// // I want to store guidance system data threshold events
// // import { recordThresholdEvent } from '../../alerts/alertsRepository.js';
// // import { findOpenEventsByTbmAndParam } from '../../alerts/alertsRepository.js';

// export const storeGuidanceThresholdEvent = async (tbmId, ringNo, severity, metricsForStorage, payload, meta) => {
//     //console.log("storeGuidanceThresholdEvent", tbmId, ringNo, severity, metricsForStorage);

//     if (!Array.isArray(metricsForStorage) || metricsForStorage.length === 0) return;



//     try {
//         const existingEvents = await selectThresholdEvents({
//             tbm_id: tbmId,
//             ring_no: ringNo,
//             alert_type_id: 1, // assuming 1 is the id for guidance alerts
//         });

//         if (existingEvents && existingEvents.length > 0) {
//             //console.log(`[GuidanceHandler] ${tbmId} ring ${ringNo} already has open events; suppressing duplicate notification.`);
//             if (severity === 'normal') {
//                 await updateThresholdEventById(existingEvents[0].id, { resolution_status: 'resolved', resolution: '自动解除' });
//                 await insertThresholdEventMetrics(buildMetricRows(metricsForStorage, existingEvents[0].id));
//                 console.log(`[GuidanceHandler] Recorded ${metricsForStorage.length} metrics for existing normal event ${existingEvents[0].id}`);
//                 return;
//             } else if (severity === 'critical') {
//                 await updateThresholdEventById(existingEvents[0].id, { severity, resolution_status: 'pending', resolution: null });
//                 await insertThresholdEventMetrics(buildMetricRows(metricsForStorage, existingEvents[0].id));
//                 console.log(`[GuidanceHandler] Recorded ${metricsForStorage.length} metrics for existing critical event ${existingEvents[0].id}`);
//                 return;
//             } else if (severity === 'warning') {
//                 await updateThresholdEventById(existingEvents[0].id, { resolution_status: 'pending', resolution: null });
//                 await insertThresholdEventMetrics(buildMetricRows(metricsForStorage, existingEvents[0].id));
//                 console.log(`[GuidanceHandler] Recorded ${metricsForStorage.length} metrics for existing warning event ${existingEvents[0].id}`);
//                 return;
//             } else {
//                 console.log("no severity", severity);

//                 return;
//             }
//         }

//         if (severity === 'normal') {
//             //console.log(`[GuidanceHandler] ${tbmId} ring ${ringNo} severity is normal; no event to create.`);
//             return;
//         }
//         //console.log("start insertThresholdEvent");
//         //console.log(tbmId, ringNo, severity);

//         await sendWechatNotification({
//             metricsForStorage,
//             tbmId,
//             ringNo,
//             severity,

//         })

//         await sendSmsNotification({
//             message: {
//                 metricsForStorage,
//                 tbmId,
//                 ringNo,
//                 severity,

//             }
//         })


//         const savedEvent = await insertThresholdEvent({
//             tbm_id: tbmId,
//             ring_no: ringNo,
//             severity,
//             message: `导向系统数据超限`, // Guidance system data threshold exceeded
//             payload: payload || null,
//             alert_type_id: 1, // assuming 1 is the id for guidance alerts
//         });

//         if (!savedEvent?.id) {
//             console.warn(`[GuidanceHandler] Inserted threshold event but missing id for ${tbmId} ring ${ringNo}.`);
//             return;
//         }

//         console.log(`[GuidanceHandler] Recorded new threshold event for ${savedEvent.id} ${tbmId} ring ${ringNo} severity ${severity}`);

//         if (metricsForStorage.length > 0) {
//             const rows = buildMetricRows(metricsForStorage, savedEvent.id);
//             await insertThresholdEventMetrics(rows);
//             console.log(`[GuidanceHandler] Recorded ${rows.length} metrics for event ${savedEvent.id}`);
//         }
//     } catch (err) {
//         console.error(`[GuidanceHandler] Failed to handle threshold event for ${tbmId} ring ${ringNo}:`, err);
//     }

//     // No existing open event, proceed to create a new one



//     // const paramCodes = Array.from(new Set(metricsForStorage.map((m) => m.paramCode).filter(Boolean)));
//     // const byParam = {};
//     // for (const param of paramCodes) {
//     //     const existingEvents = await findOpenEventsByTbmAndParam(tbmcode, param);
//     //     byParam[param] = existingEvents || [];
//     // }

//     // // Determine if any of the incoming metrics require creating a new event or escalating an existing one.
//     // const anyNeedsCreation = metricsForStorage.some((metric) => {
//     //     const existingAll = byParam[metric.paramCode] || [];
//     //     const existingSameRing = existingAll.filter((e) => String(e.ring_no) === String(ringNo));
//     //     const anyCriticalOpen = existingSameRing.some((e) => e.severity === "critical");
//     //     // create if no existing on same ring, or escalation to critical
//     //     if (!existingSameRing || existingSameRing.length === 0) return true;
//     //     if (anyCriticalOpen) return false;
//     //     if (metric.severity === "critical") return true;
//     //     return false;
//     // });

//     // if (!anyNeedsCreation) {
//     //     console.log(`[GuidanceHandler] ${tbmcode} ring ${ringDisplay} already has open warnings for these params; suppressing duplicate notification.`);
//     //     return;
//     // }

//     // // For each metric, decide if we need to create a new event (or escalate).
//     // for (const metric of metricsForStorage) {
//     //     const param = metric.paramCode;
//     //     const existingAll = byParam[param] || [];
//     //     const existingSameRing = existingAll.filter((e) => String(e.ring_no) === String(ringDisplay));

//     //     const anyCriticalOpen = existingSameRing.some((e) => e.severity === "critical");

//     //     const includeMetric = (() => {
//     //         // no open event for this param on the same ring -> include
//     //         if (!existingSameRing || existingSameRing.length === 0) return true;
//     //         // there is a critical open on same ring -> skip
//     //         if (anyCriticalOpen) return false;
//     //         // open events on same ring are warnings; only include if current is critical (escalation)
//     //         if (metric.severity === "critical") return true;
//     //         return false;
//     //     })();

//     //     if (includeMetric) {
//     //         try {
//     //             await recordThresholdEvent({
//     //                 tbmcode,
//     //                 ringNo: ringDisplay,
//     //                 severity: metric.severity === "critical" ? "critical" : "warning",
//     //                 message: `${readableName} ${metric.paramName || metric.paramCode} 超限: ${metric.value}`,
//     //                 payload,
//     //                 metrics: [metric],
//     //                 alertType: 'guidance',
//     //             });
//     //         } catch (err) {
//     //             console.error(`[GuidanceHandler] Failed to record threshold event for ${tbmcode} param ${param}:`, err);
//     //         }
//     //     }
//     // }
// };