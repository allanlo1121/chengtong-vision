
/**
 * tbmParamPipeline.js
 * ----------------------------------------------------
 * TBM Parameter Engine 的总管道（Orchestrator）
 * 
 * 流程：
 *  1. 接收 handler 提供的原始 param/value/ts
 *  2. 调用 tbmParamEngine（Spike → 历史 → 阈值判断）
 *  3. 将结果交给：
 *      - thresholdEventsService（写入事件）
 *      - eventbus（通知其它模块）
 *      - notify handlers（微信、短信）
 *  4. 返回结构：
 *     {
 *        tbmId,
 *        param,
 *        severity,
 *        absolute,
 *        delta,
 *        value,
 *        ts
 *     }
 */



/**
 * 核心入口：
 * 由 tbmGuidanceDataHandler 或 tbmRealdataHandler 调用
 */
// processing/tbmEngine/tbmParamPipeline.js

import evaluateTbmParam from "./tbmParamEngine.js";
import thresholdEventsService from "../../services/thresholdEventsService.js";
import { publishEvent } from "../../eventbus/eventBus.js";
import guidanceNotifier from "../../tmp/alerts/guidanceDataNotifier.js"; // 暂时沿用
import { getGroupParamsLatest } from "./tbmParamGroups.js";

export async function processTbmParam({
  tbmId,
  param,
  value,
  ts,
  thresholdDefinition
}) {
  try {
    // 1) 执行 TBM 参数实时引擎
    const result = evaluateTbmParam({
      tbmId,
      param,
      value,
      ts,
      thresholdDefinition
    });

    if (!result) return null;

    // 2) 如果该参数属于某分组（如 guidance），组装其他参数的最新值
    const group = thresholdDefinition.group ?? null;
    if (group) {
      result.group = group;
      result.groupValues = getGroupParamsLatest(tbmId, group);
    }

    // 3) 写入数据库的超限表
    await thresholdEventsService.handle(result);

    // 4) 推送到 EventBus
    publishEvent("tbm.param.evaluated", result);

    // 5) 通知（短信/微信） — 暂时保留
    guidanceNotifier.handle(result);

    return result;

  } catch (err) {
    console.error("[tbmParamPipeline] Error:", err);
    return null;
  }
}

export default { processTbmParam };
