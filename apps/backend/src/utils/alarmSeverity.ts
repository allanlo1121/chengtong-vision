// ===============================================
// Alarm Severity → Icon 映射（统一管理）
// ===============================================

export const SeverityIcons = {
  info: "💚",        // 恢复、正常、提示
  warning: "💛",     // 警告
  critical: "❤️",    // 严重告警
} as const;

export type EventSeverity = keyof typeof SeverityIcons;

/** 返回此告警的图标（企业微信、短信、邮件均可用） */
export function severityIcon(severity: EventSeverity): string {
  return SeverityIcons[severity];
}
