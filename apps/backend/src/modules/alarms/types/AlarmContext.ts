import { ThresholdRule } from "../../../metadata/ThresholdRule.types.js";

import { Trend } from "./ActiveState.js";

export interface RealdataPayload {
  tbm_id: string; // 必须字段

  // 动态字段，可无限扩展，不限制命名
  [paramCode: string]: number | string | boolean | null;
}

/** 传入 evaluate 的上下文数据 */
export interface AlarmContext {
  paramCode: string;
  value: number;
  ruleType: string;
  rules: ThresholdRule[];
  prevValue: number | null;
  recentValues?: number[]; // 用于滑动窗口类规则
  recordedAt: string;
}

export interface ConnectivityContext {
  tbmId: string;
  paramCode: string;
  value: number | null;
  timestamp: string;
  payload?: RealdataPayload;
}

export interface AlarmEvalResult {
  hit: boolean;
  severity: number;
  type?: string;
  range?: { low: number | null; high: number | null } | null;
}
export interface AlarmResult extends BaseCode {
  severity: number;
  quality: number;
  trend: Trend;
}

export interface BaseCode {
  paramCode: string;
  value: number;
}

export interface baseCodePayload extends BaseCode {
  tbmId: string;
  recordedAt: string;
}

export interface BaseAlarmPayload extends baseCodePayload {
  ruleType: string;
  rules: ThresholdRule[];
}

export interface GroupEnhancedPayload extends BaseAlarmPayload {
  members?: BaseCode[]; // 仅组参数包含
}
