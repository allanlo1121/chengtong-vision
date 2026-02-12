import { JumpAnalysisResult } from "../types/DataQuality.types.js";

export function detectJumpAll(value: number, values: number[]): JumpAnalysisResult {
  if (!values || values.length < 2) {
    return {
      delta: 0,
      pctChange: null,
      slopeSpike: 0,
      deltaVsMeanDelta: 0,
      deltaVsStd: 0,
      deltaVsIQR: 0,
      isJump: false,
      reasons: [],
    };
  }

  const lastValue = values[values.length - 1];
  const delta = value - lastValue;
  const deltas = [];

  for (let i = 1; i < values.length; i++) {
    deltas.push(values[i] - values[i - 1]);
  }

  const meanDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  const pctChange = lastValue !== 0 ? delta / lastValue : null;

  const std = computeStd(values);
  const iqr = computeIQR(values);

  const slopeSpike = meanDelta !== 0 ? delta / meanDelta : Infinity;
  const deltaVsMeanDelta = meanDelta !== 0 ? Math.abs(delta) / Math.abs(meanDelta) : Infinity;
  const deltaVsStd = std !== 0 ? Math.abs(delta) / std : Infinity;
  const deltaVsIQR = iqr !== 0 ? Math.abs(delta) / iqr : Infinity;

  // -------------------------
  // 命中规则汇总
  // -------------------------
  const reasons = [];

  if (Math.abs(delta) > 50) reasons.push("delta > 50");
  if (pctChange !== null && Math.abs(pctChange) > 0.5) reasons.push("pctChange > 50%");
  if (Math.abs(slopeSpike) > 10) reasons.push("slope spike > 10x");
  if (deltaVsStd > 5) reasons.push("delta > 5 * std");
  if (deltaVsIQR > 6) reasons.push("delta > 6 * IQR");
  if (deltaVsMeanDelta > 8) reasons.push("delta > 8 * meanDelta");

  return {
    delta,
    pctChange,
    slopeSpike,
    deltaVsMeanDelta,
    deltaVsStd,
    deltaVsIQR,
    isJump: reasons.length > 0,
    reasons,
  };
}

function computeStd(arr: number[]) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function computeIQR(arr: number[]) {
  const sorted = [...arr].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  return q3 - q1;
}
