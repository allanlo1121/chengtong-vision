
import { ThresholdRuleDelta } from "@models/tbm/threshold.types";
import { SeverityLevel } from "@core/eventbus/types";

/**
 * 评估动态（Delta）阀值规则
 */
export function evaluateDeltaRule(
    deltaValue: number, // 当前值与窗口最早值的差
    rule: ThresholdRuleDelta
) {
    if (!rule) return { severity: 1 as SeverityLevel.Normal, range: { low: -10, high: 10 } };

    const absDelta = Math.abs(deltaValue);

    if (absDelta >= rule.delta_critical_abs) {
        return {
            severity: 3 as SeverityLevel.Critical,
            message: `变化量达到严重阀值 ±${rule.delta_critical_abs}`,
            range: { low: -rule.delta_critical_abs, high: rule.delta_critical_abs },
            delta: absDelta
        };
    }

    if (absDelta >= rule.delta_warning_abs) {
        return {
            severity: 2 as SeverityLevel.Warning,
            message: `变化量达到警告阀值 ±${rule.delta_warning_abs}`,
            range: { low: -rule.delta_warning_abs, high: rule.delta_warning_abs },
            delta: absDelta
        };
    }

    return { severity: 1 as SeverityLevel.Normal, range: { low: -10, high: 10 } };
}
