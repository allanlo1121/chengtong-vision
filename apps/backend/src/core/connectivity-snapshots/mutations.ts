
import { logger } from "../logger.js";
import { supabase } from "../supabase/client.js";
import type { TbmConnectivitySnapshotInsert, TbmConnectivitySnapshotRow } from "./types.js";



export async function insertTbmConnectivitySnapshot(
  input: Omit<TbmConnectivitySnapshotInsert, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .insert(input)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}


export async function updateTbmConnectivitySnapshot(
  input: Omit<TbmConnectivitySnapshotInsert, "id" | "created_at" | "updated_at">
): Promise<{ updated: boolean; data: TbmConnectivitySnapshotRow | null }> {

  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .update(input)
    .eq("tbm_id", input.tbm_id)
    .select("*")
    .maybeSingle();

  if (error) {
    logger.error("❌ updateTbmConnectivitySnapshot failed:", error);
    throw error;
  }

  // data === null 时表示没有匹配行 → 没有更新
  return {
    updated: data != null,
    data,
  };
}

export async function upsertTbmConnectivitySnapshot(
  input: Omit<TbmConnectivitySnapshotInsert, "id">
): Promise<{ created: boolean; statusChanged: boolean; data: TbmConnectivitySnapshotRow }> {

  const now = new Date().toISOString();

  // Step 1: 查询旧状态
  const { data: existing, error: qerr } = await supabase
    .from("tbm_connectivity_snapshots")
    .select("status, changed_at")
    .eq("tbm_id", input.tbm_id)
    .eq("state_type", input.state_type)
    .maybeSingle();

  if (qerr) {
    logger.error("❌ Query failed:", qerr);
    throw qerr;
  }

  const isInsert = !existing;
  const statusChanged = existing?.status !== input.status;

  // Step 2: 设置 updated_at（每次刷新都要更新）
  input.updated_at = now;

  // Step 3: changed_at 只在状态变化时更新
  if (statusChanged) {
    input.changed_at = now;
  }

  // Step 4: 执行 UPSERT
  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .upsert(input, { onConflict: "tbm_id,state_type" })
    .select("*")
    .single();

  if (error) {
    logger.error("❌ Upsert failed:", error);
    throw error;
  }

  return {
    created: isInsert,
    statusChanged,
    data,
  };
}


export async function deleteTbmConnectivitySnapshotByTbmId(
  tbmId: string,
  windowMs: number = 0
): Promise<{ deleted: boolean }> {

  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .delete()
    .eq("tbm_id", tbmId)
    .select("id")
    .maybeSingle();

  if (error) {
    logger.error("❌ delete event failed:", error);
    throw error;
  }

  return { deleted: data != null };
}
