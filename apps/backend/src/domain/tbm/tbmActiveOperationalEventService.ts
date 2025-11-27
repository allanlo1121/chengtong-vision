import { supabaseAdmin } from "@core/supabase/client.js";
import { logger } from "../../core/logger.js";
import type { AlarmEvent } from "@models/alarm-event.types.js";


// const severityRank = { info: 1, warning: 2, critical: 3 };

// function severityUpgraded(newSeverity: string, oldSeverity: string): boolean {
//   return severityRank[newSeverity] > severityRank[oldSeverity];
// }

// function shouldTriggerRepeatWarning(oldValue: number, newValue: number, delta_thresholds: number = 10) {
//   const delta = Math.abs(newValue - oldValue);

//   return delta >= (delta_thresholds);
// }

// //插入或更新 Active 事件
// export async function upsertActiveOperationalEvent(ev: AlarmEvent) {
//   const now = new Date().toISOString();
//   const { tbmId, paramCode, severity } = ev;

//   const { data: active } = await supabaseAdmin
//     .from("tbm_active_operational_events")
//     .select("*")
//     .eq("tbm_id", tbmId)
//     .eq("param_code", paramCode)
//     .maybeSingle();

//   // ② 如果没有 active → 直接创建
//   if (!active) {
//     return await upsertActiveEvent(ev);
//   }

//   const oldValue = active.value;
//   const newValue = ev.value;

//   const { error } = await supabaseAdmin
//     .from("tbm_active_operational_events")
//     .upsert(
//       {
//         tbm_id: ev.tbmId,
//         alarm_type: ev.alarmType,
//         param_code: ev.paramCode,
//         severity: ev.severity,
//         ring_no: ev.ringNo ?? null,
//         parameters: ev.parameters ?? null,
//         payload: ev.payload ?? null,
//         message: ev.message ?? null,
//         updated_at: now
//       },
//       { onConflict: "tbm_id,param_code" }
//     );

//   if (error) {
//     logger.error("❌ Failed to upsert tbm_active_operational_event:", error);
//   }
// }

//插入或更新 Active 事件
export async function upsertActiveOperationalEvent(ev: AlarmEvent) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .upsert(
      {
        tbm_id: ev.tbmId,
        alarm_type: ev.alarmType,
        param_code: ev.paramCode,
        value: ev.value,
        severity: ev.severity,
        ring_no: ev.ringNo ?? null,
        parameters: ev.parameters ?? null,
        payload: ev.payload ?? null,
        message: ev.message ?? null,
        updated_at: now
      },
      { onConflict: "tbm_id,param_code" }
    );

  if (error) {
    logger.error("❌ Failed to upsert tbm_active_operational_event:", error);
  }
}

// 恢复 Active 事件（删除）
export async function resolveActiveEvent(tbmId: string, paramCode: string) {
  const { error } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .delete()
    .eq("tbm_id", tbmId)
    .eq("param_code", paramCode);

  if (error) {
    logger.error("❌ Failed to resolve active event:", error);
  }
}

//查询某 TBM 仍处于 Active 的事件
export async function getActiveEvents(tbmId: string) {
  const { data, error } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .select("*")
    .eq("tbm_id", tbmId);

  if (error) {
    logger.error("❌ Failed to fetch active events:", error);
    return [];
  }

  return data;
}
