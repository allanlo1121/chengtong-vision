// thresholds/thresholdTypes.ts

import type { EventSeverity } from "../alarm-event.types";
/* ------------------------------
 * 阀值规则类型定义
 * ------------------------------ */

export interface ThresholdRuleStatic {
    type: "static";
    warning_low: number | null;
    warning_high: number | null;
    critical_low: number | null;
    critical_high: number | null;
    use_absolute: boolean;
}

export interface ThresholdRuleDelta {
    type: "delta";
    window_ms: number;
    delta_warning_abs: number;
    delta_critical_abs: number;
}

export type ThresholdRule = ThresholdRuleStatic | ThresholdRuleDelta;

/* ------------------------------
 * 单个参数的完整阀值配置
 * ------------------------------ */

export interface ThresholdProfile {
    param_id: string;
    param_code: string; // s100206003
    rules: ThresholdRule[];
}

/* ------------------------------
 * 事件输出（给 EventCollector）
 * ------------------------------ */

export interface ThresholdEvent {
    tbmId: string;
    paramCode: string;
    alarmType: "GUIDANCE" | "ADVANCE" | "SAFETY";
    severity: EventSeverity;
    value: number;
    message: string;
    timestamp: string;
    payload?: any;
}
