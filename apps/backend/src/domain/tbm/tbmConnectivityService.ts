// src/services/tbmConnectivityService.ts
import { supabase } from "@core/supabase/client.js";
import { logger } from "@core/logger.js";
import { getActiveTbmIds } from "@cache/tbmContextCache.js";

import { upsertTbmConnectivitySnapshot } from "@core/connectivity-snapshots/mutations.js";

export type OnlineStatus = "ONLINE" | "OFFLINE";



import type { Database } from "@core/supabase/supabase.types.js";


export type ConnectivitySnapshot =
  Database["public"]["Tables"]["tbm_connectivity_snapshots"]["Row"];

/**
 * 获取当前快照
 */
export async function getConnectivitySnapshot(tbmId: string, state_type: string): Promise<ConnectivitySnapshot | null> {
  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .select("*")
    .eq("tbm_id", tbmId)
    .eq("state_type", state_type)
    .maybeSingle()


  if (error) return null;
  return data as ConnectivitySnapshot;
}
/* -----------------------------------------
 *  只获取 last_ring
 * ----------------------------------------- */

/**
 * 注册心跳（采集盒子在线）
 * - 更新 heartbeat_status = 'online'
 * - 更新 last_heartbeat_at
 */
export async function registerHeartbeat(tbmId: string) {
  const now = new Date().toISOString();

  // 1. 获取当前状态
  const { data, error: queryErr } = await supabase
    .from("tbm_connectivity_snapshots")
    .select("status, changed_at")
    .eq("tbm_id", tbmId)
    .eq("state_type", "heartbeat")
    .maybeSingle();

  if (queryErr) {
    logger.error("❌ Heartbeat query error", queryErr);
    return;
  }

  const prevStatus = data?.status ?? "OFFLINE";
  const isChanged = prevStatus !== "ONLINE";

  // 2. 生成更新 payload
  const updateData: any = {
    status: "ONLINE",
    updated_at: now
  };

  if (isChanged) updateData.changed_at = now;

  // 3. upsert
  const { error } = await supabase
    .from("tbm_connectivity_snapshots")
    .upsert(
      {
        tbm_id: tbmId,
        state_type: "heartbeat",
        ...updateData
      },
      { onConflict: "tbm_id,state_type" }
    );

  if (error) logger.error("❌ registerHeartbeat DB error", error);
}


/**
 * 注册实时数据（PLC 在线）
 * - 更新 plc_status = 'online'
 * - 更新 last_realdata_at
 * - 更新 last_ring
 */
export async function registerPlcStatus(tbmId: string, isOnline: boolean, ring?: number) {
  const now = new Date().toISOString();
  const newStatus = isOnline ? "ONLINE" : "OFFLINE";

  // 1. 查询现有状态
  const { data, error: queryErr } = await supabase
    .from("tbm_connectivity_snapshots")
    .select("status, changed_at")
    .eq("tbm_id", tbmId)
    .eq("state_type", "plc")
    .maybeSingle();

  if (queryErr) {
    logger.error("❌ PLC query error", queryErr);
    return;
  }

  const prevStatus = data?.status ?? "OFFLINE";
  const isChanged = prevStatus !== newStatus;

  // 2. 更新数据
  const updateData: any = {
    status: newStatus,
    updated_at: now,
  };

  if (isChanged) updateData.changed_at = now;
  if (ring != null) updateData.last_ring = ring;

  // 3. upsert
  const { error } = await supabase
    .from("tbm_connectivity_snapshots")
    .upsert(
      {
        tbm_id: tbmId,
        state_type: "plc",
        ...updateData
      },
      { onConflict: "tbm_id,state_type" }
    );

  if (error) logger.error("❌ registerPlcStatus DB error", error);
}


/**
 * 更新单项 connectivity 状态
 * type: "heartbeat" | "plc"
 * status: "online" | "offline"
 */
export async function updateConnectivityStatus(
  tbmId: string,
  state_type: "heartbeat" | "plc",
  status: "ONLINE" | "OFFLINE"
) {
  const now = new Date().toISOString();
  logger.debug(`🔄 Updating connectivity status for TBM=${tbmId}, type=${state_type}, status=${status}`);

  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .update({
      status,
      changed_at: now,
      updated_at: now,
    })
    .eq("tbm_id", tbmId)
    .eq("state_type", state_type)
    .select(); // 返回更新后的数据;

  if (error) {
    logger.error(`❌ updateConnectivityStatus error (${state_type}, ${status})`, error);
  }
  logger.debug(`✅ Connectivity status updated for TBM=${tbmId}, type=${state_type}, status=${status},data=${JSON.stringify(data)}`);
}
export async function markHeartbeatOffline(tbmId: string) {
  const state_type = "heartbeat";
  const status = "OFFLINE";
  return upsertTbmConnectivitySnapshot({ tbm_id: tbmId, state_type, status });
}

export async function markHeartbeatOnline(tbmId: string) {
  const state_type = "heartbeat";
  const status = "ONLINE";
  return upsertTbmConnectivitySnapshot({ tbm_id: tbmId, state_type, status });
}

export async function markPlcOffline(tbmId: string) {
  const state_type = "plc";
  const status = "OFFLINE";
  return upsertTbmConnectivitySnapshot({ tbm_id: tbmId, state_type, status });
}

export async function markPlcOnline(tbmId: string) {
  const state_type = "plc";
  const status = "ONLINE";
  return upsertTbmConnectivitySnapshot({ tbm_id: tbmId, state_type, status });
}

export async function getAllConnectivitySnapshots(tbmId: string) {
  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .select("*")
    .eq("tbm_id", tbmId);

  if (error) {
    logger.error("❌ Failed to load snapshots", error);
    return null;
  }

  const result: any = {};

  for (const row of data) {
    result[row.state_type] = row;  // heartbeat / plc
  }

  return result;
}

/**
 * 综合状态函数（可选）
 * 返回：
 * - "online"
 * - "partial_offline"（一种在线一种离线）
 * - "offline"
 */
// export async function getOverallStatus(tbmId: string) {
//   const snap = await getConnectivitySnapshot(tbmId);
//   if (!snap) return "unknown";

//   const hb = snap.heartbeat_status;
//   const plc = snap.plc_status;

//   if (hb === "online" && plc === "online") return "online";
//   if (hb === "offline" && plc === "offline") return "offline";

//   return "partial_offline"; // 采集盒子或 PLC 有一个掉线
// }

/**
 * 初始化 snapshot 行（如果不存在）
 */
export async function ensureSnapshot(tbmId: string) {
  const now = new Date().toISOString();

  const REQUIRED_TYPES = ["heartbeat", "plc"];

  for (const stateType of REQUIRED_TYPES) {
    // 查询是否存在该 TBM + stateType 的 snapshot
    const { data, error } = await supabase
      .from("tbm_connectivity_snapshots")
      .select("tbm_id")
      .eq("tbm_id", tbmId)
      .eq("state_type", stateType)
      .maybeSingle();

    if (error) {
      logger.error("❌ ensureSnapshot query failed", { tbmId, stateType, error });
      continue;
    }

    if (data) continue; // 已存在，无需初始化

    // 插入默认 offline 记录
    const { error: insertErr } = await supabase
      .from("tbm_connectivity_snapshots")
      .insert({
        tbm_id: tbmId,
        state_type: stateType,
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
      logger.error("❌ ensureSnapshot insert failed", { tbmId, stateType, insertErr });
    } else {
      logger.info(`🧩 Initialized connectivity snapshot: TBM=${tbmId}, stateType=${stateType}`);
    }
  }
}


async function cleanupInactiveSnapshots(activeIds: string[]) {
  logger.info("🧹 Cleaning up inactive TBM snapshots...");

  const ids = `(${activeIds.join(",")})`;

  // PostgreSQL: delete where tbm_id NOT IN activeIds
  const { data, error } = await supabase
    .from("tbm_connectivity_snapshots")
    .delete()
    .not("tbm_id", "in", ids);

  if (error) {
    logger.error("❌ Failed to clean inactive snapshots:", error);
    return;
  }

  logger.info(`🧼 Deleted  inactive snapshots.`);
}

// 删除 snapshot（可选）
export async function deleteSnapshot(tbmId: string) {
  const { error } = await supabase
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

  console.log("activeIds", activeIds);



  await cleanupInactiveSnapshots(activeIds);

  for (const tbmId of activeIds) {
    await ensureSnapshot(tbmId);
  }

  logger.info("✨ All snapshots ensured.");
}