/** 数据质量类型 */
export enum DataQuality {
  Normal = 0,
  Missing = 1,
  Noisy = 2,
  Outlier = 3,
}

export interface FluctuationAnalysis {
  mean: number;
  std: number;
  min: number;
  max: number;
  range: number;
  quantileRange: number;
  robustScore: number;
  trimmedMean: number;
  deltaMean: number;
  stepRange: number;
  MAD: number;
  count: number;
}

export interface JumpAnalysisResult {
  delta: number; // 当前差值
  pctChange: number | null; // 当前百分比变化
  slopeSpike: number; // 当前斜率与历史斜率比值
  deltaVsMeanDelta: number; // 当前差值 vs 平均差值比值
  deltaVsStd: number; // 当前差值 vs 标准差
  deltaVsIQR: number; // 当前差值 vs 四分位距
  isJump: boolean; // 是否检测到跳变
  reasons: string[]; // 哪些规则命中
}

export interface DataQualityResult {
  quality: number;
  fluctuation: FluctuationAnalysis | null;
  jump: JumpAnalysisResult | null;
}
