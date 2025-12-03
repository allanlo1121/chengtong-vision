// // src/notify/wecomMarkdown.ts

// import type { EventSeverity } from "@models/alarm-event.types";
// import { severityIcon } from "@utils/alarmSeverity";
// import dayjs from "dayjs";

// /** 企业微信 Markdown 的颜色样式 */
// export const SeverityColors = {
//     normal: "info",     // green
//     warning: "warning",  // yellow
//     critical: "warning", // red
// } as const;

// interface MarkdownOptions {
//     title: string;
//     severity: EventSeverity;
//     items?: Record<string, string | undefined | null>;
//     remark?: string;
// }

// /**
//  * 统一生成企业微信 Markdown
//  */
// export function renderWecomMarkdown(options: MarkdownOptions): string {
//     const { title, severity, items = {}, remark } = options;

//     const icon = severityIcon(severity);
//     const color = SeverityColors[severity];

//     // 标题
//     let md = `### <font color="${color}">${icon} ${title}</font>\n`;

//     // 关键数据项
//     for (const key in items) {
//         const val = items[key];
//         if (!val) continue;
//         md += `> **${key}：** ${val}\n`;
//     }

//     // 备注
//     if (remark) {
//         md += `\n> ${remark}\n`;
//     }

//     // 分割线
//     md += `\n---`;

//     return md;
// }

// /** 工具函数：格式化时间 */
// export function fmt(ts: string | number | Date) {
//     return dayjs(ts).format("YYYY-MM-DD HH:mm:ss");
// }
