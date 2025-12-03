/* ============================================================
 * 1. Event Data Types
 * ============================================================ */

export type EventSeverity = "normal" | "warning" | "critical";

export enum SeverityLevel {
  Normal = 0,
  Warning = 1,
  Critical = 2,
}

export const AlarmType = {
  CONNECTIVITY: "CONNECTIVITY",
  GUIDANCE: "GUIDANCE",
  ADVANCE: "ADVANCE",
  SAFETY: "SAFETY",
} as const;

export type AlarmType = typeof AlarmType[keyof typeof AlarmType];

// 公共字段（参数层 & 事件层都用）
export interface EventBase {
  paramCode: string;
  value: number;
  window_ms: number;
  timestamp: string;
  severity: SeverityLevel;
  range?: { low: number; high: number };
}

export interface EventParameterDetail extends EventBase {
  groupCode?: string    //组合代码 如 s100206  

}

export interface AlarmEvent extends EventBase {
  tbmId: string;              // 完整 UUID   
  ringNo?: number | null;     // 可选  
  duration_ms?: number;
  parameters?: EventParameterDetail[]; // 多参数模式，可选
  message?: string;                   // 描述
  payload?: any;                      // 可选：原始数据
}


export interface AlarmMessage {
  title: string;
  severity: EventSeverity;

  wecomText: string;
  smsText?: string;
  emailText?: string;

  raw: AlarmEvent;
}

export type EventUpdateType = "new_event" | "resolved" | "upgraded" | "downgraded" | "value_changed" | "interval_refresh" | "no_change";