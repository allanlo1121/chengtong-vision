import historyStore from "./historyStore.js";
import  processSpike  from "./spikeDetector.js";
import evaluateAbsolute from "./evaluateAbsolute.js";
import evaluateDelta from "./evaluateDelta.js";

/**
 * 
 * TBM Parameter Engine（核心入口）
 * ---------------------------------------
 * 处理流程：
 *  1. 获取 TBM 历史（最近 10 分钟）
 *  2. Spike 检测（并改写历史）
 *  3. 写入历史窗口
 *  4. 绝对阈值判断（warning/critical）
 *  5. 波动阈值判断（warning/critical）
 *  6. 合并结果（severity 取最高级别）
 * 
 * 返回结构：
 * {
 *    severity: "normal" | "warning" | "critical",
 *    absolute: { severity, threshold, range },
 *    delta: { severity, deltaValue },
 *    value: normalizedValue,
 *    history: lastHistoryWindow,
 * }
 */

function evaluateTbmParam({ tbmId, param, value, ts, thresholdDefinition }) {
    if (!tbmId || !param) {
        console.warn("[TBM Engine] Missing tbmId or param");
        return null;
    }

    // 1) 取历史窗口
    const history = historyStore.getHistory(tbmId, param);

    // 2) Spike 检测（会决定是否替换值）
    const cleanedValue = processSpike.process(history, value, ts);

    // 3) 写入历史窗口（注意：Spike 已处理）
    historyStore.append(tbmId, param, cleanedValue, ts);

    // 4) 绝对值阈值判断
    const abs = evaluateAbsolute(cleanedValue, thresholdDefinition);

    // 5) Delta 波动判断
    const delta = evaluateDelta(tbmId, param, thresholdDefinition);

    // 6) 合并结果（优先级：critical > warning > normal）
    const overallSeverity = mergeSeverities(abs?.severity, delta?.severity);

    return {
        tbmId,
        param,
        ts,
        value: cleanedValue,
        severity: overallSeverity,
        absolute: abs,
        delta,
        history: historyStore.getHistory(tbmId, param)  // 最新窗口
    };
}

function mergeSeverities(a, b) {
    const level = { normal: 0, warning: 1, critical: 2 };
    const sa = a ?? "normal";
    const sb = b ?? "normal";
    return level[sa] >= level[sb] ? sa : sb;
}

export default evaluateTbmParam;