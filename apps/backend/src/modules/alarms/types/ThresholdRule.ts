export interface ThresholdRule {
  type: "static" | "delta";

  window_ms: number; // static = 0, delta > 0
  step: number; // warning level 步进（新加）

  warning_low: number | null;
  warning_high: number | null;

  critical_low: number | null;
  critical_high: number | null;
  use_absolute?: boolean;
}

export interface ThresholdProfile {
  param_id: string;
  param_code: string; // s100206003
  sub_system: string | null; // TBM Subsystem
  rules: ThresholdRule[];
}
