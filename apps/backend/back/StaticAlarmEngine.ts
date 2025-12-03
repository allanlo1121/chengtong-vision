import { ActiveRepo } from "../reposistory/activeRepo.js";
import { computeDataQuality } from "../evaluators/computerDataQuality.js";
import { computeAlarmLevel } from "../evaluators/computerAlarmLevel.js";

import { ActiveState } from "../types/ActiveState.js";
import { AlarmContext } from "../types/AlarmContext.js";
import { Severity } from "../types/Severity.js";


export class AlarmEngine {

  /** 外部调用入口 */
  async evaluate(ctx: AlarmContext) {
    try {
      return await this._evaluateInternal(ctx);
    } catch (err) {
      console.error(
        "❌ AlarmEngine exception:",
        JSON.stringify(
          {
            paramCode: ctx.paramCode,
            rule: ctx.rule,
            value: ctx.value,
            recentValues: ctx.recentValues,
            payload: ctx.payload,
            error: err,
          },
          null,
          2
        )
      );
      throw err;
    }
  }


  /** 内部处理逻辑 */
  private async _evaluateInternal(ctx: AlarmContext) {
    const {
      tbmId,
      ringNo,
      paramCode,
      rule,
      value,
      recentValues = [],
      payload
    } = ctx;

    // -----------------------------------------------------------------------------
    // 1. 数据质量 + 动态波动值
    // -----------------------------------------------------------------------------
    const { quality: data_quality, deltaValue } = computeDataQuality(
      value,
      recentValues
    );

    // 统一输入值（static → value, delta → deltaValue）
    const inputValue =
      rule.type === "static" ? value : deltaValue;

    // -----------------------------------------------------------------------------
    // 2. 计算报警等级（computeAlarmLevel 必须自己兜底 null）
    // -----------------------------------------------------------------------------
    const { severity, level } = computeAlarmLevel(
      inputValue,
      rule
    );

    // -----------------------------------------------------------------------------
    // 3. 获取之前的 active 状态
    // -----------------------------------------------------------------------------
    const prev = await ActiveRepo.get(
      tbmId,
      paramCode,
      rule.type,
      rule.window_ms ?? 0
    );

    // -----------------------------------------------------------------------------
    // 4. 构造新的 ActiveState
    // -----------------------------------------------------------------------------
    const next: ActiveState = {
      tbm_id: tbmId,
      ring_no: ringNo ?? null,
      param_code: paramCode,
      rule_type: rule.type,
      window_ms: rule.window_ms ?? 0,

      severity,
      level,
      data_quality,

      value,
      delta_value: deltaValue ?? null,
      payload: payload ?? null,
    };

    // console.log("next",next);

    // -----------------------------------------------------------------------------
    // 5. 状态迁移
    // -----------------------------------------------------------------------------
    return await this.applyState(prev, next);
  }



  /** 状态迁移：Normal → Active / Active → Normal */
  private async applyState(prev: ActiveState | null, next: ActiveState) {

    // 🟢 severity 回到 Normal → 删除 active
    if (next.severity === Severity.Normal) {
      if (prev) {
        await ActiveRepo.delete(next); // 自动触发 end event
      }
      return { changed: !!prev, next };
    }

    // ---------------------------------------------------------------------
    // ② 现在是 active（severity > 0）
    // 只有当“状态真的改变”才 upsert
    // 状态定义：severity + level
    // ---------------------------------------------------------------------
    const stateChanged =
      !prev ||
      prev.severity !== next.severity ||
      prev.level !== next.level;

    if (!stateChanged) {
      // ⭐ 状态没变 → 不触发事件，不更新 active
      //    但要保留第一次报警时 snapshot（payload）
      next.payload = prev?.payload ?? next.payload;

      return { changed: false, next, updated: null };
    }

    // ---------------------------------------------------------------------
    // ③ 状态变化 → upsert（触发 start 或 update）
    // ---------------------------------------------------------------------
    const updated = await ActiveRepo.upsert(next);

    return { changed: true, next, updated };
  }
}
