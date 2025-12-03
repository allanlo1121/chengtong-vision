// thresholds/thresholdEvaluator.ts

import type {
    ThresholdRule,
    ThresholdRuleStatic,
    ThresholdRuleDelta,

} from "@/models/tbm/threshold.types";

import { EventSeverity, EventParameterDetail } from "@core/eventbus/types";

//import { getRealdataWindow } from "@/cache/realdataWindowCache";

/* ------------------------------
 * 判定静态阀值
 * ------------------------------ */
export function evaluateStaticRule(
    value: number,
    rule: ThresholdRuleStatic
): Pick<EventParameterDetail, "value" | "severity" | "range"> {
    const v = rule.use_absolute ? Math.abs(value) : value;

    //console.log("evaluateStaticRule", v, rule);


    if (
        rule.critical_low !== null &&
        v < rule.critical_low
    ) return { value, severity: 3, range: { low: rule.critical_low, high: rule.critical_high || rule.critical_low, } };
    if (
        rule.critical_high !== null &&
        v > rule.critical_high
    ) return { value, severity: 3, range: { low: rule.critical_low || 0, high: rule.critical_high } };
    if (
        rule.warning_low !== null &&
        v < rule.warning_low
    ) return { value, severity: 2, range: { low: rule.warning_low, high: rule.warning_high || rule.warning_low } };
    if (
        rule.warning_high !== null &&
        v > rule.warning_high
    ) return { value, severity: 2, range: { low: rule.warning_low || 0, high: rule.warning_high } };
    return { value, severity: 1, range: { low: rule.warning_low || 0, high: rule.warning_high || 0 } };
}

/* ------------------------------
 * 判定动态 delta 阀值（10min / 5min 波动）
 * ------------------------------ */
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


/**
 * 评估动态（Delta）阀值规则
 */
// export function evaluateDeltaRule(
//     deltaValue: number, // 当前值与窗口最早值的差
//     rule: ThresholdRuleDelta
// ) {
//     if (!rule) return { severity: null };

//     const absDelta = Math.abs(deltaValue);

//     if (absDelta >= rule.delta_critical_abs) {
//         return {
//             severity: "critical" as EventSeverity,
//             message: `变化量达到严重阀值 ±${rule.delta_critical_abs}`,
//             delta: absDelta
//         };
//     }

//     if (absDelta >= rule.delta_warning_abs) {
//         return {
//             severity: "warning" as EventSeverity,
//             message: `变化量达到警告阀值 ±${rule.delta_warning_abs}`,
//             delta: absDelta
//         };
//     }

//     return { severity: null };
// }
