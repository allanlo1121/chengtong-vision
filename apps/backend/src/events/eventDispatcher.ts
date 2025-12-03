// import { subscribeEvent } from "../core/eventbus/eventBus.js";
// import { logger } from "../core/logger.js";

// import { upsertActiveOperationalEvent } from "../domain/tbm/tbmActiveOperationalEventService.js";


// import { notifyAlarm } from "@/notify/notifyAlarm-back.js";

// const CONNECTIVITY_TOPICS = [
//   "HEARTBEAT_OFFLINE",
//   "HEARTBEAT_RECOVERED",
//   "PLC_OFFLINE",
//   "PLC_RECOVERED",
//   "RING_VALIDATION",
//   "ALARM"
// ];

// export function initEventDispatcher() {
//   CONNECTIVITY_TOPICS.forEach((topic) => {
//     subscribeEvent(topic, async (ev) => {
//       //logger.info(`📥 EVENT RECEIVED: ${topic} TBM=${ev.tbmId}  CODE=${ev.paramCode} VALUE=${ev.value} window_ms=${ev.window_ms ?? 0}`);

//       // 1. 写入历史表
//       // await saveOperationalEvent(ev);

//       // 2. 写入 active 表（或删除）
//       // const res = await upsertActiveOperationalEvent(ev);
//       // //console.log("upsertActiveOperationalEvent",res);

//       // if (!res.updated) {
//       //   logger.info(`ℹ No update to active events for TBM=${ev.tbmId} CODE=${ev.paramCode}`);
//       //   return;
//       // }

//       // // // 3. 统一发送通知
//       // await notifyAlarm(ev, res.updatedType);
//     });
//   });
// }



