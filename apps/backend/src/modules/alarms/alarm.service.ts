import { AlarmEngine } from "./engine/AlarmEngine.js";

import { AlarmContext, AlarmResult, GroupEnhancedPayload } from "./types/AlarmContext.js";
import { addWindowValue, getWindowSeries, type WindowItem } from "./caches/RealdataWindowCache.js";
import { ActiveRepo } from "./reposistory/activeRepo.js";
import { publishEvent } from "../../core/eventbus/eventBus.js";
import { ActiveStaticState } from "./types/ActiveState.js";
import { AlarmEventRenderer } from "../../core/EventRender/AlarmRender.js";

export class AlarmService {
  static async process(ctx: GroupEnhancedPayload) {
    const tbmId = ctx.tbmId;
    const paramCode = ctx.paramCode;

    const prev = await ActiveRepo.get(tbmId, paramCode);
    const prevValue = prev ? prev.value : null;

    const recentSeries = getWindowSeries(tbmId, paramCode) ?? [];
    const recentValues = recentSeries.map((item: WindowItem) => item.value);

    addWindowValue(tbmId, paramCode, ctx.value, ctx.recordedAt);

    const alarmContext = this.build(ctx, { prevValue, recentValues });

    // 一层 evaluate（阈值计算）
    const result = await AlarmEngine.evaluate(alarmContext);
    const memberResults: AlarmResult[] = [];
    //console.log("alarm resule", result);
    if (ctx.members?.length > 0) {
      for (const m of ctx.members) {
        //console.log(`--> member ${m} value:`, ctx.value);
        const prev = await ActiveRepo.get(tbmId, m.paramCode);
        const prevValue = prev ? prev.value : null;
        const recentSeries = getWindowSeries(tbmId, m.paramCode) ?? [];
        const recentValues = recentSeries.map((item: WindowItem) => item.value);
        const memberResult = await AlarmEngine.evaluate({
          paramCode: m.paramCode,
          value: m.value,
          ruleType: ctx.ruleType,
          rules: ctx.rules,
          prevValue,
          recentValues,
          recordedAt: ctx.recordedAt,
        });
        memberResults.push(memberResult);
      }
    }

    //二层 lifecycle（start / update / end）
    return this._handle(ctx, prev, result, memberResults);
  }

  private static async _handle(
    ctx: GroupEnhancedPayload,
    prev: ActiveStaticState,
    result: AlarmResult,
    memberResults: AlarmResult[]
  ) {
    const { tbmId, paramCode, ruleType, value, recordedAt, rules } = ctx;
    //console.log("rules", rules);

    const { quality, trend, severity } = result;

    const event = {
      topic: "alarm",
      tbmId,
      paramCode,
      value,
      severity,
      quality,
      trend,
      ruleType,
      members: ctx.members,
      memberResults,
      timestamp: recordedAt,
    };

    const activeData = {
      tbm_id: tbmId,
      param_code: paramCode,
      severity,
      value,
      data_quality: quality,
      recorded_at: recordedAt,
    };

    // console.log("activeData",activeData);

    const render = new AlarmEventRenderer();

    // CASE 1: normal → normal
    if (!prev && severity === 0) {
      await ActiveRepo.upsert({ ...activeData });
      return null;
    }

    // CASE 2: normal → start
    if (!prev && severity > 0) {
      event.topic = "alarm/start";
      await ActiveRepo.upsert({ ...activeData });
      if (rules.some((r) => r.is_alarm)) {
        console.log("alarm event", tbmId, value, prev);
        publishEvent("alarm/start", {
          ...event,
          notification: await render.render(event),
        });
      }
      return event;
    }

    // CASE 3: active → update
    if (prev && severity > prev.severity) {
      event.topic = "alarm/update";
      await ActiveRepo.upsert({ ...activeData });
      if (rules.some((r) => r.is_alarm)) {
        console.log("alarm event", tbmId, value, prev);
        publishEvent("alarm/update", {
          ...event,
          notification: await render.render(event),
        });
      }
      return event;
    }

    // CASE 4: active → end
    if (prev && severity === 0 && value < 0.8 * prev.value) {
      event.topic = "alarm/end";
      await ActiveRepo.upsert({ ...activeData });
      // publishEvent("alarm/end", event);
      return event;
    }

    // CASE 5: active → active（波动超过5）不发事件
    if (Math.abs(value - (prev?.value ?? 0)) > 15) {
      await ActiveRepo.upsert({ ...activeData });
    }

    return null;
  }

  static build(
    ctx: GroupEnhancedPayload,
    extra: {
      prevValue: number | null;
      recentValues: number[];
    }
  ): AlarmContext {
    const { paramCode, value, ruleType, rules, recordedAt } = ctx;

    const { prevValue, recentValues } = extra;

    // ----------------------------------------
    // ③ 构建最终 AlarmContext
    // ----------------------------------------
    return {
      paramCode,
      value,
      ruleType,
      rules,
      recordedAt,
      prevValue,
      recentValues,
    };
  }
}
