// domain/tbm/preprocessing/ValuePreprocessor.ts

export interface PreprocessResult {
  ok: boolean;
  value: number;
  reason?: string;
}

export interface PreprocessOptions {
  maxJumpRatio?: number;   // newValue > prev * ratio 视为异常
  maxJumpAbs?: number;     // abs(new - prev) 超过绝对跳变视为异常
  maxRatePerSec?: number;  // 每秒最大变化速率
}

export const defaultOptions: PreprocessOptions = {
  maxJumpRatio: 3,
  maxJumpAbs: 50,
  maxRatePerSec: 50,
};


/**
 * 单点跳变 & 速率保护（无平滑）
 */
export function preprocessValue(
  prevValue: number | null,
  prevTs: number | null,
  newValue: number,
  newTs: number = Date.now(),
  opts: PreprocessOptions = defaultOptions
): PreprocessResult {

  // 第一次数据 → 必然可信
  if (prevValue == null || prevTs == null) {
    return { ok: true, value: newValue };
  }

  const dt = (newTs - prevTs) / 1000;
  if (dt <= 0) {
    return { ok: true, value: newValue };
  }

  const diff = Math.abs(newValue - prevValue);

  /* ===============================
         1) JumpGuard 跳变保护
     =============================== */
  if (
    diff > (opts.maxJumpAbs || Infinity) ||
    (opts.maxJumpRatio && newValue > prevValue * opts.maxJumpRatio)
  ) {
    return {
      ok: false,
      value: prevValue,      // 不可信 → 使用上一值
      reason: `Spike detected: ${prevValue} → ${newValue}`,
    };
  }

  /* ===============================
         2) RateGuard 速率保护
     =============================== */
  const rate = diff / dt;
  if (opts.maxRatePerSec && rate > opts.maxRatePerSec) {
    return {
      ok: false,
      value: prevValue,
      reason: `Rate too high: ${rate}/s (${prevValue} → ${newValue})`,
    };
  }

  return { ok: true, value: newValue };
}
