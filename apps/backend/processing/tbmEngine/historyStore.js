/**
 * TBM History Store
 * ------------------------------------------
 * 保存每台 TBM 每个参数最近 N 分钟的历史数据。
 * 
 * 数据结构:
 *   history[tbmId][param] = [
 *      { ts: 1730000000000, value: 12.3 },
 *      { ts: 1730000003000, value: 12.4 },
 *      ...
 *   ]
 * 
 * 功能:
 *  - append: 写入（经过 spike 清洗的）历史
 *  - getHistory: 取最近窗口
 *  - auto prune: 自动清理超过时间窗口的数据
 *  - 支持 multi-tbm、multi-param
 */

const HISTORY_WINDOW_MS = 10 * 60 * 1000; // 10 分钟窗口

// 内存存储 (不会写数据库)
const history = {};  
// 结构: history[tbmId][param] = [{ ts, value }]


/**
 * 写入历史，自动创建结构
 */
function append(tbmId, param, value, ts) {
    if (!history[tbmId]) history[tbmId] = {};
    if (!history[tbmId][param]) history[tbmId][param] = [];

    history[tbmId][param].push({ ts, value });

    // 自动清理过期数据
    clearOld(tbmId, param, ts);
}

/**
 * 返回最近的历史数据（若不存在则返回空数组）
 */
function getHistory(tbmId, param) {
    if (!history[tbmId]) return [];
    if (!history[tbmId][param]) return [];
    return history[tbmId][param];
}

/**
 * 自动移除超过窗口的数据
 */
function clearOld(tbmId, param, nowTs) {
    if (!history[tbmId] || !history[tbmId][param]) return;

    const arr = history[tbmId][param];
    const cutoff = nowTs - HISTORY_WINDOW_MS;

    // 清理前端的旧数据
    while (arr.length > 0 && arr[0].ts < cutoff) {
        arr.shift();
    }
}

export default { append, getHistory, clearOld };