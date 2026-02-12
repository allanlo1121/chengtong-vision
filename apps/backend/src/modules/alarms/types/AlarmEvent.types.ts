import { Trend } from "./ActiveState.js";
import { AlarmResult, BaseCode } from "./AlarmContext.js";

export type AlarmEventType = {
  topic: string;
  tbmId: string;
  paramCode: string;
  value: number;
  severity: number;
  quality: number;
  trend: Trend;
  ruleType: string;
  members?: BaseCode[]; // 仅组参数包含
  memberResults?: AlarmResult[];
  timestamp: string;
};
