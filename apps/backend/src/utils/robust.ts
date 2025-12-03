// ===============================
//  类型定义
// ===============================

export interface Quantiles {
  Q05: number;
  Q10: number;
  Q50: number;
  Q90: number;
  Q95: number;
}

export interface FilteredResults {
  byQuantile: number[];
  byStd: number[];
}

export interface RemovedResults {
  byStd: number[];
}

export interface FluctuationResults {
  quantile: number;
  MAD: number;
  stdRange: number;
  hybrid: number;   // ⭐推荐
}

export interface FluctuationAnalysisResult {
  count: number;
  quantiles: Quantiles;
  MAD: number;
  mean: number;
  std: number;
  filtered: FilteredResults;
  removed: RemovedResults;
  fluctuation: FluctuationResults;
}

// ===============================
//  主函数 analyzeFluctuation
// ===============================

export function analyzeFluctuation(values: number[]): FluctuationAnalysisResult {
  if (!values || values.length === 0) {
    throw new Error("values cannot be empty");
  }

  const sorted = [...values].sort((a, b) => a - b);

  // ---------- 工具函数 ----------
  const quantile = (arr: number[], q: number): number => {
    const pos = (arr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;

    return arr[base + 1] !== undefined
      ? arr[base] + rest * (arr[base + 1] - arr[base])
      : arr[base];
  };

  const median = (arr: number[]): number => {
    const m = Math.floor(arr.length / 2);
    return arr.length % 2
      ? arr[m]
      : (arr[m - 1] + arr[m]) / 2;
  };

  const mean = (arr: number[]): number =>
    arr.reduce((a, b) => a + b, 0) / arr.length;

  const std = (arr: number[]): number => {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
  };

  // ---------- 分位数 ----------
  const Q05 = quantile(sorted, 0.05);
  const Q10 = quantile(sorted, 0.10);
  const Q50 = quantile(sorted, 0.50);
  const Q90 = quantile(sorted, 0.90);
  const Q95 = quantile(sorted, 0.95);

  const fluctQuantile = Q95 - Q05;

  // ---------- MAD ----------
  const deviations = sorted.map(v => Math.abs(v - Q50));
  const MAD = median(deviations) * 1.4826;

  // ---------- 均值/标准差 ----------
  const m = mean(values);
  const s = std(values);

  const filteredByStd = values.filter(v => Math.abs(v - m) <= 3 * s);
  const removedByStd = values.filter(v => Math.abs(v - m) > 3 * s);

  const fluctStd = Math.max(...filteredByStd) - Math.min(...filteredByStd);

  // ---------- 分位数过滤 ----------
  const filteredQuantile = values.filter(v => v >= Q05 && v <= Q95);

  // ---------- 综合稳健波动（推荐） ----------
  const fluctHybrid =
    (quantile(filteredQuantile, 0.90) - quantile(filteredQuantile, 0.10)) * 0.6 +
    MAD * 0.4;

  // ---------- 返回 ----------
  return {
    count: values.length,
    quantiles: { Q05, Q10, Q50, Q90, Q95 },
    MAD,
    mean: m,
    std: s,
    filtered: {
      byQuantile: filteredQuantile,
      byStd: filteredByStd,
    },
    removed: {
      byStd: removedByStd,
    },
    fluctuation: {
      quantile: fluctQuantile,
      MAD,
      stdRange: fluctStd,
      hybrid: fluctHybrid, // ⭐ 最推荐的波动指标
    },
  };
}
