import { logger } from "@core/logger.js";
import { isTbmActive } from "@cache/tbmContextCache.js";
import { EventCollector } from "@/events/eventCollector";
import { addRealdataToWindow, getLastWindoowRecord, printWindowDebug } from "@/cache/realdataWindowCache";

import { extractTbmId, extractRing } from "@/utils/realdataExtractor.js";
import { registerRealdata } from "./tbmConnectivityProcessor"
import { validateRing } from "./realdata/ringValidator";
// import { normalizeParams } from "./paramNormalizer.js";  // 后续加

export async function handleRealdata(topic: string, payload: any) {
    const tbmId = extractTbmId(payload);
    if (!tbmId) {
        logger.warn("📡 Realdata dropped: no tbmId", { topic, payload });
        return;
    }
    if (!isTbmActive(tbmId)) {
        logger.debug(`⏭️ Realdata ignored: TBM ${tbmId} is NOT active`);
        return;
    }

    const collector = new EventCollector();

    logger.debug(`📡 [REALDATA] TBM=${tbmId}`, payload);
    const ring = extractRing(payload);

    // ============================================================
    // ① 获取窗口中的上一条完整记录（用于整行预处理）
    // ============================================================
    const prevRecord = getLastWindowRecord(tbmId); // 返回 {ts, payload} 或 null

    const cleanedPayload: Record<string, number> = {};
    const prevPayload = prevRecord?.payload ?? {};
    const prevTs = prevRecord?.ts ?? null;

    // ============================================================
    // ② 遍历所有参数 → 清洗 → 写 cleanedPayload
    // ============================================================
    for (const [paramCode, rawValue] of Object.entries(rawPayload)) {
        if (!isTbmParam(paramCode)) continue;
        if (typeof rawValue !== "number") continue;

        const prevValue = typeof prevPayload[paramCode] === "number"
            ? prevPayload[paramCode]
            : null;

        const pre = preprocessValue(prevValue, prevTs, rawValue, nowTs);

        cleanedPayload[paramCode] = pre.value;

        addRealdataToWindow(tbmId, payload);

        // Debug 打印最新窗口的数据（最多 5 条）
        printWindowDebug(tbmId);

        // const vr = await validateRing(tbmId, ring);

        // if (!vr.valid) {
        //     console.log("collector add");

        //     collector.add({
        //         topic: "ALARM",
        //         tbmId,
        //         paramCode: "s100100008",
        //         value: vr.ring || 0,
        //         alarmType: "CONNECTIVITY",
        //         severity: "warning",
        //         message: vr.reason,
        //         timestamp: new Date().toISOString(),
        //         payload,
        //     });
        // }

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

        // 5. 统一发出报警
        await collector.flush();

        return tbmId;
    }
