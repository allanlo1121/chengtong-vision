// src/processing/tbmConnectivityProcessor.ts

import { logger } from "../core/logger.js";
import { extractTbmId } from "@utils/realdataExtractor.js";

import { registerHeartbeat } from "./realdata/registerConnectivityStatus.js";

import { isTbmActive } from "@/metadata/tbmContextCache.js";
import { upsertSpecialAlarm } from "@/core/alarm/services/SystemAlarmService";





// -----------------------------
// 3️⃣ 总入口：处理 heartbeat topic
// -----------------------------
export async function handleHeartbeat(topic: string, payload: any) {
  const tbmId = extractTbmId(payload);

  if (!tbmId) {
    logger.warn("⚠️ Heartbeat missing TBM ID:", topic);
    return;
  }

  if (!isTbmActive(tbmId)) {
    logger.debug(`⏭️ Realdata ignored: TBM ${tbmId} is NOT active`);
    return;
  }

  const { statusChanged, created, data } = await registerHeartbeat(tbmId);
  if (created || statusChanged) {
    logger.info(`💓 Heartbeat snapshot created or updated for TBM=${tbmId}`);
    await upsertSpecialAlarm(
      tbmId,
      "n010000002",
      0,     // 绿色恢复
      1,     // online
      data   // payload
    );
  }

}

