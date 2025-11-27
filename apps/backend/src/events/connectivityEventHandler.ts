// // src/events/connectivityEventHandler.ts
// import { subscribeEvent } from "../core/eventbus/eventBus.js";
// import { logger } from "../core/logger.js";
// import { supabaseAdmin } from "../lib/supabase.js";

// /**
//  * 初始化掉线事件监听器（心跳/PLC）
//  */
// export function initConnectivityEventHandler() {
//   // 监听心跳掉线
//   subscribeEvent("HEARTBEAT_OFFLINE", async (ev) => {
//     logger.warn(`🚨 EVENT: HEARTBEAT_OFFLINE TBM=${ev.tbmId}`);

//     // 写入数据库（可扩展）
//     await supabaseAdmin.from("tbm_events").insert({
//       tbm_id: ev.tbmId,
//       event_type: ev.topic,
//       severity: ev.severity,
//       message: ev.message,
//       timestamp: ev.timestamp,
//       payload: ev.payload,
//     });
//   });

//   // 监听 PLC 掉线
//   subscribeEvent("PLC_OFFLINE", async (ev) => {
//     logger.warn(`🚨 EVENT: PLC_OFFLINE TBM=${ev.tbmId}`);

//     await supabaseAdmin.from("tbm_events").insert({
//       tbm_id: ev.tbmId,
//       event_type: ev.topic,
//       severity: ev.severity,
//       message: ev.message,
//       timestamp: ev.timestamp,
//       payload: ev.payload,
//     });
//   });

//   logger.info("🔔 Connectivity Event Handlers registered");
// }
