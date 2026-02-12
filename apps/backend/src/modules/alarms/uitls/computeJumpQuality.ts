import { JumpAnalysisResult } from "../types/DataQuality.types.js";

export function computeJumpQuality(jump: JumpAnalysisResult): number {
  const { delta, slopeSpike, deltaVsStd, deltaVsIQR, reasons } = jump;

  // 4 = 严重异常（Outlier）
  if (Math.abs(delta) > 100 || slopeSpike > 20 || deltaVsStd > 10 || deltaVsIQR > 10) return 4;

  // 3 = 强突变（Spike）
  if (Math.abs(delta) > 50 || slopeSpike > 10 || deltaVsStd > 5 || deltaVsIQR > 6) return 3;

  // 2 = 中度异常（Noisy）
  if (Math.abs(delta) > 20 || slopeSpike > 5 || deltaVsStd > 3 || deltaVsIQR > 4) return 2;

  // 1 = 轻度波动（Slight）
  if (Math.abs(delta) > 10 || slopeSpike > 2) return 1;

  // 0 = 正常
  return 0;
}
