
// import { getTbmContext } from "@/cache/tbmContextCache";
// import { getRecipientsForAlarm } from "@domain/tbm/alarmNotificationService.js";

// //import type { AlarmType } from "@models/alarm.types.js";
// import { severityIcon } from "@utils/alarmSeverity.js";
// import type { AlarmEvent, EventSeverity, AlarmMessage } from "@models/alarm-event.types.js";
// //import { AlarmMessage } from "../types/alarm-message.types.js";
// import { renderWecomMarkdown, fmt } from "@notify/wecom/wecomMarkdown";

// // export async function formatHeartbeatOffline(tbmId: string, ev: AlarmEvent): Promise<string> {
// //   const tbmContext = getTbmContext(tbmId);
// //   console.log("tbmContext", tbmContext);
// //   console.log("event", ev);
// //   const recipients = await getRecipientsForAlarm(tbmId, "CONNECTIVITY");
// //   console.log("recipients", recipients);


// //   return `⚠️ 心跳离线超过 `;
// // }



// function resolveConnectivityTitle(tbmName: string, severity: EventSeverity): string {
//   if (severity === "normal") {
//     return `${tbmName} 通信恢复`;
//   }
//   return `${tbmName} 通信异常`;
// }


// export async function formatConnectivity(ev: AlarmEvent): Promise<AlarmMessage> {

//   const ctx = await getTbmContext(ev.tbmId);
//   const tbmName = ctx?.tbm_name ?? `TBM(${ev.tbmId})`;

//   const icon = severityIcon(ev.severity);

//   // 根据 severity 判断恢复/异常
//   const title = resolveConnectivityTitle(tbmName, ev.severity);

//   return {
//     title,
//     severity: ev.severity,
//     wecomText: renderWecomMarkdown({
//       title,
//       severity: ev.severity,
//       items: {
//         "项目": ctx?.project_name,
//         "隧道": ctx?.tunnel_name,
//         "时间": fmt(ev.timestamp),
//         "状态": ev.message,
//       },
//     }),
//     smsText: `${tbmName} ${ev.message}，断线时间：${ev.timestamp}`,
//     emailText: `${icon}**${tbmName} ${ev.message} 断线时间：${ev.timestamp}`,

//     raw: ev,
//   };
// }
