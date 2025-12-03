import { ActiveRepo } from "../reposistory/activeRepo.js";
import { handleAlarmEvent } from "../reposistory/activeEvent.js";
import { computeDataQuality } from "../evaluators/computeDataQuality.js";
import { computeAlarmLevel } from "../evaluators/computeAlarmLevel.js";
import { computeTrend } from "../evaluators/computeTrend.js";
import {  computeEventTopic } from "../evaluators/computeEventTopic.js";

import { ActiveStaticState } from "../types/ActiveState.js";
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

    // console.log("evaluateEventUpdate",paramCode,rule);

    // -----------------------------------------------------------------------------
    // 1. 数据质量 + 动态波动值
    // -----------------------------------------------------------------------------
    const data_quality = computeDataQuality(
      value,
      recentValues
    );


    // -----------------------------------------------------------------------------
    // 2. 计算报警等级（computeAlarmLevel 必须自己兜底 null）
    // -----------------------------------------------------------------------------
    const { severity, level } = computeAlarmLevel(
      value,
      rule
    );

    // -----------------------------------------------------------------------------
    // 3. 获取之前的 active 状态
    // -----------------------------------------------------------------------------
    const prev = await ActiveRepo.get(
      tbmId,
      paramCode
    );

    const trend = computeTrend(
      prev?.value ?? null,
      value,
      recentValues
    );

    // -----------------------------------------------------------------------------
    // 4. 构造新的 ActiveState
    // -----------------------------------------------------------------------------
    const next: ActiveStaticState = {
      tbm_id: tbmId,
      ring_no: ringNo ?? null,
      param_code: paramCode,

      severity,
      level,
      data_quality,
      value,
      trend,

      payload: payload ?? null,
      rule: rule ?? null
    };

    // console.log("next",next);

    // -----------------------------------------------------------------------------
    // 5. 状态迁移
    // -----------------------------------------------------------------------------
    return await this.applyState(prev, next);
  }




  /** 状态迁移：Normal → Active / Active → Normal */
  private async applyState(prev: ActiveStaticState | null, next: ActiveStaticState) {

    const eventTopic = computeEventTopic(prev, next);



    let updated = { ok: false };

    // ① prev 不存在 → 新的事件开始 → 创建 active
    if (!prev) {
      updated = await ActiveRepo.upsert(next);
      return { topic: eventTopic, next, updated };
    }

    // ② severity 或 level 变化 → 更新 active
    if (prev.severity !== next.severity || prev.level !== next.level) {
      updated = await ActiveRepo.upsert(next);
      return { topic: eventTopic, next, updated };
    }

    return { topic: eventTopic, next, updated };
    // ③ 其他小波动情况 → active 不删除，也不更新
    //   （保证不会重复触发）


    // if (!prev || prev.value === null || prev.value === undefined) {
    //   {
    //     await ActiveRepo.upsert(next);
    //   }
    //   return { changed: true, next, updated: null };
    // } else if (prev.severity === next.severity && next.severity === Severity.Normal) {
    //   return { changed: false, next, updated: null };

    // } else if (prev.severity !== next.severity || prev.level !== next.level) {
    //   await ActiveRepo.upsert(next);
    //   return { changed: true, next, updated: null };
    // }

    // return { changed: false, next, updated: null };
    // // ---------------------------------------------------------------------
    // // ① 之前是 active，且现在回到 Normal
    // // ---------------------------------------------------------------------


    // if (next.severity === Severity.Normal) {
    //   if (prev?.severity !== Severity.Normal) {
    //     await ActiveRepo.delete(next);
    //   }
    // } else {
    //   await ActiveRepo.upsert(next);
    // }



    // // 🟢 severity 回到 Normal → 删除 active
    // if (next.severity === Severity.Normal) {
    //   if (prev) {
    //     await ActiveRepo.upsert(next); // 自动触发 end event
    //     // await handleAlarmEvent("alarm/end", next);
    //   }
    //   // return { changed: !!prev, next };
    // }

    // // ---------------------------------------------------------------------
    // // ② 现在是 active（severity > 0）
    // // 只有当“状态真的改变”才 upsert
    // // 状态定义：severity + level
    // // ---------------------------------------------------------------------
    // const MIN_DELTA = next.rule?.step ?? 8;     // 变化至少 8 才发


    // const prevValue = prev?.value ?? null;
    // const nextValue = next.value;

    // let shouldTrigger = false;

    // // ① 首次出现 → 必发
    // if (!prev || !prevValue) {
    //   shouldTrigger = true;
    // } else {
    //   const delta = Math.abs(prevValue - nextValue);

    //   const severityChanged = prev.severity !== next.severity;
    //   const levelChanged = prev.level !== next.level;

    //   // ② severity 变化，需要变化大于 8
    //   if (severityChanged && delta >= MIN_DELTA) {
    //     shouldTrigger = true;
    //   }

    //   // ③ level 变化，也需要变化大于 8
    //   if (levelChanged && delta >= MIN_DELTA) {
    //     shouldTrigger = true;
    //   }
    // }

    // if (!shouldTrigger) {
    //   // ⭐ 状态没变 → 不触发事件，不更新 active
    //   //    但要保留第一次报警时 snapshot（payload）
    //   next.payload = prev?.payload ?? next.payload;

    //   return { changed: false, next, updated: null };
    // }

    // // ---------------------------------------------------------------------
    // // ③ 状态变化 → upsert（触发 start 或 update）
    // // ---------------------------------------------------------------------
    // const updated = await ActiveRepo.upsert(next);
    // await handleAlarmEvent(
    //   prev ? "alarm/update" : "alarm/start",
    //   next
    // );

    // return { changed: true, next, updated };
  }
}
