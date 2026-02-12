// apps/backend/src/services/ring/ringService.ts

import { publishEvent } from "../../core/eventbus/eventBus.js";
// import { supabase } from "@/core/supabase/client.js";
import { ActiveRingRepo } from "./activeRing.repo.js";

// 缓存状态
export const lastRingMap: Record<string, number> = {};
export const SYSTEM_START_AT = Date.now();

const JUMP_THRESHOLD = 3; // 判定跳跃
const RESET_THRESHOLD = 20; // 判定复位

// -----------------------------
// 环号滤波器
// -----------------------------
function filterRing(prev: number | undefined, next: number): number {
  if (prev == null) return next;

  // 小回退（允许抖动）
  if (next < prev && prev - next <= 2) return prev;

  // 小跳动允许
  if (next > prev && next - prev <= 1) return next;

  return next;
}

export const RingService = {
  /** 服务启动时加载数据库状态 */
  async initFromDatabase() {
    await ActiveRingRepo.initAll(lastRingMap);
  },

  /** 获取当前环号（缓存） */
  getLastRing(tbmId: string): number | null {
    return lastRingMap[tbmId] ?? null;
  },

  /** 处理环号（主入口） */
  async process({
    tbmId,
    rawRing,
    recordedAt,
  }: {
    tbmId: string;
    rawRing: number;
    recordedAt: string;
  }) {
    const prev = lastRingMap[tbmId];
    const ring = filterRing(prev, rawRing);
    recordedAt = recordedAt ?? new Date().toISOString();

    // 未变化
    if (prev === ring) return;

    // 复位（例如从 350 → 1）
    if (ring < 5 && prev != null && prev > RESET_THRESHOLD) {
      lastRingMap[tbmId] = ring;
      const eventPayload = {
        tbmId,
        paramCode: "s100100008",
        from: prev,
        to: ring,
        timestamp: recordedAt,
      };
      publishEvent("ring/reset", {
        tbmId,
        paramCode: "s100100008",
        from: prev,
        to: ring,
        severity: 2,
        timestamp: recordedAt,
        notification: {
          title: "环号复位",
          content: `环号从 ${prev} 复位到 ${ring}。`,
        },
      });
      return;
    }

    // 回退
    if (prev != null && ring < prev) {
      lastRingMap[tbmId] = ring;
      publishEvent("ring/rollback", {
        tbmId,
        paramCode: "s100100008",
        from: prev,
        to: ring,
        severity: 2,
        timestamp: recordedAt,
        notification: {
          title: "环号回退",
          content: `环号从 ${prev} 回退到 ${ring}。`,
        },
      });
      return;
    }

    // 跳跃
    if (prev != null && ring - prev > JUMP_THRESHOLD) {
      lastRingMap[tbmId] = ring;
      publishEvent("ring/jump", {
        tbmId,
        paramCode: "s100100008",
        from: prev,
        to: ring,
        severity: 1,
        timestamp: recordedAt,
        notification: {
          title: "环号跳跃",
          content: `环号从 ${prev} 跳跃到 ${ring}。`,
        },
      });
    }

    // 正常递增
    // publishEvent("ring/normal", {
    //     tbmId,
    //     paramCode: 's100100008',
    //     from: prev,
    //     to: ring,
    //     severity: 0,
    //     timestamp: recordedAt,
    //     notification: {
    //         title: "环号更新",
    //         content: `环号从 ${prev ?? "N/A"} 更新到 ${ring}。`
    //     }
    // });

    lastRingMap[tbmId] = ring;
    await ActiveRingRepo.upsert(tbmId, ring, recordedAt);
  },
};
