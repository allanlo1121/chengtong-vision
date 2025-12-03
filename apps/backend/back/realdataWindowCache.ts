// ============================================================================
//  realdataWindowCache.ts
//  TBM 实时数据 —— 10 分钟滑动窗口缓存（高性能版）
//  结构：
//    tbmWindows[tbmId] = [
//       { ts, s100206003: 12.3, s100100008: 321, ... },
//       { ts, s100206003: 13.1 },
//       ...
//    ]
// ============================================================================

import { logger } from "@/core/logger";
import type { RealdataRecord } from "@/models/tbm/realdata.types";

// 只缓存关心的参数（可配置）
export const CACHED_PARAMETERS = new Set<string>([
    "s100206003",   // rear_Y
    "s100206004",   // rear_X
    "s100206006",   // rear_Y
    "s100206007",   // rear_X
]);

// 窗口大小：10 分钟
export const WINDOW_MS = 10 * 60 * 1000;

// 单条缓存记录（只含 ts + 关心的参数）
export interface WindowRecord {
    ts: number;
    [paramCode: string]: number | undefined;
}

// TBM → 该 TBM 的 WindowRecord 数组
const tbmWindows = new Map<string, WindowRecord[]>();

// ============================================================================
// 1. 添加一条实时数据到窗口
// ============================================================================

/**
 * 添加 realdata 到窗口缓存
 * payload 必须包含若干参数，例如：
 *   { s100100008: 100, s100206003: 12.1, s050001001: 330, ... }
 */
export function addRealdataToWindow(
    tbmId: string,
    payload: Record<string, any>,
    ts: number = Date.now()
) {
    if (!tbmWindows.has(tbmId)) tbmWindows.set(tbmId, []);

    const windowArr = tbmWindows.get(tbmId)!;

    // 仅抽取关心的参数
    const rec: WindowRecord = { ts };
    let hasUsefulParam = false;

    for (const key of CACHED_PARAMETERS) {
        if (payload[key] !== undefined) {
            rec[key] = Number(payload[key]);
            hasUsefulParam = true;
        }
    }

    if (!hasUsefulParam) return; // 没有关心参数，不记录

    windowArr.push(rec);

    // 清理超时数据
    cleanupWindow(tbmId);
}

// ============================================================================
// 2. 清理过期记录
// ============================================================================

export function cleanupWindow(tbmId: string) {
    const windowArr = tbmWindows.get(tbmId);
    if (!windowArr) return;

    const now = Date.now();
    const cutoff = now - WINDOW_MS;

    // 保留 cutoff 之后的数据
    const lenBefore = windowArr.length;
    tbmWindows.set(
        tbmId,
        windowArr.filter((r) => r.ts >= cutoff)
    );

    const removed = lenBefore - tbmWindows.get(tbmId)!.length;
    if (removed > 0) {
        logger.debug(`🧹 Cleared ${removed} old records for TBM ${tbmId}`);
    }
}

// ============================================================================
// 3. 获取最近一条记录中某个参数的最新值
// ============================================================================

export function getLatestValue(
    tbmId: string,
    paramCode: string
): number | null {
    const windowArr = tbmWindows.get(tbmId);
    if (!windowArr || windowArr.length === 0) return null;

    // 从最新往前找
    for (let i = windowArr.length - 1; i >= 0; i--) {
        const v = windowArr[i][paramCode];
        if (v !== undefined) return v;
    }
    return null;
}

// ============================================================================
// 4. 获取整个窗口内某个参数的所有值（用于 delta / median）
// ============================================================================

export function getWindowByParamCode(
    tbmId: string,
    paramCode: string
): { ts: number; value: number }[] {
    const windowArr = tbmWindows.get(tbmId);
    if (!windowArr) return [];

    return windowArr
        .filter((r) => r[paramCode] !== undefined)
        .map((r) => ({ ts: r.ts, value: r[paramCode]! }));
}

export function getTbmWindow(tbmId: string): WindowRecord[] {
    let w = tbmWindows.get(tbmId);
    if (!w) {
        w = [];
        tbmWindows.set(tbmId, w);
    }
    return w;
}

//TODO  获取最后一条完整记录(某tbm_id)
export function getLastWindowRecord(tbmId: string): WindowRecord | null {
    const windowArr = tbmWindows.get(tbmId);
    if (!windowArr || windowArr.length === 0) return null;
    return windowArr[windowArr.length - 1];
}
// ============================================================================
// 5. 删除某台 TBM 的缓存（例如 TBM 停止工作）
// ============================================================================

export function clearTbmWindow(tbmId: string) {
    tbmWindows.delete(tbmId);
    logger.info(`🗑 Cleared window cache for TBM ${tbmId}`);
}

// ============================================================================
// 6. 工具：获取整个窗口（调试用）
// ============================================================================

export function debugDump(tbmId: string) {
    return tbmWindows.get(tbmId) || [];
}



export function printWindowDebug(tbmId: string) {
    const window = debugDump(tbmId);
    if (!window || window.length === 0) {
        logger.debug(`🪟 Window(${tbmId}) is empty`);
        return;
    }

    const last5 = window.slice(-5);

    logger.info(`🪟 window(${tbmId}) latest ${last5.length} records:`);

    for (const rec of last5) {
        logger.info(`  → ts=${rec.ts}, ${JSON.stringify(rec)}`);
    }
}