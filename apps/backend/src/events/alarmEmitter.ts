// import { dispatchAlarm } from "./alarmDispatcher.js";

// import type { AlarmEvent, AlarmType, EventSeverity } from "@models/alarm-event.types";

// export async function emitAlarm(params: {
//     topic: string;
//     tbmId: string;
//     type: AlarmType;
//     severity: EventSeverity;
//     message: string;
//     raw?: any;
// }) {
//     const { topic, tbmId, type, severity, message, raw } = params;



//     const ev: AlarmEvent = {
//         topic,
//         tbmId,
//         alarmType: type,
//         severity,
//         message,
//         timestamp: new Date().toISOString(),
//         raw,
//     };

//     await dispatchAlarm(ev);
// }
