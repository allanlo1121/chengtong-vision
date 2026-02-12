import { type ThresholdRule } from "../../../metadata/ThresholdRule.types.js";
import { AlarmEvalResult } from "../types/AlarmContext.js";

export function evaluateStatic(value: number, rules: ThresholdRule[]): AlarmEvalResult {
  //console.log("evaluateStatic",value,rules);

  // ⭐ 高等级优先
  const sorted = [...rules].sort((a, b) => b.level - a.level);

  for (const rule of sorted) {
    if (rule.low !== null && value < rule.low) {
      return {
        hit: true,
        severity: rule.level,
        type: "static_low",
        range: { low: rule.low, high: rule.high },
      };
    }

    if (rule.high !== null && value > rule.high) {
      return {
        hit: true,
        severity: rule.level,
        type: "static_high",
        range: { low: rule.low, high: rule.high },
      };
    }
  }
  // ⭐ NORMAL 阀值范围（使用最小 level 的规则）
  const baseRule = [...rules].sort((a, b) => a.level - b.level)[0];

  return {
    hit: false,
    severity: 0,
    type: "static_normal",
    range: {
      low: baseRule?.low ?? null,
      high: baseRule?.high ?? null,
    },
  };
}
