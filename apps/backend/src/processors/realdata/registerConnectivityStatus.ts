
import { logger } from "@core/logger.js";
import { upsertTbmConnectivitySnapshot } from "@core/connectivity-snapshots/mutations.js";
import { getConnectivitySnapshotByType } from "@core/connectivity-snapshots/queries.js";
import type { TbmConnectivitySnapshotInsert } from "@core/connectivity-snapshots/types.js";



// -----------------------------
// 1️⃣ 处理 Heartbeat 包
// -----------------------------
export async function registerHeartbeat(tbmId: string): Promise<{ statusChanged: boolean; created: boolean; data: TbmConnectivitySnapshotInsert }> {

  const res = await upsertTbmConnectivitySnapshot({
    tbm_id: tbmId,
    state_type: "heartbeat",
    status: "ONLINE"
  });
  if (res.statusChanged) {
    logger.debug(`💓 Heartbeat snapshot updated for TBM=${tbmId}`);
  }


  logger.debug(`💓 Heartbeat registered for TBM=${tbmId}`);

  return res;
}


// -----------------------------
// 2️⃣ 处理 Realdata 包
// -----------------------------

export async function registerRealdata(
  tbmId: string,
  ringNo: number,

): Promise<{ statusChanged: boolean; created: boolean; data: TbmConnectivitySnapshotInsert }> {
  const now = new Date().toISOString();

  // ------------------------------------------------
  // 1. 基础更新字段（不管 ring 是否正常）
  // ------------------------------------------------
  const updateData: any = {
    tbm_id: tbmId,
    state_type: "plc",
    status: "ONLINE",
    last_ring: ringNo,
  };

  const res = await upsertTbmConnectivitySnapshot(updateData);
  if (res.statusChanged) {
    logger.debug(`💓 Heartbeat snapshot updated for TBM=${tbmId}`);
  }


  logger.debug(`💓 Heartbeat registered for TBM=${tbmId}`);



  logger.debug(`📡 Realdata registered for TBM=${tbmId}, ringNo=${ringNo}`);


  return res;
}


export async function getSnapshotLastRing(
  tbmId: string
): Promise<number | null> {
  const snapshot = await getConnectivitySnapshotByType(tbmId, "plc");
  return snapshot?.last_ring ?? null;
}