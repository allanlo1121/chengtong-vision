// ============================================================================
//  realdataWindowCache.ts（最终统一版）
// ============================================================================

import { logger } from "@/core/logger";

export const WINDOW_MS = 10 * 60 * 1000;

// ts + value
export interface WindowItem {
  ts: number;
  value: number;
}

// Map<tbmId, Map<paramCode, WindowItem[]>>
const windowCache = new Map<string, Map<string, WindowItem[]>>();


// ---------------------------------------------------------------------------
// 获取一个 TBM 的 param 缓存数组
// ---------------------------------------------------------------------------
function getSeries(tbmId: string, paramCode: string): WindowItem[] {
  if (!windowCache.has(tbmId)) {
    windowCache.set(tbmId, new Map());
  }

  const tbmMap = windowCache.get(tbmId)!;

  if (!tbmMap.has(paramCode)) {
    tbmMap.set(paramCode, []);
  }

  return tbmMap.get(paramCode)!;
}


// ---------------------------------------------------------------------------
// 添加一条窗口数据（所有需要阀值的参数都走这里）
// ---------------------------------------------------------------------------
export function addWindowValue(
  tbmId: string,
  paramCode: string,
  value: number,
  ts: number = Date.now()
) {
  const series = getSeries(tbmId, paramCode);
  series.push({ ts, value });

  cleanupSeries(series, tbmId, paramCode);
}


// ---------------------------------------------------------------------------
// 清理过期窗口
// ---------------------------------------------------------------------------
function cleanupSeries(series: WindowItem[], tbmId: string, paramCode: string) {
  const cutoff = Date.now() - WINDOW_MS;
  const before = series.length;

  // 只保留窗口内的数据
  while (series.length > 0 && series[0].ts < cutoff) {
    series.shift();
  }

  const removed = before - series.length;
  if (removed > 0) {
    logger.debug(`🧹 Cleared ${removed} old records for ${tbmId}:${paramCode}`);
  }
}


// ---------------------------------------------------------------------------
// 获取某参数的窗口数组
// ---------------------------------------------------------------------------
export function getWindowSeries(
  tbmId: string,
  paramCode: string
): WindowItem[] {
  return getSeries(tbmId, paramCode);
}


// ---------------------------------------------------------------------------
// 清理某 TBM 所有缓存
// ---------------------------------------------------------------------------
export function clearTbmWindow(tbmId: string) {
  windowCache.delete(tbmId);
}
