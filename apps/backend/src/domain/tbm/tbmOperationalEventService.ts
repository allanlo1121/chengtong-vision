// // src/services/tbmOperationalEventService.ts
// import { supabaseAdmin } from "@core/supabase/client.js";
// import { logger } from "../../core/logger.js";
// import type { AlarmEvent } from "@models/alarm-event.types.js";

// export async function saveOperationalEvent(ev: AlarmEvent) {
//     const { error } = await supabaseAdmin
//         .from("tbm_operational_events")
//         .insert({
//             tbm_id: ev.tbmId,
//             topic: ev.topic,
//             alarm_type: ev.alarmType,
//             severity: ev.severity,
//             occurred_at: ev.timestamp,
//             ring_no: ev.ringNo ?? null,
//             parameters: ev.parameters ?? null,
//             payload: ev.payload ?? null,
//             message: ev.message ?? null
//         });

//     if (error) {
//         logger.error("❌ Failed to save tbm_operational_event:", error);
//     }
// }
