/* ============================================
 * Event 类型总表（新版：带 notification 字段）
 * ============================================ */

import { Trend } from "../../modules/alarms/types/ActiveState.js";
import { AlarmResult, BaseCode } from "../../modules/alarms/types/AlarmContext.js";

export interface NotificationMessage {
  title: string; // 通知标题
  content: string; // Markdown 内容
}

/* ============================================
 * 各类型事件 Payload
 * ============================================ */

export interface EventMap {
  /* ---------- 报警事件 ---------- */

  "alarm/start": {
    tbmId: string;
    paramCode: string;
    value: number;
    severity: number;
    quality: number;
    trend: Trend;
    ruleType: string;

    members?: BaseCode[];
    memberResults?: AlarmResult[];

    timestamp: string;

    /** 新增：事件已经生成好的通知内容 */
    notification: NotificationMessage;
  };

  "alarm/update": {
    tbmId: string;
    paramCode: string;
    value: number;
    severity: number;
    quality: number;
    trend: Trend;
    ruleType: string;

    members?: BaseCode[];
    memberResults?: AlarmResult[];

    timestamp: string;

    notification: NotificationMessage;
  };

  "alarm/end": {
    tbmId: string;
    paramCode: string;
    severity: number;
    timestamp: string;

    notification: NotificationMessage;
  };

  /* ---------- 连接性事件 ---------- */

  "connectivity/offline": {
    tbmId: string;
    paramCode: string;
    value: number;
    severity: number;
    source: "PLC" | "DAQ" | "NETWORK";
    timestamp: string;

    notification: NotificationMessage;
  };

  "connectivity/online": {
    tbmId: string;
    paramCode: string;
    value: number;
    severity: number;
    source: "PLC" | "DAQ" | "NETWORK";
    timestamp: string;

    notification: NotificationMessage;
  };

  /* ---------- 环号事件 ---------- */

  "ring/normal": {
    tbmId: string;
    paramCode: string;
    severity: number;
    from: number;
    to: number;
    timestamp: string;

    notification: NotificationMessage;
  };

  "ring/reset": {
    tbmId: string;
    paramCode: string;
    severity: number;
    from: number;
    to: number;
    timestamp: string;

    notification: NotificationMessage;
  };

  "ring/rollback": {
    tbmId: string;
    paramCode: string;
    severity: number;
    from: number;
    to: number;
    timestamp: string;

    notification: NotificationMessage;
  };

  "ring/jump": {
    tbmId: string;
    paramCode: string;
    severity: number;
    from: number;
    to: number;
    timestamp: string;

    notification: NotificationMessage;
  };
}

/**
 * 获取某事件类型 payload 的类型
 */
export type EventPayload<T extends keyof EventMap> = EventMap[T];
