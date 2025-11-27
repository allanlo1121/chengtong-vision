// processing/tbmEngine/tbmParamGroups.js

import historyStore from "./historyStore.js";

// TBM 参数分组（可从 DB 配置，也可以写死）
export const PARAM_GROUPS = {
  guidance: [
    "s100206003",  // 前点 X
    "s100206004",  // 前点 Y
    "s100206006",  // 后点 X
    "s100206007"   // 后点 Y
  ],

  thrust: [
    "s050001001",  // 推力
    "s050001002",
    "s050001003"
  ],

  torque: [
    "s010102004",  // 扭矩
    "s010102005"
  ],

  earthPressure: [
    "s020002010", // 土压
    "s020002011"
  ],

  screw: [
    "s030004001", // 螺机电流 / 扭矩
    "s030004002"
  ]
};

/**
 * 获取某一 group 的最新值（导向报警时返回 X/Y 全套）
 */
export function getGroupParamsLatest(tbmId, groupName) {
  const params = PARAM_GROUPS[groupName];
  if (!params) return {};

  const result = {};
  for (const p of params) {
    const history = historyStore.getHistory(tbmId, p);
    if (history.length) {
      result[p] = history[history.length - 1].value; // 最新值
    }
  }
  return result;
}

export default { PARAM_GROUPS, getGroupParamsLatest };
