// src/services/tbmConnectivityService.ts
import { supabaseAdmin } from "@core/supabase/client.js";
import { logger } from "@core/logger.js";
import { getActiveTbmIds } from "@cache/tbmContextCache.js";

export type OnlineStatus = "online" | "offline";

// export interface ConnectivitySnapshot {
//   tbm_id: string;
//   heartbeat_status: OnlineStatus;
//   last_heartbeat_status: OnlineStatus;
//   plc_status: OnlineStatus;
//   last_plc_status: OnlineStatus;
//   heartbeat_status_change_at: string | null;
//   plc_status_change_at: string | null;
//   last_ring: number | null;
//   last_heartbeat_payload?: any;
//   last_realdata_payload?: any;
//   last_heartbeat_at: string;
//   last_realdata_at: string;
//   updated_at?: string;
// }

import type { Database } from "@models/supabase.types";

export type ConnectivitySnapshot =
  Database["public"]["Tables"]["tbm_connectivity_snapshots"]["Row"];

/**
 * 获取当前快照
 */
export async function getConnectivitySnapshot(tbmId: string): Promise<ConnectivitySnapshot | null> {
  const { data, error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .select("*")
    .eq("tbm_id", tbmId)
    .single();

  if (error) return null;
  return data as ConnectivitySnapshot;
}
/* -----------------------------------------
 *  只获取 last_ring
 * ----------------------------------------- */
export async function getSnapshotLastRing(
  tbmId: string
): Promise<number | null> {
  const snapshot = await getConnectivitySnapshot(tbmId);
  return snapshot?.last_ring ?? null;
}
/**
 * 注册心跳（采集盒子在线）
 * - 更新 heartbeat_status = 'online'
 * - 更新 last_heartbeat_at
 */
export async function registerHeartbeat(tbmId: string, payload: any) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .upsert(
      {
        tbm_id: tbmId,
        heartbeat_status: "online",
        last_heartbeat_at: now,
        last_heartbeat_payload: payload,
        updated_at: now,
      },
      { onConflict: "tbm_id" }
    );

  if (error) {
    logger.error("❌ registerHeartbeat error", error);
    throw error;
  }
}

/**
 * 注册实时数据（PLC 在线）
 * - 更新 plc_status = 'online'
 * - 更新 last_realdata_at
 * - 更新 last_ring
 */
export async function registerRealdata(
  tbmId: string,
  ring: number | null,
  payload: any
) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .upsert(
      {
        tbm_id: tbmId,
        plc_status: "online",
        last_realdata_at: now,
        last_realdata_payload: payload,
        last_ring: ring,
        updated_at: now,
      },
      { onConflict: "tbm_id" }
    );

  if (error) {
    logger.error("❌ registerRealdata error", error);
    throw error;
  }
}

/**
 * 更新单项 connectivity 状态
 * type: "heartbeat" | "plc"
 * status: "online" | "offline"
 */
export async function updateConnectivityStatus(
  tbmId: string,
  type: "heartbeat" | "plc",
  status: "online" | "offline"
) {
  const now = new Date().toISOString();

  const field =
    type === "heartbeat"
      ? "heartbeat_status"
      : "plc_status";

  const last_field =
    type === "heartbeat"
      ? "last_heartbeat_status"
      : "last_plc_status";
  const last_status = status === "online" ? "offline" : "online";

  const change_at = type === "heartbeat" ? "heartbeat_status_change_at" : "plc_status_change_at";

  const { error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .update({
      [field]: status,
      [last_field]: last_status,
      [change_at]: now,
      updated_at: now,
    })
    .eq("tbm_id", tbmId);

  if (error) {
    logger.error(`❌ updateConnectivityStatus error (${type}, ${status})`, error);
  }
}
export async function markHeartbeatOffline(tbmId: string) {
  return updateConnectivityStatus(tbmId, "heartbeat", "offline");
}

export async function markHeartbeatOnline(tbmId: string) {
  return updateConnectivityStatus(tbmId, "heartbeat", "online");
}

export async function markPlcOffline(tbmId: string) {
  return updateConnectivityStatus(tbmId, "plc", "offline");
}

export async function markPlcOnline(tbmId: string) {
  return updateConnectivityStatus(tbmId, "plc", "online");
}



/**
 * 综合状态函数（可选）
 * 返回：
 * - "online"
 * - "partial_offline"（一种在线一种离线）
 * - "offline"
 */
export async function getOverallStatus(tbmId: string) {
  const snap = await getConnectivitySnapshot(tbmId);
  if (!snap) return "unknown";

  const hb = snap.heartbeat_status;
  const plc = snap.plc_status;

  if (hb === "online" && plc === "online") return "online";
  if (hb === "offline" && plc === "offline") return "offline";

  return "partial_offline"; // 采集盒子或 PLC 有一个掉线
}

/**
 * 初始化 snapshot 行（如果不存在）
 */
export async function ensureSnapshot(tbmId: string) {
  const now = new Date().toISOString();

  // 查询是否已经存在
  const { data, error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .select("tbm_id")
    .eq("tbm_id", tbmId)
    .maybeSingle();

  if (error) {
    logger.error("❌ ensureSnapshot query failed", error);
    return;
  }

  if (data) return; // 已存在，无需初始化

  // 插入一条“全 offline”的初始记录
  const { error: insertErr } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .insert({
      tbm_id: tbmId,
      heartbeat_status: "offline",
      last_heartbeat_status: "offline",
      plc_status: "offline",
      last_plc_status: "offline",
      last_heartbeat_at: null,
      last_realdata_at: null,
      last_ring: null,
      last_heartbeat_payload: null,
      last_realdata_payload: null,
      updated_at: now
    });

  if (insertErr) {
    logger.error("❌ ensureSnapshot insert failed", insertErr);
  } else {
    logger.info(`🧩 Initialized connectivity snapshot for TBM=${tbmId}`);
  }
}

// 删除 snapshot（可选）
export async function deleteSnapshot(tbmId: string) {
  const { error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .delete()
    .eq("tbm_id", tbmId);

  if (error) {
    logger.error("❌ deleteSnapshot error", error);
  } else {
    logger.info(`🗑️ Deleted connectivity snapshot for TBM=${tbmId}`);
  }
}


// =========================================
// Preload snapshots on startup
// =========================================
export async function initSnapshotsForAllActiveTbms() {
  const activeIds = getActiveTbmIds();

  logger.info(`🟣 Initializing snapshots for ${activeIds.length} active TBMs...`);

  for (const tbmId of activeIds) {
    await ensureSnapshot(tbmId);
  }

  logger.info("✨ All snapshots ensured.");
}