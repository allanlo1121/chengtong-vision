/* ============================================
 * Event 类型总表（统一注册）
 * ============================================ */

import { Trend } from "../../modules/alarms/types/ActiveState.js";
import { AlarmResult, BaseCode } from "../../modules/alarms/types/AlarmContext.js";

export interface EventMap {
  "alarm/start": {
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

  "alarm/update": {
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

  "alarm/end": {
    tbmId: string;
    paramCode: string;
    severity: number;
    timestamp: string;
  };

  "connectivity/offline": {
    tbmId: string;
    source: "PLC" | "DAQ" | "NETWORK";
    timestamp: string;
  };

  "connectivity/online": {
    tbmId: string;
    source: "PLC" | "DAQ" | "NETWORK";
    timestamp: string;
  };

  // 示例：环号增长事件
  "ring/normal": {
    tbmId: string;
    from: number;
    to: number;
    timestamp: string;
  };

  "ring/reset": {
    tbmId: string;
    from: number;
    to: number;
    timestamp: string;
  };

  "ring/rollback": {
    tbmId: string;
    from: number;
    to: number;
    timestamp: string;
  };

  "ring/jump": {
    tbmId: string;
    from: number;
    to: number;
    timestamp: string;
  };

  // 你未来还可以继续扩展事件
  // "metadata/refresh": { ... }
  // "phases/change":   { ... }
}

/** 某事件类型的 payload 类型 */
export type EventPayload<T extends keyof EventMap> = EventMap[T];
