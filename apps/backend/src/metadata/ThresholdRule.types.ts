export interface ThresholdRule {
  id: string;

  // 参数代码（单参数 = s100206003, 分组 = s100206000）
  param_code: string;

  // static | delta | trend | expression | group
  rule_type: string;

  // 阀值等级（1=warning, 2=major, 3=critical…）
  level: number;

  // 用于 delta / window 型规则
  window_ms: number;

  // 静态阀值
  low: number | null;
  high: number | null;

  // 是否对静态值取绝对值 (group 和偏差类参数常用)
  use_absolute: boolean;

  // 表达式规则
  expression: string | null;

  // 是否启用（即这个规则是否参与 evaluate 流程）
  is_active: boolean;

  // 是否报警通知（即是否触发 alarm/start/update/end 事件）
  is_alarm: boolean;

  // 排序（多个level时按level升序）
  sort_order: number;

  // group 扩展策略（group 参数时才有效）
  compute_strategy?: "max_abs" | "max_value" | "avg" | "custom";
  severity_strategy?: "max_child" | "weighted" | "custom";

  // 来源 = global or tbm override（由 service 填充）
  source?: "global" | "override";

  // TBM 专属覆盖规则时标记
  tbm_id?: string | null;
}
