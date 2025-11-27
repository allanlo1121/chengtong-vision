// processing/tbmEngine/tbmParamEngine.ts
import { processSpike } from "./spikeDetector.js";
import historyStore from "./historyStore.js";
import evaluateAbsolute from "./evaluateAbsolute.js";
import evaluateDelta from "./evaluateDelta.js";

import type {
  TbmPipelineInput,
  TbmParamResult,
  AbsoluteResult,
  DeltaResult,
} from "../../types/tbm/pipeline.types.js";
import type { Severity } from "../../types/tbm/tbm-param.types.js";

/**
 * TBM 参数实时计算引擎
 * --------------------------------------------------------
 * 处理：
 *  - Spike 清洗
 *  - 历史窗口 append
 *  - 绝对阈值计算
 *  - Δ 波动计算
 *  - severity 合并
 */

export function evaluateTbmParam(input: TbmPipelineInput): TbmParamResult | null {
  const { tbmId, param, value, ts, thresholdDefinition } = input;

  if (!tbmId || !param) return null;

  // 1. 获取历史窗口
  const history = historyStore.getHistory(tbmId, param);

  // 2. Spike 处理
  const cleanedValue = processSpike(history, value, ts);

  // 3. 写入历史（使用 cleanedValue）
  historyStore.append(tbmId, param, cleanedValue, ts);

  // 4. 绝对值阈值计算
  const abs: AbsoluteResult | null = evaluateAbsolute(cleanedValue, thresholdDefinition);

  // 5. Δ 波动阈值计算
  const delta: DeltaResult | null = evaluateDelta(tbmId, param, thresholdDefinition);

  // 6. 合并 severity
  const severity = mergeSeverity(abs?.severity, delta?.severity);

  // 7. 返回统一结构
  return {
    tbmId,
    param,
    ts,
    value: cleanedValue,
    severity,
    absolute: abs,
    delta,
  };
}

/**
 * severity 合并规则：
 * critical > warning > normal
 */
function mergeSeverity(a?: Severity, b?: Severity): Severity {
  const score = { normal: 0, warning: 1, critical: 2 };

  const sa = a ?? "normal";
  const sb = b ?? "normal";

  return score[sa] >= score[sb] ? sa : sb;
}

export default evaluateTbmParam;
