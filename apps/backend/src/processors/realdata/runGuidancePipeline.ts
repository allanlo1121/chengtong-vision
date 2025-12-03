
import { EventCollector, buildAlarmEventsByParameters } from "@/events/eventCollector";
import { addGuidanceWindow, getGuidanceWindow } from "@cache/realdataWindowCache";

import { runGuidanceRobustCheck } from "./guidanceRobust";
import { runGuidanceThreshold, runGuidanceDeltaThreshold } from "./thresholdProcessor";



export async function runGuidancePipeline(tbmId: string, payload: Record<string, number>, collector: EventCollector): Promise<void> {
    const ringNo = payload.s100100008;
    const ts = payload.ts;

    // 导向四个参数
    const PARAMS = [
        "s100206003", // rearY
        "s100206004", // rearX
        "s100206006", // frontY
        "s100206007"  // frontX
    ];

    // 如果 4 个参数都不存在，不进入导向流水线
    const hasGuidance = PARAMS.some(p => typeof payload[p] === "number");
    if (!hasGuidance) {
        return;
    }

    console.log("tbm payload", payload);


    // ---------------------------------------------------------------------
    // 2) 将数据加入窗口（10 分钟滑动窗口）
    // ---------------------------------------------------------------------
    addGuidanceWindow(tbmId, payload);

    const windowData = getGuidanceWindow(tbmId);
    // windowData = { s100206003: [...], s100206004: [...], ... }


    // ---------------------------------------------------------------------
    // 3) 鲁棒检测（spike / 波动 / 离群）
    // ---------------------------------------------------------------------
    const robustResult = runGuidanceRobustCheck(payload, windowData);

    console.log("robustResult", robustResult);


    // robustResult 例子：
    // {
    //   s100206003: { isOutlier: true, fluctuation: 55, spikeDetected: false },
    //   s100206004: { ... },
    //   ...
    // }



    // ---------------------------------------------------------------------
    // 5) 阈值检测（warning / critical）
    // ---------------------------------------------------------------------
    const thresholdEvents = runGuidanceThreshold(tbmId, robustResult, ts);
    console.log("thresholdEvents", thresholdEvents);

    const events = buildAlarmEventsByParameters(tbmId, ringNo, thresholdEvents, ts);

    const thresholdDeltaEvents = runGuidanceDeltaThreshold(tbmId, robustResult, ts);

    const deltaEvents = buildAlarmEventsByParameters(tbmId, ringNo, thresholdDeltaEvents, ts);



    events.push(...deltaEvents);

    console.log("evnets",events);
    

    // ---------------------------------------------------------------------
    // 6) 将阈值事件写入 collector
    // ---------------------------------------------------------------------


    collector.addMany(events);
    // thresholdEvents 例子：
    // [
    //   { paramCode: "s100206003", severity: 1, message: "...", value: 25 },
    //   { paramCode: "s100206004", severity: 2, message: "...", value: 80 }
    // ]



}