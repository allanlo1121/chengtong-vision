import { ThresholdDefinition } from "./threshold.types.js";
import { Severity } from "./tbm-param.types.js";

export interface TbmPipelineInput {
  tbmId: string;
  param: string;
  value: number;
  ts: number;
  thresholdDefinition: ThresholdDefinition;
}

/**
 * Absolute 计算结果
 */
export interface AbsoluteResult {
  severity: Severity;
  threshold: number | null;
  range: [number, number] | null;
}

/**
 * Delta 计算结果
 */
export interface DeltaResult {
  severity: Severity;
  deltaValue: number;
}

/**
 * 最终引擎输出
 */
export interface TbmParamResult {
  tbmId: string;
  param: string;
  ts: number;
  value: number;

  severity: Severity;

  absolute?: AbsoluteResult | null;
  delta?: DeltaResult | null;

  group?: string;
  groupValues?: Record<string, number>; // guidance: all X/Y
}
