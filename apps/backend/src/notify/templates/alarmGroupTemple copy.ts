// import dayjs from "dayjs";
// import { severityIcon } from "@utils/alarmSeverity";
// import { getParameterMetadata } from "@/cache/parameterMetadataCache.js";

// import { formatGroupDisplay, formatGroupEventsForDisplay } from "./hangdelEventParameter"

// import type { AlarmEvent, EventUpdateType } from "@core/eventbus/types";
// import type { TbmContext } from "@models/tbm/tbm-content.types.js";
// import type { ParameterMetadata } from "@models/tbm/realdata.types.js";

// import duration from "dayjs/plugin/duration";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(duration);

// export function formatDuration(ms: number) {
//     const d = dayjs.duration(ms);
//     const days = d.days();
//     const hours = d.hours();
//     const minutes = d.minutes();

//     return [
//         days > 0 ? `${days}天` : "",
//         hours > 0 ? `${hours}小时` : "",
//         minutes > 0 ? `${minutes}分钟` : "",
//     ].filter(Boolean).join(" ");
// }

// // /** 工具函数：格式化时间 */
// export function fmt(ts: string | number | Date) {
//     return dayjs(ts).format("YYYY-MM-DD HH:mm:ss");
// }
// export function formatToBeijing(ts: string | number | Date) {
//     return dayjs(ts).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
// }



// /** 企业微信 Markdown 的颜色样式 */
// export const SeverityColors = {
//     0: "info",     // green
//     1: "warning",  // yellow
//     2: "warning", // red
// } as const;

// export async function alarmWecomGroupTemplate(event: any, metadata: any): Promise<string> {

//     const {
//         tbm_name,
//         tunnel_name,
//         project_short_name,
//         project_name,
//         param_name,
//         group_members
//     } = metadata;

//     const payload = event.payload || {};

//     const severityNum = Number(event?.severity) as 0 | 1 | 2;
//     const icon = severityIcon(severityNum);
//     const color = SeverityColors[severityNum] ?? "info";

//     const title =
//         severityNum === 2 ? `${icon}严重告警`
//             : severityNum === 1 ? `${icon}警告`
//                 : `${icon}恢复`;

//     const projectDisplayName = project_short_name ?? project_name ?? "未知项目";
//     const tunnelName = tunnel_name ?? "未知区间";

//     // 计算时间窗口（delta 时有值）
//     const minutes = event.window_ms > 0 ? Math.round(event.window_ms / 60000) : null;
//     const displayParamName =
//         minutes ? `${param_name}（${minutes}分钟波动值）` : param_name;


//     // ========== 1) 分组参数格式化 ==========
//     const groupDisplayList = formatGroupEventsForDisplay({
//         ruleType: event.rule_type,
//         groupMembers: group_members,
//         groupActives: event.groupActives || [],
//         payload
//     });


//     // ========== 2) Markdown 构建开始 ==========
//     let md = `### <font color="${color}">${tbm_name}  ${title}</font>\n`;

//     // 基础信息
//     const baseItems: Record<string, string | null> = {
//         "项目": projectDisplayName,
//         "区间": tunnelName,
//         "参数": displayParamName,
//         "时间": formatToBeijing(event.timestamp),
//         "持续时间": event.duration_ms ? formatDuration(event.duration_ms) : "刚刚",
//     };

//     for (const key in baseItems) {
//         const val = baseItems[key];
//         if (!val) continue;
//         md += `> **${key}：** ${val}\n`;
//     }

//     // ========== 3) 分组参数列表 ==========
//     if (groupDisplayList.length > 0) {
//         md += `\n> **相关参数：**\n`;

//         for (const item of groupDisplayList) {
//             md += `> • ${item.text}\n`;
//         }
//     }

//     // ========== 4) 备注消息 ==========
//     if (event.message) {
//         md += `\n> ${event.message}\n`;
//     }

//     // ========== 5) 数据质量标注 ==========
//     md += `\n注：\\* 观察数据；\\*\\* 可疑数据`;

//     return md;
// }



// export async function alarmSmsGroupTemplate(event: any, metadata: any): Promise<string> {

//     console.log("alarmGroupTemplate", event, metadata);

//     const { tbm_name, tunnel_name, project_short_name, project_name, param_name, group_members } = metadata;
//     const payload = event.payload || {};
//     const severityNum = Number(event?.severity) as 0 | 1 | 2;
//     const icon = severityIcon(severityNum);
//     const color = SeverityColors[severityNum] ?? "info";

//     const title = severityNum === 2 ? `${icon}严重告警` : severityNum === 1 ? `${icon}警告` : `${icon}恢复`;
//     const projectDisplayName = project_short_name ?? project_name ?? "未知项目";
//     const tunnelName = tunnel_name ?? "未知区间";

//     const minutes = event.window_ms > 0 ? Math.round(event.window_ms / 60000) : null;

//     const paramName =
//         minutes
//             ? `${param_name}（${minutes}分钟波动值）`
//             : param_name;


//     const items: Record<string, string | undefined | null> = {
//         "项目": projectDisplayName,
//         "区间": tunnelName,
//         "参数": paramName,
//         "时间": formatToBeijing(event.timestamp),
//         "持续时间": event.duration_ms ? `${formatDuration(event.duration_ms)}` : "刚刚",
//         ...formatGroupDisplay(group_members, payload)
//     };



//     // 标题
//     let md = `### <font color="${color}">${tbm_name} ${title}</font>\n`;

//     // 关键数据项
//     for (const key in items) {
//         const val = items[key];
//         if (!val) continue;
//         md += `> **${key}：** ${val}\n`;
//     }

//     // // 备注
//     if (event.message) {
//         md += `\n> ${event.message}\n`;
//     }

//     // 分割线
//     md += `注: \\* 观察数据`;
//     md += `\\*\\* 可疑数据`;

//     return md;
// }