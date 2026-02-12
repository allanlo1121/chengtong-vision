import { ThresholdRule } from "../types/ThresholdRule.js";

export interface RealdataPayload {
  tbm_id: string; // 必须字段

  // 动态字段，可无限扩展，不限制命名
  [paramCode: string]: number | string | boolean | null;
}

export enum Trend {
  Rising = "rising", // 上升
  Falling = "falling", // 下降
  Stable = "stable", // 平稳
}

/** Active 表字段类型 */
export interface ActiveStaticState {
  id?: string;
  tbm_id: string;
  param_code: string;
  severity: number;
  data_quality: number;
  value: number;
  recorded_at: string; // ISO 字符串格式
  trend?: Trend;
  rule?: ThresholdRule | null;
}
