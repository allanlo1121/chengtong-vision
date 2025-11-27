// domain/tbm/preprocessing/ValuePreprocessor.ts

export interface PreprocessResult {
  ok: boolean;       // 数据是否可信
  value: number;     // 修正值（可能被替代）
  reason?: string;   // 不可信原因
}

export interface PreprocessOptions {
  maxJumpRatio?: number;     // 上一值 * x，例如 3x
  maxJumpAbs?: number;       // 最大绝对跳变，例如 50
  maxRatePerSec?: number;    // 每秒最大变化量
  smoothing?: "none" | "hold" | "ema";  // 平滑策略
  emaAlpha?: number;         // 指数平滑参数
}

export const defaultOptions: PreprocessOptions = {
  maxJumpRatio: 3,
  maxJumpAbs: 50,
  maxRatePerSec: 50,
  smoothing: "hold",
  emaAlpha: 0.2,
};

export function preprocessValue(
  prevValue: number | null,
  prevTs: number | null,
  newValue: number,
  newTs: number = Date.now(),
  opts: PreprocessOptions = defaultOptions
): PreprocessResult {
  if (prevValue == null || prevTs == null) {
    return { ok: true, value: newValue };
  }

  const dt = (newTs - prevTs) / 1000;
  if (dt <= 0) {
    return { ok: true, value: newValue };
  }

  const diff = Math.abs(newValue - prevValue);

  /* ===========================================================
     1) JumpGuard：跳变保护（瞬间从 20 → 120）
  ============================================================ */
  if (
    diff > (opts.maxJumpAbs || Infinity) ||
    (opts.maxJumpRatio && newValue > prevValue * opts.maxJumpRatio)
  ) {
    // 缓解策略
    if (opts.smoothing === "hold") {
      return {
        ok: false,
        value: prevValue,
        reason: `Spike detected: jump ${prevValue} → ${newValue}`,
      };
    }
    if (opts.smoothing === "ema") {
      const alpha = opts.emaAlpha ?? 0.2;
      return {
        ok: false,
        value: prevValue * (1 - alpha) + newValue * alpha,
        reason: `Spike corrected by smoothing (EMA)`,
      };
    }

    return { ok: false, value: prevValue, reason: "Spike detected" };
  }

  /* ===========================================================
     2) RateGuard：速率保护（变化太快）
  ============================================================ */
  const rate = diff / dt; // 每秒变化量

  if (opts.maxRatePerSec && rate > opts.maxRatePerSec) {
    return {
      ok: false,
      value: prevValue,
      reason: `Rate too high ${rate}/s`,
    };
  }

  return { ok: true, value: newValue };
}
