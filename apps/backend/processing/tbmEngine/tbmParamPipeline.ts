// processing/tbmEngine/tbmParamPipeline.ts
import evaluateTbmParam from "./tbmParamEngine.js";
import { publishEvent } from "../../eventbus/eventBus.js";
import * as thresholdEventsService from "../../services/thresholdEventsService.js";
import paramGroups from "./paramGroups.js"; // { guidance: ["003","004"...] }

import type {
  TbmPipelineInput,
  TbmParamResult,
} from "../../types/tbm/pipeline.types.js";

/**
 * 主入口：处理一个 TBM 参数
 * --------------------------------------------------
 * 包含：
 *  - 调用引擎 evaluateTbmParam
 *  - 合并参数分组（如导向）
 *  - 写入 realtime_threshold_events
 *  - 发布 EventBus 事件
 */

export async function processTbmParam(
  input: TbmPipelineInput
): Promise<TbmParamResult | null> {
  const result = evaluateTbmParam(input);
  if (!result) return null;

  // 1. 合并 group（如 guidance）
  const withGroup = mergeGroupValues(result);

  // 2. 写入数据库 realtime_threshold_events
  await thresholdEventsService.recordThresholdEvent(withGroup);

  // 3. 发送 EventBus（给 notify handler）
  publishEvent("tbm.param.evaluated", withGroup);

  return withGroup;
}

/**
 * 合并同组参数（如导向偏差）
 */
function mergeGroupValues(result: TbmParamResult): TbmParamResult {
  const group = detectParamGroup(result.param);
  if (!group) return result;

  const paramsInGroup = paramGroups[group];
  const groupValues: Record<string, number> = {};

  for (const p of paramsInGroup) {
    const val = getLatestValue(result.tbmId, p);
    if (val != null) groupValues[p] = val;
  }

  return {
    ...result,
    group,
    groupValues,
  };
}

/**
 * 根据参数名判断所属 group
 */
function detectParamGroup(param: string): string | null {
  for (const [group, params] of Object.entries(paramGroups)) {
    if (params.includes(param)) return group;
  }
  return null;
}

/**
 * 从历史窗口获取最新值
 */
function getLatestValue(
  tbmId: string,
  param: string
): number | null {
  try {
    const historyModule = require("./historyStore.js").default;
    const list = historyModule.getHistory(tbmId, param);

    if (!list || list.length === 0) return null;
    return list[list.length - 1].value;
  } catch {
    return null;
  }
}

export default processTbmParam;
