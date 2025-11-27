/**
 * 历史数据结构（historyStore）
 */
export interface HistoryEntry {
  ts: number;
  value: number;
}

/**
 * 参数的全部历史（10 分钟窗口）
 */
export type HistoryList = HistoryEntry[];

/**
 * TBM 内存历史结构
 * history[tbmId][param] = HistoryList
 */
export interface HistoryStore {
  [tbmId: string]: {
    [param: string]: HistoryList;
  };
}
