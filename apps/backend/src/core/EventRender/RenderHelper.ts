// ===============================================
// Alarm Severity → Icon 映射（统一管理）
// ===============================================

export const SeverityIcons = {
  0: "😀", // 恢复、正常、提示
  1: "⚠", // 警告
  2: "❌", // 严重告警
  3: "🚨", // 紧急告警
} as const;

/** 返回此告警的图标（企业微信、短信、邮件均可用） */
export function severityIcon(severity: number): string {
  return SeverityIcons[severity];
}

// ===== Helper: 趋势箭头 =====
export function trendArrow(trend?: string) {
  switch (trend) {
    case "rising":
    case "up":
      return "↑";
    case "falling":
    case "down":
      return "↓";
    default:
      return "→";
  }
}
