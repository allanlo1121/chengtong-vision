
import { logger } from "../logger.js";
import { supabase } from "../supabase/client.js";
import type { AlarmEvent, TbmActiveOperationalInsert, TbmActiveOperationalRow } from "./types";



export async function insertTbmActiveOperationalEvent(
    input: Omit<TbmActiveOperationalInsert, "id" | "created_at" | "updated_at">
) {
    const { data, error } = await supabase
        .from("tbm_active_operational_events")
        .insert(input)
        .select()
        .single();

    if (error) throw error;
    return data;
}


export async function updateTbmActiveOperationalEvent(
    input: Omit<TbmActiveOperationalInsert, "id" | "created_at" | "updated_at">
): Promise<{ updated: boolean; data: TbmActiveOperationalRow | null }> {

    const { data, error } = await supabase
        .from("tbm_active_operational_events")
        .update(input)
        .eq("tbm_id", input.tbm_id)
        .eq("param_code", input.param_code)
        .eq("window_ms", input.window_ms ?? 0)
        .select("*")
        .maybeSingle();

    if (error) {
        logger.error("❌ updateTbmActiveOperationalEvent failed:", error);
        throw error;
    }

    // data === null 时表示没有匹配行 → 没有更新
    return {
        updated: data != null,
        data,
    };
}

export async function upsertTbmActiveOperationalEvent(
  input: Omit<TbmActiveOperationalInsert, "id" | "created_at" | "updated_at">
): Promise<{ updated: boolean; created: boolean; data: TbmActiveOperationalRow }> {

  // Step 1: 判断是否存在（决定 updated or created）
  const { data: existed, error: existErr } = await supabase
    .from("tbm_active_operational_events")
    .select("id")
    .eq("tbm_id", input.tbm_id)
    .eq("param_code", input.param_code)
    .eq("window_ms", input.window_ms ?? 0)
    .maybeSingle();

  if (existErr) {
    logger.error("❌ Query failed before upsert:", existErr);
    throw existErr;
  }

  const isUpdate = Boolean(existed);

  // Step 2: UPSERT
  const { data, error } = await supabase
    .from("tbm_active_operational_events")
    .upsert(input, { onConflict: "tbm_id,param_code,window_ms" })
    .select("*")
    .single<TbmActiveOperationalRow>();

  if (error) {
    logger.error("❌ upsert failed:", error);
    throw error;
  }

  return {
    updated: isUpdate,
    created: !isUpdate,
    data,
  };
}

export async function deleteTbmActiveOperationalEventByKey(
  tbmId: string,
  paramCode: string,
  windowMs: number = 0
): Promise<{ deleted: boolean }> {

  const { data, error } = await supabase
    .from("tbm_active_operational_events")
    .delete()
    .eq("tbm_id", tbmId)
    .eq("param_code", paramCode)
    .eq("window_ms", windowMs)
    .select("id")
    .maybeSingle();

  if (error) {
    logger.error("❌ delete event failed:", error);
    throw error;
  }

  return { deleted: data != null };
}
