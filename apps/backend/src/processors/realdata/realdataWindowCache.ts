// =======================================
// TBM Realdata Window Cache
// - 维护 10 分钟滑动窗口
// - 掉线自动重置
// - 限制最大条数
// =======================================

import { logger } from "@core/logger.js";

export interface WindowDataPoint {
  timestamp: number;     // payload 接收到的时间
  ring: number | null;
  params: Record<string, number | null>; // 关键字段（推力、扭矩、偏差等）
}

interface TbmWindowState {
  lastPayload?: any;
  lastTimestamp?: number;
  window: WindowDataPoint[];
}

const TBM_WINDOWS = new Map<string, TbmWindowState>();

// 配置参数
const WINDOW_MAX_MINUTES = 10;
const WINDOW_MAX_ITEMS = 200;
const DROPOUT_RESET_MS = 1000 * 120; // 2分钟无数据 = 窗口失效

// ==================================================
// 主入口：添加 TBM 数据（realdata）
// ==================================================
export function pushRealdataToWindow(
  tbmId: string,
  ring: number | null,
  params: Record<string, number | null>,
  timestamp = Date.now()
) {
  let state = TBM_WINDOWS.get(tbmId);

  // 第一次创建缓存
  if (!state) {
    state = { window: [] };
    TBM_WINDOWS.set(tbmId, state);
  }

  // 掉线重置（超过 2 分钟未收到数据）
  if (state.lastTimestamp && timestamp - state.lastTimestamp > DROPOUT_RESET_MS) {
    logger.warn(`🧰 TBM=${tbmId} window reset due to dropout`);
    state.window = [];
  }

  state.lastTimestamp = timestamp;
  state.lastPayload = { ring, params, timestamp };

  // 插入新数据点
  state.window.push({
    timestamp,
    ring,
    params
  });

  cleanupWindow(tbmId);

  return state;
}

// ==================================================
// 清理窗口（时间超10分钟 + 数量超200）
// ==================================================
function cleanupWindow(tbmId: string) {
  const state = TBM_WINDOWS.get(tbmId);
  if (!state) return;

  const now = Date.now();

  // 1️⃣ 时间窗口清理（10分钟）
  state.window = state.window.filter(
    (x) => now - x.timestamp <= WINDOW_MAX_MINUTES * 60 * 1000
  );

  // 2️⃣ 数量限制（200条）
  if (state.window.length > WINDOW_MAX_ITEMS) {
    const removeCount = state.window.length - WINDOW_MAX_ITEMS;
    state.window.splice(0, removeCount); // 删除最老数据
  }
}

// ==================================================
// 获取 TBM 窗口（给 spike/median/delta 用）
// ==================================================
export function getTbmWindow(tbmId: string): WindowDataPoint[] {
  return TBM_WINDOWS.get(tbmId)?.window ?? [];
}

// ==================================================
// 判断窗口是否“有效”
// - 数据数量足够？
// - 时间跨度是否连续？
// ==================================================
export function isWindowValid(tbmId: string, minItems = 5): boolean {
  const window = getTbmWindow(tbmId);
  if (window.length < minItems) return false;

  const now = Date.now();
  const oldest = window[0].timestamp;

  // 时间跨度必须 < 2min
  if (now - oldest > 2 * 60 * 1000) return false;

  return true;
}

// ==================================================
// 删除 TBM 缓存（TBM 停工或解绑 tunnel）
// ==================================================
export function clearTbmWindow(tbmId: string) {
  TBM_WINDOWS.delete(tbmId);
}
