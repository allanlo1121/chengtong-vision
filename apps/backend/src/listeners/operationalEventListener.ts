// // src/listeners/operationalEventListener.ts
// import { subscribeEvent } from "../core/eventbus/eventBus.js";
// import { saveOperationalEvent } from "../services/tbmOperationalEventService.js";
// import { upsertActiveOperationalEvent } from "../services/tbmActiveOperationalEventService.js";
// import { log } from "console";
// import { logger } from "../core/logger.js";

// export function initOperationalEventListener() {
//   // 监听所有运行类事件
//   const topics = [
//     "HEARTBEAT_OFFLINE",
//     "PLC_OFFLINE",
//     "GUIDANCE_WARNING",
//     "GUIDANCE_CRITICAL",
//     "THRUST_WARNING",
//     "THRUST_CRITICAL"
//   ];

//   topics.forEach((topic) => {
//     subscribeEvent(topic, async (ev) => {
//         logger.info(`📥 EVENT RECEIVED: ${topic} TBM=${ev.tbmId}`);
//       await saveOperationalEvent(ev);
//       await upsertActiveOperationalEvent(ev);
//     });
//   });
// }
