import { detectJumpAll } from "../uitls/detectJunmpAll.js";
import { computeJumpQuality } from "../uitls/computeJumpQuality.js";
import { DataQualityResult, FluctuationAnalysis } from "../types/DataQuality.types.js";
import { analyzeFluctuation } from "../uitls/analyzeFluation.js";

export function computeDataQuality(value: number | null, values: number[]): DataQualityResult {
  // 1) 缺失值 —— 直接返回 Missing
  if (value == null) {
    return {
      quality: 4, // 或 DataQuality.Missing
      fluctuation: {
        mean: 0,
        std: 0,
        min: 0,
        max: 0,
        range: 0,
        quantileRange: 0,
        robustScore: 0,
        trimmedMean: 0,
        deltaMean: 0,
        stepRange: 0,
        MAD: 0,
        count: 0,
      },
      jump: {
        delta: 0,
        pctChange: null,
        slopeSpike: 0,
        deltaVsMeanDelta: 0,
        deltaVsStd: 0,
        deltaVsIQR: 0,
        isJump: false,
        reasons: [],
      },
    };
  }

  const lastValue = values[values.length - 1];

  // 2) 基础波动统计
  const metricsBase: FluctuationAnalysis = analyzeFluctuation(values);

  // 3) 跳变算法
  const jumpResult = detectJumpAll(value, values);

  // 4) 得到跳变质量等级
  const jumpQuality = computeJumpQuality(jumpResult);

  // 5) 返回最终结构
  return {
    quality: jumpQuality,
    fluctuation: metricsBase,
    jump: jumpResult,
  };
}
