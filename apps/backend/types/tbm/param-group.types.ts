/**
 * 参数分组（导向 / 推力 / 扭矩 / 土压 / 螺机等）
 */
export interface ParamGroupMap {
  [groupName: string]: string[];  // group -> params
}

export interface GroupValues {
  [param: string]: number; // paramCode -> latestValue
}
