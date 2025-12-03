// import { getWindows } from "@cache/realdataWindowCache"; // 你的 Map<string, RealdataRecord[]>
// import { evaluateDeltaRule } from "./evaluteDeltaRule";


// import type {
//     ThresholdRuleDelta,
// } from "@/models/tbm/threshold.types";

// import { getAllEffectiveThresholds } from "@/cache/tbmThresoldCache";
// import type { EventParameterDetail } from "@models/alarm-event.types";
// import type { RealdataRecord } from "@/models/tbm/realdata.types";

// /**
//  * 处理动态（Delta）阀值规则
//  */

// export function handleDeltaThreshold(
//     tbmId: string,
//     normalPayload: RealdataRecord
// ): EventParameterDetail[] {
//     if (!tbmId) return [];
//     if (!normalPayload) return [];

//     const thresholdRules = getAllEffectiveThresholds(tbmId);
//     const results: EventParameterDetail[] = [];

//     const window = getWindows(tbmId);
//     if (!window || window.length === 0) return [];

//     const now = Date.now();

//     for (const [paramCode, profile] of thresholdRules) {

//         const value = normalPayload[paramCode];
//         if (value == null) continue;

//         // 过滤 delta 规则
//         const deltaRules = profile.rules.filter(
//             r => r.type === "delta"
//         ) as ThresholdRuleDelta[];

//         if (deltaRules.length === 0) continue;

//         const groupCode = profile.group_code ?? null;
//         const subSystem = profile.sub_system ?? paramCode.slice(0, 2);

//         for (const rule of deltaRules) {

//             // 获取窗口中满足 window_ms 的最早值
//             const windowStart = now - rule.window_ms;

//             const oldest = window.find(item => {
//                 const ts = typeof item.ts === "number" ? item.ts : Date.parse(item.ts);
//                 return ts >= windowStart;
//             });

//             if (!oldest) continue;

//             const deltaValue = value - oldest[paramCode];
//             const evaluation = evaluateDeltaRule(deltaValue, rule);

//             if (!evaluation.severity) continue;

//             results.push({
//                 code: paramCode,
//                 groupCode,
//                 alarmType: subSystem,
//                 delta: evaluation.delta,
//                 message: evaluation.message,
//                 severity: evaluation.severity,
//                 ruleType: "delta",
//             });
//         }
//     }

//     return results;
// }
