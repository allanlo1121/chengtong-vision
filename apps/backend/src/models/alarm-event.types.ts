/* ============================================================
 * 1. Event Data Types
 * ============================================================ */

export type EventSeverity = "info" | "warning" | "critical";

export const AlarmType = {
  CONNECTIVITY: "CONNECTIVITY",
  GUIDANCE: "GUIDANCE",
  ADVANCE: "ADVANCE",
  SAFETY: "SAFETY",
} as const;

export type AlarmType = typeof AlarmType[keyof typeof AlarmType];

export interface EventParameterDetail {
  code: string;        // 参数代码，如 s100206003
  value: number;       // 当前值
  severity: EventSeverity;
  range?: any;         // 可选：阀值区间
}

export interface AlarmEvent {
  topic: string;              // 事件主题，如 GUIDANCE_THRESHOLD
  alarmType: AlarmType;        // 报警类型，如 GUIDANCE / CONNECTIVITY
  tbmId: string;              // 完整 UUID
  paramCode: string;          // 参数代码，如 s100206003
  value: number;
  ringNo?: number | null;     // 可选
  group?: string;             // guidance / thrust / pressure 

  severity: EventSeverity;    // 事件整体严重程度（必须有）
  timestamp: string;          // ISO 时间字符串

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