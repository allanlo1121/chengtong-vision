

import type { AlarmEvent, EventParameterDetail } from "@core/eventbus/types"
import { GuidanceParamResult } from "./guidanceRobust"



import type {
    ThresholdRule,
    ThresholdRuleStatic,
    ThresholdRuleDelta,
} from "@/models/tbm/threshold.types";
import { getAllEffectiveThresholds } from "@/metadata/tbmThresoldCache"
import { evaluateStaticRule } from "./thresholdEvaluator";
import { evaluateDeltaRule } from "./evaluteDeltaRule";



export function runGuidanceThreshold(tbmId: string, guidanceData: GuidanceParamResult[], timestamp: number): EventParameterDetail[] | [] {

    if (!tbmId) return []
    if (!guidanceData) return []
    const thresholdRules = getAllEffectiveThresholds(tbmId);

    // console.log("rhresholdRules", thresholdRules);



    const results: EventParameterDetail[] = [];

    // 遍历所有阀值参数
    for (const [paramCode, profile] of thresholdRules) {

        const value = guidanceData.find(g => g.paramCode === paramCode)?.value;
        if (value === null || value === undefined) continue; // payload 没有这个参数跳过


        // 过滤 static 规则
        const staticRules = profile.rules.filter(r => r.type === "static") as ThresholdRuleStatic[];
        const groupCode = profile.group_code ?? null;


        for (const rule of staticRules) {
            const eventParameterDetail = evaluateStaticRule(value, rule);
            if (!eventParameterDetail.severity) continue;

            // 👉 情况 1：有 group → 放入 groupMap
            if (groupCode) {

                results.push({
                    paramCode,
                    groupCode,
                    timestamp,
                    dataQuality: guidanceData.find(g => g.paramCode === paramCode)?.dataQuality ?? "good",
                    window_ms: 0,
                    ...eventParameterDetail
                })
            }

            else {
                results.push({
                    paramCode,
                    timestamp,
                    groupCode: null,
                    dataQuality: guidanceData.find(g => g.paramCode === paramCode)?.dataQuality ?? "good",
                    window_ms: 0,
                    ...eventParameterDetail
                });
            }
        }
    }

    return results;
}



/**
 * 处理动态（Delta）阀值规则
 */

export function runGuidanceDeltaThreshold(
    tbmId: string,
    guidanceData: GuidanceParamResult[],
    timestamp: number
): EventParameterDetail[] {
    if (!tbmId) return [];
    if (!guidanceData) return [];

    const thresholdRules = getAllEffectiveThresholds(tbmId);
    const results: EventParameterDetail[] = [];


    for (const [paramCode, profile] of thresholdRules) {

        const deltaValue = guidanceData.find(g => g.paramCode === paramCode)?.deltaValue;
        const dataQuality = guidanceData.find(g => g.paramCode === paramCode)?.dataQuality ?? "good";
        if (deltaValue == null) continue;

        // 过滤 delta 规则
        const deltaRules = profile.rules.filter(
            r => r.type === "delta"
        ) as ThresholdRuleDelta[];

        if (deltaRules.length === 0) continue;

        const groupCode = profile.group_code ?? null;


        for (const rule of deltaRules) {

            const evaluation = evaluateDeltaRule(deltaValue, rule);

            if (!evaluation.severity) continue;

            results.push({
                paramCode,
                groupCode,
                value: evaluation.delta ?? 0,
                severity: evaluation.severity,
                range: evaluation.range,
                timestamp,
                dataQuality,
                window_ms: 10 * 60 * 1000,
            });
        }
    }

    return results;
}
