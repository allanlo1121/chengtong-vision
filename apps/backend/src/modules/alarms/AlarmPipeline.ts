import { ParameterExtractor } from "./uitls/ParameterExtractor.js";
import { AlarmService } from "./alarm.service.js";
import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";
import { BaseCode } from "./types/AlarmContext.js";

export class AlarmPipeline {
  static async process({
    tbmId,
    payload,
    recordedAt,
  }: {
    tbmId: string;
    payload: any;
    recordedAt: string;
  }) {
    const { singleRules, groupRules } =
      await MetadataRegistry.thresholdRules.getAllRulesForTbm(tbmId);

    // ① 拆分参数
    // const params = ParameterExtractor.extract(tbmId, payload, recordedAt);

    // ② 单参数报警
    for (const rule of singleRules) {
      const value = typeof payload[rule.paramCode] === "number" ? payload[rule.paramCode] : null;
      if (typeof value !== "number") continue;
      const ctx = {
        tbmId,
        paramCode: rule.paramCode,
        value,
        ruleType: rule.ruleType,
        rules: rule.rules,
        recordedAt,
      };

      if (ctx) await AlarmService.process(ctx);
    }

    function computeGroupAbsMax(memberValues) {
      if (!memberValues || memberValues.length === 0) return null;

      return memberValues.reduce(
        (max, m) => (Math.abs(m.value) > Math.abs(max) ? m.value : max),
        memberValues[0].value
      );
    }

    // ③ 分组报警
    for (const groupRule of groupRules) {
      const memberValues: BaseCode[] = groupRule.members.map((m: string) => ({
        paramCode: m,
        value: typeof payload[m] === "number" ? payload[m] : null,
      }));

      //console.log("memberValues", memberValues);

      const ctx = {
        tbmId,
        paramCode: groupRule.groupCode,
        ruleType: groupRule.ruleType,
        value: computeGroupAbsMax(memberValues),
        rules: groupRule.rules,
        recordedAt,
        members: memberValues,
      };
      // console.log("group ctx",ctx);

      if (ctx && ctx.value !== null) await AlarmService.process(ctx);
    }
  }
}
