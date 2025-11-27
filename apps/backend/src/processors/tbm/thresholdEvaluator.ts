// // thresholds/thresholdEvaluator.ts

// import type {
//     ThresholdRule,
//     ThresholdRuleStatic,
//     ThresholdRuleDelta,
//     EventSeverity,
// } from "./thresholdTypes";

// import { getRealdataWindow } from "@/cache/realdataWindowCache";

// /* ------------------------------
//  * 判定静态阀值
//  * ------------------------------ */
// export function evaluateStaticRule(
//     value: number,
//     rule: ThresholdRuleStatic
// ): EventSeverity | null {
//     const v = rule.use_absolute ? Math.abs(value) : value;

//     if (
//         rule.critical_low !== null &&
//         v < rule.critical_low
//     ) return "critical";
//     if (
//         rule.critical_high !== null &&
//         v > rule.critical_high
//     ) return "critical";

//     if (
//         rule.warning_low !== null &&
//         v < rule.warning_low
//     ) return "warning";
//     if (
//         rule.warning_high !== null &&
//         v > rule.warning_high
//     ) return "warning";

//     return null;
// }

// /* ------------------------------
//  * 判定动态 delta 阀值（10min / 5min 波动）
//  * ------------------------------ */
// export function evaluateDeltaRule(
//     tbmId: string,
//     paramCode: string,
//     currentValue: number,
//     rule: ThresholdRuleDelta
// ): EventSeverity | null {
//     const windowData = getRealdataWindow(tbmId, paramCode, rule.window_ms);
//     if (windowData.length < 2) return null;

//     const lastValue = windowData[windowData.length - 2];

//     const delta = Math.abs(currentValue - lastValue);

//     if (delta >= rule.delta_critical_abs) return "critical";
//     if (delta >= rule.delta_warning_abs) return "warning";
//     return null;
// }

// /* ------------------------------
//  * 主规则匹配：根据规则类型分派
//  * ------------------------------ */
// export function evaluateRule(
//     tbmId: string,
//     paramCode: string,
//     value: number,
//     rule: ThresholdRule
// ): EventSeverity | null {
//     if (rule.type === "static") {
//         return evaluateStaticRule(value, rule);
//     }
//     if (rule.type === "delta") {
//         return evaluateDeltaRule(tbmId, paramCode, value, rule);
//     }
//     return null;
// }
