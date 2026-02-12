import { evaluateStatic } from "../evaluators/staticEvaluator.js";
import { AlarmContext, AlarmEvalResult, AlarmResult } from "../types/AlarmContext.js";
import { computeDataQuality } from "../evaluators/computeDataQuality.js";
import { computeTrend } from "../evaluators/computeTrend.js";

export class AlarmEngine {
  static async evaluate(ctx: AlarmContext) {
    try {
      return await this._evaluateInternal(ctx);
    } catch (err) {
      console.error("❌ AlarmEngine exception:", {
        paramCode: ctx.paramCode,
        value: ctx.value,
        prevValue: ctx.prevValue,
        // recordedAt: ctx.recordedAt,
        error: err,
      });
      throw err;
    }
  }

  /** 内部处理逻辑（核心引擎） */
  private static async _evaluateInternal(ctx: AlarmContext): Promise<AlarmResult> {
    const {
      paramCode,
      value,
      prevValue,
      recentValues,
      ruleType,
      rules,
      // recordedAt
    } = ctx;

    //console.log("[AlarmEngine] evaluate", paramCode, value);

    // --------------------------------------------------------
    // ① 数据预处理（所有规则共用）
    // --------------------------------------------------------
    const dataQuality = computeDataQuality(value, recentValues);
    const trend = computeTrend(prevValue, value, recentValues);

    // --------------------------------------------------------
    // ② 根据 ruleType 调用不同策略
    // --------------------------------------------------------
    let thresholdResult: AlarmEvalResult = null;

    switch (ruleType) {
      case "static":
        thresholdResult = evaluateStatic(value, rules);
        break;

      case "delta":
        // thresholdResult = evaluateDelta(value, prevValue, recentValues, rules);
        break;

      // case "trend":
      //   thresholdResult = evaluateTrendRule(value, recentValues, rules);
      //   break;

      // case "expression":
      //   thresholdResult = evaluateExpression(value, ctx, rules);
      //   break;

      // case "group":
      //   thresholdResult = evaluateGroup(ctx);
      //   break;

      default:
        throw new Error(`Unsupported ruleType: ${ruleType}`);
    }

    // evaluateXXX 返回结构约定：
    // {
    //   severity: number
    //   level: number | null
    //   range: { low, high } | null
    // }

    // --------------------------------------------------------
    // ③ 组装统一格式结果（供事件生成使用）
    // --------------------------------------------------------
    return {
      paramCode: paramCode,
      value: value,
      quality: dataQuality.quality,
      trend: trend,
      severity: thresholdResult.severity,
    };
  }

  /** 统一结果封装（返回 event + activeState） */
  // private static wrapResult(result: any, ctx: AlarmContext, rules: any[], dataQuality: number, trend: Trend): ActiveStaticState {
  //   const { tbmId, paramCode, value, occurred_at } = ctx;

  //   // 使用命中的最高等级规则
  //   const matchedRule = rules.find(r => r.level === result.severity) ?? rules[0];

  //   return {

  //     tbm_id: tbmId,
  //     param_code: paramCode,
  //     severity: result.severity,
  //     value,
  //     occurred_at,
  //     data_quality: dataQuality,
  //     trend,
  //     rule: matchedRule

  //   };
  // }
}
