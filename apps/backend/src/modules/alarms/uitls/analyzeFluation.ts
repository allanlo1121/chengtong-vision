// ===============================
//  类型定义
// ===============================

import { FluctuationAnalysis } from "../types/DataQuality.types.js";

export interface Quantiles {
  Q05: number;
  Q10: number;
  Q50: number;
  Q90: number;
  Q95: number;
}

export interface FluctuationMetrics {
  quantileRange: number; // 95% - 5%
  MAD: number; // 中位绝对偏差鲁棒离散度
  stdRange: number; // 标准差范围
  trimmedMean: number; // 去极值均值
  meanShift: number; // 新值偏离均值的程度
  stepRange: number; // 跳变幅度 max-min
  hybridEnhanced: number; // ⭐最终综合波动
}

// export interface FluctuationAnalysis {
//   count: number;
//   quantiles: Quantiles;
//   mean: number;
//   std: number;
//   metrics: FluctuationMetrics;
// }

// ===============================
//   主函数 analyzeFluctuation
// ===============================

export function analyzeFluctuation(values: number[]): FluctuationAnalysis | null {
  if (!values || values.length === 0) {
    console.log("analyzeFluctuation values cannot be empty");
    return null;
  }

  const sorted = [...values].sort((a, b) => a - b);

  // ---------- 工具函数 ----------
  const quantile = (arr: number[], q: number): number => {
    const pos = (arr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    return arr[base + 1] !== undefined ? arr[base] + rest * (arr[base + 1] - arr[base]) : arr[base];
  };

  const median = (arr: number[]): number => {
    const m = Math.floor(arr.length / 2);
    return arr.length % 2 ? arr[m] : (arr[m - 1] + arr[m]) / 2;
  };

  const mean = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

  const std = (arr: number[]): number => {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
  };

  // ---------- 分位数 ----------
  const Q05 = quantile(sorted, 0.05);
  const Q10 = quantile(sorted, 0.1);
  const Q50 = quantile(sorted, 0.5);
  const Q90 = quantile(sorted, 0.9);
  const Q95 = quantile(sorted, 0.95);

  const quantileRange = Q95 - Q05;

  // ---------- MAD（鲁棒离散度） ----------
  const deviations = sorted.map((v) => Math.abs(v - Q50));
  const MAD = median(deviations) * 1.4826; // 1.4826 用于正态分布一致性

  // ---------- 标准差 ----------
  const m = mean(values);
  const s = std(values);
  const stdRange = Math.max(...values) - Math.min(...values); // 简化为极差即可

  // ---------- 去极值均值（Trimmed Mean） ----------
  const trim = Math.floor(sorted.length * 0.05); // 去掉5%
  const trimmed = sorted.slice(trim, sorted.length - trim);
  const trimmedMean = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

  // ---------- 均值偏移（Mean Shift） ----------
  const lastValue = values[values.length - 1];
  const meanShift = Math.abs(lastValue - trimmedMean);

  // ---------- 跳变幅度 Step Range ----------
  const stepRange = Math.max(...values) - Math.min(...values);

  // ---------- 综合增强波动（最终指标） ----------
  const hybridEnhanced = Math.max(
    quantileRange * 0.4,
    MAD * 0.4,
    stdRange * 0.3,
    meanShift * 0.5,
    stepRange * 0.7 // ⭐跳变幅度权重最高
  );

  // ---------- 返回 ----------
  return {
    count: values.length,
    mean: m,
    std: s,
    min: Math.min(...values),
    max: Math.max(...values),
    quantileRange,
    range: stdRange,
    trimmedMean,
    MAD,
    deltaMean: meanShift,
    stepRange,
    robustScore: hybridEnhanced, // ⭐ 最终你应该使用这个
  };
}
