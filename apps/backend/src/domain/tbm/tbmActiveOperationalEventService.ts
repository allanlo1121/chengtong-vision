import { supabaseAdmin } from "@core/supabase/client.js";
import { logger } from "../../core/logger.js";
import type { AlarmEvent, EventUpdateType } from "@core/eventbus/types";

import { Database, Json } from '@models/supabase.types';

import { evaluateEventUpdate } from "../../events/realdataEventHandler.js";

type ActiveEventRow = Database['public']['Tables']['tbm_active_operational_events']['Insert'];


const ALARM_NOTIFY_INTERVAL: Record<string, number> = {
  GUIDANCE: 24 * 60 * 60 * 1000,        // 4 小时
  PRESSURE: 24 * 60 * 60 * 1000,        // 1 小时
  CONNECTIVITY: 1 * 60 * 1000,        // 10 分钟
  OVERHEAT: 1 * 60 * 60 * 1000,        // 6 小时
  DEFAULT: 24 * 60 * 60 * 1000         // 默认 24 小时
};

export function getNotifyInterval(alarmType: string): number {
  return ALARM_NOTIFY_INTERVAL[alarmType] ?? ALARM_NOTIFY_INTERVAL.DEFAULT;
}

// //插入或更新 Active 事件
export async function upsertActiveOperationalEvent(ev: AlarmEvent): Promise<{ updated: boolean, updatedType: EventUpdateType }> {

  //console.log("upsertActiveOperationalEvent(ev)", ev);
  
  const now = new Date();
  const nowISO = now.toISOString();

  const { tbmId, paramCode, severity } = ev;

  const { data: occurred } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .select("*")
    .eq("tbm_id", tbmId)
    .eq("param_code", paramCode)
    .eq("window_ms", ev.window_ms ?? 0)
    .maybeSingle();

  // ② 如果没有 occurred → 直接创建
  if (!occurred) {
    if (severity === 1) {
      // 正常状态不创建事件
      return { updated: false, updatedType: "no_change" };
    }
    const res = await upsertActiveEvent(ev);
    return { updated: res.updated, updatedType: "new_event" };
  }

  ev.duration_ms = new Date(ev.timestamp).getTime() - new Date(occurred.occurred_at).getTime();

  const prevEvent: AlarmEvent = {
    tbmId: occurred.tbm_id,
    paramCode: occurred.param_code,
    severity: occurred.severity,
    timestamp: occurred.occurred_at,
    value: occurred.value,
    window_ms: occurred.window_ms,
  }


  const eventUpdate = evaluateEventUpdate(ev, prevEvent);

  //console.log("eventUpdate", eventUpdate, paramCode, ev.value);



  if (!eventUpdate || eventUpdate.updateType === "no_change") {
    return { updated: false, updatedType: "no_change" };
  }

  if (eventUpdate.updateType === "resolved") {
    const res = await resolveActiveEvent(tbmId, paramCode);
    return { updated: res.deleted, updatedType: "resolved" };
  }

  const res = await upsertActiveEvent(ev);

  return { updated: res.updated, updatedType: eventUpdate.updateType };
}

//插入Active 事件
// export async function insertActiveEvent(ev: AlarmEvent): Promise<{ created: boolean }> {
//   const now = new Date().toISOString();

//   const payload: ActiveEventRow = {
//     tbm_id: ev.tbmId,

//     param_code: ev.paramCode,
//     value: ev.value,
//     severity_id: ev.severity,
//     ring_no: ev.ringNo ?? null,
//     parameters: (ev.parameters as unknown as Json) ?? null,
//     payload: ev.payload ?? null,
//     message: ev.message ?? null,
//     occurred_at: ev.timestamp,
//     created_at: now,
//     updated_at: now
//   };

//   const { error } = await supabaseAdmin
//     .from("tbm_active_operational_events")
//     .insert(payload);

//   if (error) {
//     logger.error("❌ Failed to insert tbm_active_operational_event:", error);
//     return { created: false };
//   }

//   return { created: true };
// }



//插入或更新 Active 事件
export async function upsertActiveEvent(ev: AlarmEvent): Promise<{ updated: boolean }> {
  const now = new Date().toISOString();
  //console.log("ev", ev);

  const payload: ActiveEventRow = {
    tbm_id: ev.tbmId,
    param_code: ev.paramCode,
    value: ev.value,
    severity_id: ev.severity,
    window_ms: ev.window_ms ?? 0,
    ring_no: ev.ringNo ?? null,
    parameters: (ev.parameters as unknown as Json) ?? null,
    payload: ev.payload ?? null,
    message: ev.message ?? null,
    occurred_at: new Date(ev.timestamp).toISOString(),
    created_at: now,
    updated_at: now
  };
  //console.log("Upserting active event with payload:", payload);

  const { error } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .upsert(
      payload,
      { onConflict: "tbm_id,param_code,window_ms" }
    )

  if (error) {
    logger.error("❌ Failed to upsert tbm_active_operational_event:", error);
    return { updated: false };
  }

  return { updated: true };
}

// 恢复 Active 事件（删除）
export async function resolveActiveEvent(tbmId: string, paramCode: string): Promise<{ deleted: boolean }> {
  const { error } = await supabaseAdmin
    .from("tbm_active_operational_events")
    .delete()
    .eq("tbm_id", tbmId)
    .eq("param_code", paramCode);

  if (error) {
    logger.error("❌ Failed to resolve active event:", error);
    return { deleted: false };
  }

  return { deleted: true };
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


