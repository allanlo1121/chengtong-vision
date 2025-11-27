// src/processing/tbmConnectivityProcessor.ts
import { supabaseAdmin } from "@core/supabase/client.js";
import { logger } from "../core/logger.js";
import { extractTbmId, extractRing } from "@utils/realdataExtractor.js";

// -----------------------------
// 工具函数：标准化 TBM key
// -----------------------------
export function normalizeTbmKey(value: any): string | null {
    if (!value) return null;
    const str = String(value).trim();
    if (!str) return null;
    return str.slice(0, 8).toUpperCase();
}

// -----------------------------
// 从 topic 提取 TBM key
// chengtong/realdata/th609 → "TH609"
// -----------------------------
export function extractTbmKeyFromTopic(topic: string): string | null {
    if (!topic) return null;
    const key = topic.split("/").pop();
    return normalizeTbmKey(key);
}



// -----------------------------
// 1️⃣ 处理 Heartbeat 包
// -----------------------------
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
                updated_at: now
            },
            { onConflict: "tbm_id" }
        );

    if (error) {
        logger.error("❌ Failed to update heartbeat:", error);
        return;
    }

    logger.debug(`💓 Heartbeat registered for TBM=${tbmId}`);
}

// -----------------------------
// 2️⃣ 处理 Realdata 包
// -----------------------------
/**
 * registerRealdata.ts  —— 生产版
 *
 * 职责：
 *  - 记录最新 realdata 的时间戳与 payload
 *  - 更新 PLC 状态为 online
 *  - （可选）由 validateRing 控制是否更新 last_ring
 *
 * 不负责：
 *  - 环号合法性判断（由 validateRing 负责）
 *  - spike/median/delta 逻辑
 *  - 阀值判断逻辑
 */



export async function registerRealdata(
  tbmId: string,
  ring: number | null,
  payload: any,
  validateResult?: { valid: boolean; ring?: number | null }
) {
  const now = new Date().toISOString();

  // ------------------------------------------------
  // 1. 基础更新字段（不管 ring 是否正常）
  // ------------------------------------------------
  const updateData: any = {
    tbm_id: tbmId,
    plc_status: "online",
    last_realdata_at: now,
    last_realdata_payload: payload,
    updated_at: now,
  };

  // ------------------------------------------------
  // 2. 仅在 validateRing 判定 ring 合法时才更新 last_ring
  // ------------------------------------------------
  if (validateResult?.valid && validateResult.ring != null) {
    updateData.last_ring = validateResult.ring;
  }

  // ------------------------------------------------
  // 3. upsert snapshot —— 如果 snapshot 不存在则创建
  // ------------------------------------------------
  const { error } = await supabaseAdmin
    .from("tbm_connectivity_snapshots")
    .upsert(updateData, { onConflict: "tbm_id" });

  if (error) {
    logger.error(`❌ Failed to update snapshot for TBM=${tbmId}`, error);
    return { stored: false, error };
  }

  logger.debug(`📡 Realdata stored for TBM=${tbmId} (ring=${ring ?? "?"})`);

  return { stored: true };
}


// -----------------------------
// 3️⃣ 总入口：处理 heartbeat topic
// -----------------------------
export async function handleHeartbeat(topic: string, payload: any) {
    const tbmId = extractTbmId(payload);

    if (!tbmId) {
        logger.warn("⚠️ Heartbeat missing TBM ID:", topic);
        return;
    }

    await registerHeartbeat(tbmId, payload);
}

// -----------------------------
// 4️⃣ 总入口：处理 realdata topic
// -----------------------------
// export async function handleRealdata(topic: string, payload: any) {
//     const tbmId = extractTbmId(payload);

//     if (!tbmId) {
//         logger.warn("⚠️ Realdata missing TBM ID:", topic);
//         return;
//     }

//     const ring = extractRing(payload);

//     await registerRealdata(tbmId, ring, payload);
// }
