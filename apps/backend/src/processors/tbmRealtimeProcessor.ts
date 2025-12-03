import { logger } from "@core/logger.js";
import { isTbmActive } from "@cache/tbmContextCache.js";
import { EventCollector, handleAlarmEvent } from "@/events/eventCollector";
import { alarmEngine } from "@core/alarm/engine";
import { getThresholdProfile } from "@/cache/tbmThresoldCache.js";
import { addWindowValue, getWindowSeries } from "@/cache/realdataWindowCache.js";
import { upsertSpecialAlarm } from "@/core/alarm/services/SystemAlarmService";


//import { preprocessValue, preprocessPayload } from "./realdata/valuePreprocessor";
import { extractTbmId, extractRing, extractTbmTimestamp, extractTbmTimestampMs } from "@/utils/realdataExtractor.js";
import { registerRealdata } from "./realdata/registerConnectivityStatus.js";
import { runRingNumPieple } from "./realdata/runRingNumPieple.js";


import { normalizePayload } from "./realdata/realdataUtils.js";
import { log } from "console";
// import { normalizeParams } from "./paramNormalizer.js";  // 后续加


import { runGuidancePipeline } from "./realdata/runGuidancePipeline.js";

export async function handleRealdata(topic: string, payload: any) {
    const tbmId = extractTbmId(payload);
    if (!tbmId) {
        logger.warn("📡 Realdata dropped: no tbmId", { topic });
        return;
    }
    if (!isTbmActive(tbmId)) {
        logger.debug(`⏭️ Realdata ignored: TBM ${tbmId} is NOT active`);
        return;
    }


    //logger.debug(`📡 [REALDATA] TBM=${tbmId}`, payload);
    const s100100008 = extractRing(payload);
    if (!s100100008) {
        logger.warn("📡 Realdata dropped: no ringNo", { topic, payload });
        return;
    }

    const collector = new EventCollector();

    //环号验证
    const ringNo = await runRingNumPieple(tbmId, s100100008, collector);
    //console.log("collector ringNo valida", JSON.stringify(collector.getEvents(), null, 2));


    payload["s100100008"] = ringNo;

    const res = await registerRealdata(tbmId, ringNo);
    logger.debug(`📡 Realdata registered for TBM=${tbmId}, ringNo=${ringNo}, statusChanged=${res.statusChanged}, created=${res.created}`);

    const normalizedPayload = normalizePayload(payload);

    // await runGuidancePipeline(tbmId, normalizedPayload, collector);



    const pendingEvents: Array<{ topic: string; next: any }> = [];

    for (const [code, value] of Object.entries(normalizedPayload)) {
        // console.log("param code value", code, value);
        const profile = getThresholdProfile(code, tbmId);
        if (!profile) continue;

        // 1. 窗口缓存
        addWindowValue(tbmId, code, value);

        const recentValues = getWindowSeries(tbmId, code).map(item => item.value);

        for (const rule of profile.rules) {
            if (rule.type !== "static") continue;


            //   console.log("rule", rule);
            // console.log("recentValues", recentValues.slice(0, 8));

            let { topic, next, updated } = await alarmEngine.evaluate({
                tbmId: tbmId,
                ringNo: ringNo,
                paramCode: code,
                value,
                recentValues,
                rule,
                payload,
            });

            //console.log("alarmEngine.evaluater", topic, next.value);


            if (topic) {
                logger.info(`🔔 Alarm event: TBM=${tbmId}, param=${code}, value=${value}, severity=${next.severity}, level=${next.level}`);
                pendingEvents.push({ topic, next });
            }

        }
    }
    for (const evt of pendingEvents) {
        const ev = await handleAlarmEvent(evt.topic, evt.next);
        collector.add(ev);
    }

    //5. 统一发出报警
    await collector.flush();







    // addRealdataToWindow(tbmId, cleanedPayload);


    // const result = processGuidanceWindow(
    //     tbmId,
    //     cleanedPayload
    // );

    // console.log(result.s100206003.fluctuation);
    // console.log(result.s100206003.isOutlier);
    // console.log(result.s100206003.spikeDetected);


    // const guidanceValidData =  GuidanceDataValid(result)

    // console.log("guidanceValidData ", guidanceValidData);



    // // const normalPayload = preprocessPayload(tbmId, cleanedPayload);

    // //console.log("cleanedPayload", data);

    // const eventParameters = handleThreshold(tbmId, guidanceValidData, nowTs)

    // const eventDeltaParameters = handleDeltaThreshold(tbmId, guidanceValidData, nowTs)

    // // console.log("threshold res", eventParameters);
    // // console.log("delta threshold res", eventDeltaParameters);

    // // const thresoldEvents = [...eventParameters, ...eventDeltaParameters];


    // const alarmThresholdEvents = buildAlarmEventsByParameters(tbmId, ringNo, eventParameters, nowTs);

    // console.log("alarm events", alarmThresholdEvents);

    // collector.addMany(alarmThresholdEvents);

    // const alarmDeltaThresholdEvents = buildAlarmEventsByParameters(tbmId, ringNo, eventDeltaParameters, nowTs);

    // console.log("delta alarm events", alarmDeltaThresholdEvents);

    // collector.addMany(alarmDeltaThresholdEvents);
    // addRealdataToWindow(tbmId, normalPayload);

    // // Debug 打印最新窗口的数据（最多 5 条）
    // //printWindowDebug(tbmId);



    //注册realdata到tbm_connectivity_snapshots表,加入环号异常处理
    // await registerRealdata(tbmId, ring, payload, vr);
    // 这里可以做参数映射（后续添加 normalizeParams 模块）
    // const normalized = normalizeParams(payload);

    // TODO: 保存实时数据（你之前做的是写入 tbm_realdata）
    // await RealdataRepo.save(tbmId, normalized);

    // TODO: 阀值判断（后续 Step 3）
    // await ThresholdEngine.evaluate(tbmId, normalized);

    // TODO: Spike / Median / Delta（后续 Step 4~5）
    // await StabilityEngine.process(tbmId, normalized);


    return tbmId;
}
