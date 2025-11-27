import { logger } from "@core/logger.js";
import { getSnapshotLastRing } from "@domain/tbm/tbmConnectivityService";

export async function validateRing(tbmId: string, newRing: number | null) {
    if (newRing == null || isNaN(newRing)) {
        return { valid: false, reason: "NO_RING" };
    }

    // ① 从 snapshot 获取 lastRing（掉线/重启也不会丢）
    const last = await getSnapshotLastRing(tbmId);

    // ② 如果没有 snapshot，用此 ring 作为初始化
    if (last == null) {

        return { valid: true, ring: newRing };
    }

    // ③ 回退判断
    if (newRing < last) {
        logger.warn(`⚠ TBM=${tbmId} Ring fallback: ${newRing} < ${last}`);
        return { valid: false, reason: `环号回退: ${newRing} < ${last}` };
    }

    // ④ 跳跃判断（可根据你的业务调整阈值）
    if (newRing - last > 3) {
        logger.warn(`⚠ TBM=${tbmId} Ring jump too large: ${last} → ${newRing}`);
        return { valid: false, reason: `环号跳跃过大: ${last} → ${newRing}` };
    }

    // ⑤ 正常递增

    return { valid: true, ring: newRing };
}
