// src/core/notifier/types.ts

export interface NotificationEvent {
  tbmId: string;
  ringNo?: number;
  paramCode?: string;
  severity: number; // 1=normal 2=warning 3=critical
  eventType: string; // alarm/start, alarm/update, connectivity/offline, ...
  payload: any; // 原事件内容
}

export interface Recipient {
  id: string;
  name: string;
  channels: ("wechat" | "sms" | "email")[];
  contact: {
    wechat?: string;
    sms?: string;
    email?: string;
  };
}

export interface NotificationMessage {
  title: string;
  content: string; // Markdown 或纯文本
}

export type Channel = "wechat" | "sms" | "email";
