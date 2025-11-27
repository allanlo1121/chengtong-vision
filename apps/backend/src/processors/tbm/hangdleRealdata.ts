import { logger } from "../../core/logger.js";
import { extractTbmKey } from "../../utils/realdataExtractor.js";
// import { normalizeParams } from "./paramNormalizer.js";  // 后续加

export async function handleRealdata(topic: string, payload: any) {
    const tbmKey = extractTbmKey(topic);
    if (!tbmKey) {
        logger.warn("📡 Realdata dropped: no tbmKey", { topic, payload });
        return;
    }

    logger.debug(`📡 [REALDATA] TBM=${tbmKey}`, payload);

    // 这里可以做参数映射（后续添加 normalizeParams 模块）
    // const normalized = normalizeParams(payload);

    // TODO: 保存实时数据（你之前做的是写入 tbm_realdata）
    // await RealdataRepo.save(tbmKey, normalized);

    // TODO: 阀值判断（后续 Step 3）
    // await ThresholdEngine.evaluate(tbmKey, normalized);

    // TODO: Spike / Median / Delta（后续 Step 4~5）
    // await StabilityEngine.process(tbmKey, normalized);

    return tbmKey;
}
