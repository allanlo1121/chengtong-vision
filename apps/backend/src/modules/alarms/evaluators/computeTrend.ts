import { Trend } from "../types/ActiveState.js";

export function computeTrend(
  prevValue: number | null,
  value: number,
  recentValues: number[] = [],
  useAbsolute: boolean = true
): Trend {
  // ① 应用绝对值模式（用于偏差类参数）
  const v = useAbsolute ? Math.abs(value) : value;
  const pv = prevValue != null ? (useAbsolute ? Math.abs(prevValue) : prevValue) : null;

  const series = useAbsolute ? recentValues.map(Math.abs) : recentValues;

  const hasWindow = series && series.length >= 3;
  const hasPrev = pv != null;

  // ---------------------------
  // ① 有窗口数据 → 优先使用窗口均值判断趋势
  // ---------------------------
  if (hasWindow) {
    const mean = series.reduce((a, b) => a + b, 0) / series.length;
    const delta = v - mean;

    const std = computeStd(series);
    const threshold = Math.max(0.5, std * 0.3);

    if (Math.abs(delta) <= threshold) return Trend.Stable;
    return delta > 0 ? Trend.Rising : Trend.Falling;
  }

  // ---------------------------
  // ② 无窗口数据，但 prevValue 存在 → 基于 prevValue 判断趋势
  // ---------------------------
  if (hasPrev) {
    const delta = v - pv;
    const threshold = 0.5;

    if (Math.abs(delta) <= threshold) return Trend.Stable;
    return delta > 0 ? Trend.Rising : Trend.Falling;
  }

  // ---------------------------
  // ③ 无 prev + 无窗口 → 趋势未知，定义为 Stable
  // ---------------------------
  return Trend.Stable;
}

function computeStd(arr: number[]) {
  if (!arr || arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}
