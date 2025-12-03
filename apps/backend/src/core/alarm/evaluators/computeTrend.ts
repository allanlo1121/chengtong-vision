
import { Trend } from "../types/ActiveState.js";

export function computeTrend(
    prevValue: number | null,
    value: number,
    recentValues: number[] = []
): Trend {
    // 没有 prevValue → 没法判断趋势
    if (prevValue == null) return Trend.Stable;

    const delta = value - prevValue;

    // 动态阈值：波动越大，阈值越宽
    const std = computeStd(recentValues);
    const threshold = Math.max(0.5, std * 0.3);

    if (Math.abs(delta) <= threshold) return Trend.Stable;
    return delta > 0 ? Trend.Rising : Trend.Falling;
}

function computeStd(arr: number[]) {
    if (!arr || arr.length < 2) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance =
        arr.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
        arr.length;
    return Math.sqrt(variance);
}
