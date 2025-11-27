/**
 * Spike Detector
 * ----------------------------------------
 * 规则：
 *  - 使用中位数判断 spike：|value - median(history)| > spikeDelta
 *  - spike 后不能写入原值，而是写入“前一个正常值”
 *  - 历史每台 TBM 每个 param 单独管理
 *  - 缺乏历史（<5 条）→ 不判定 spike
 *  - 长时间掉线（> 2 分钟）→ 重置预热阶段
 */

const DEFAULT_SPIKE_DELTA = 100;          // |value - median| > 100 视为 spike
const LOST_CONNECTION_MS = 2 * 60 * 1000; // 2 分钟视为掉线



/**
 * 主入口
 * @param {Array} history - 历史 [{ value, ts }]
 * @param {number} newValue
 * @param {number} ts
 * @returns {number} cleanedValue（可能是 newValue，也可能是上一个历史值）
 */
export function process(history, newValue, ts) {
    if (!history || history.length === 0) {
        // 第一次数据，不能 spike
        return newValue;
    }

    const last = history[history.length - 1];

    // 1) 掉线恢复（超过 LOST_CONNECTION_MS）
    if (ts - last.ts > LOST_CONNECTION_MS) {
        // 重置预热逻辑（但不清空历史，由 historyStore 管理）
        return newValue;
    }

    // 2) 预热期间（不足 5 条）
    if (history.length < 5) {
        return newValue;
    }

    // 3) 动态 spike 判定
    if (isSpike(history, newValue, DEFAULT_SPIKE_DELTA)) {
        // 返回前一个正常值（避免污染历史窗口）
        return last.value;
    }

    return newValue;
}

/**
 * 判断是否 spike（使用中位数）
 */
function isSpike(history, value, spikeDelta) {
    const values = history.map(h => h.value);

    // 中位数
    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    return Math.abs(value - median) > spikeDelta;
}

export default { processSpike };