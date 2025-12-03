
// import { AlarmEvent, EventSeverity } from "@core/eventbus/types";

// const ALARM_NOTIFY_INTERVAL: Record<string, number> = {
//     GUIDANCE: 24 * 60 * 60 * 1000,        // 4 小时
//     PRESSURE: 24 * 60 * 60 * 1000,        // 1 小时
//     CONNECTIVITY: 1 * 60 * 1000,        // 10 分钟
//     OVERHEAT: 1 * 60 * 60 * 1000,        // 6 小时
//     DEFAULT: 24 * 60 * 60 * 1000         // 默认 24 小时
// };

// export function getNotifyInterval(alarmType: string): number {
//     return ALARM_NOTIFY_INTERVAL[alarmType] ?? ALARM_NOTIFY_INTERVAL.DEFAULT;
// }

// export type EventUpdateType = "new_event" | "resolved" | "upgraded" | "downgraded" | "value_changed" | "interval_refresh" | "no_change";

// export function evaluateEventUpdate(event: AlarmEvent, prevEvent: AlarmEvent): { updateType: EventUpdateType } {

//     const lastOccurred = new Date(prevEvent.timestamp);
//     const occurred = new Date(event.timestamp);

//     const newValue = event.value;
//     const oldValue = prevEvent.value;
//     const newSeverity = event.severity;
//     const oldSeverity = prevEvent.severity;

//     const diffMs = occurred.getTime() - lastOccurred.getTime();


//     // ① 事件恢复 normal（唯一恢复条件）
//     if (newSeverity === 1) {
//         return { updateType: "resolved" };
//     }

//     // ② 升级

//     if (newSeverity > oldSeverity || (Math.abs(newValue) - Math.abs(oldValue) >= 10)) {
//         return { updateType: "upgraded" };
//     }

//     // ③ 降级（但不恢复 normal）
//     if (newSeverity < oldSeverity || (Math.abs(newValue) - Math.abs(oldValue) < -10)) {
//         return { updateType: "downgraded" };
//     }

//     // ④ 数值变化显著
//     // if (Math.abs(newValue - oldValue) >= 10) {
//     //     return { updateType: "value_changed" };
//     // }

//     // ⑤ 超时需要重新提醒
//     if (diffMs > 24 * 60 * 60 * 1000) {
//         return { updateType: "interval_refresh" };
//     }

//     // ⑥ 无变化
//     return { updateType: "no_change" };
// }
