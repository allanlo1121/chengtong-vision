/**
 * 绝对阈值（低/高 + warning/critical）
 */
export interface ThresholdRanges {
  warning_low?: number;
  warning_high?: number;
  critical_low?: number;
  critical_high?: number;
}

/**
 * 波动阈值 Δ
 */
export interface DeltaThresholds {
  delta_warning?: number;
  delta_critical?: number;
}

/**
 * Pipeline 使用的统一阈值结构
 */
export interface ThresholdDefinition {
  param: string;
  ranges?: ThresholdRanges;       // 绝对值判断
  thresholds?: DeltaThresholds;   // Δ 判断
  group?: string;                 // guidance / thrust / torque 等
  description?: string;           // 参数名，可选
}
