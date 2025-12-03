import { logger } from "@core/logger.js";
import { getSnapshotLastRing } from "./registerConnectivityStatus.js";

import { EventCollector } from "@/events/eventCollector";
import { upsertSpecialAlarm } from "@/core/alarm/services/SystemAlarmService";
import { normalizePayload } from "./realdataUtils";



export async function runRingNumPieple(tbmId: string, s100100008: number, collector: EventCollector): Promise<number> {

    // ① 从 snapshot 获取 lastRing（掉线/重启也不会丢）
    const last = await getSnapshotLastRing(tbmId);

    // ② 如果没有 snapshot，用此 ring 作为初始化
    if (last == null) {
        logger.info(`ℹ TBM=${tbmId} tbm_connectivity_snapshots 无 last_ring，初始化为 ${s100100008}`);
        return s100100008;
    }

    const nowTs = Date.now();
    // ③ 回退判断
    if (s100100008 < last) {
        logger.warn(`⚠ TBM=${tbmId} Ring fallback: ${s100100008} < ${last}`);

        collector.add({
            topic: "alarm/start",
            tbmId,
            paramCode: "s100100008",
            ringNo: last,
            value: s100100008,
            severity: 2,
            level: 0,
            timestamp: nowTs
        });
        await upsertSpecialAlarm(
            tbmId,
            "n010000001",
            2,     // 绿色恢复
            s100100008,     // online
            normalizePayload   // payload
        );

        return last;
    }

    // ④ 跳跃判断（可根据你的业务调整阈值）
    if (s100100008 - last > 3) {
        logger.warn(`⚠ TBM=${tbmId} Ring jump too large: ${last} → ${s100100008}`);

        collector.add({
            topic: "alarm/start",
            tbmId,
            paramCode: "s100100008",
            ringNo: last,
            value: s100100008,
            level: 0,
            severity: 2,
            timestamp: nowTs
        });

        await upsertSpecialAlarm(
            tbmId,
            "n010000001",
            2,     // 绿色恢复
            s100100008,     // online
            normalizePayload   // payload
        );
        return last;
    }

    // ⑤ 正常递增


    // collector.add({
    //     topic: "alarm/end",
    //     tbmId,
    //     paramCode: "s100100008",
    //     ringNo: s100100008,
    //     value: s100100008,
    //     level: 0,
    //     severity: 1,
    //     timestamp: nowTs,

    // });

    collector.flush();

    return s100100008;
}


