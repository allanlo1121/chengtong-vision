import { logger } from "../../core/logger.js";
import { extractTbmKey } from "../../utils/realdataExtractor.js";

export async function handleHeartbeat(topic: string, payload: any) {
    const tbmKey = extractTbmKey(topic);

    if (!tbmKey) {
        logger.warn("💓 Heartbeat dropped: no tbmKey", { topic, payload });
        return;
    }

    // 👉 记录在线状态（后续你会接回数据库）
    logger.info(`💓 [HEARTBEAT] TBM ${tbmKey} is online`);

    // TODO: 写入数据库 heartbeat 表
    // await ConnectivityService.registerHeartbeat(tbmKey);

    // TODO: 触发事件（后续接 EventBus）
    // publishEvent("tbm.heartbeat", { tbmKey, payload });

    return tbmKey;
}
