import dayjs from "dayjs";
import { severityIcon } from "@utils/alarmSeverity";
import { getParameterMetadata } from "@/cache/parameterMetadataCache.js";

import { formatParamDisplay } from "./hangdelEventParameter"

import type { AlarmEvent, EventUpdateType } from "@core/eventbus/types";
import type { TbmContext } from "@models/tbm/tbm-content.types.js";
import type { ParameterMetadata } from "@models/tbm/realdata.types.js";

import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export function formatDuration(ms: number) {
    const d = dayjs.duration(ms);
    const days = d.days();
    const hours = d.hours();
    const minutes = d.minutes();

    return [
        days > 0 ? `${days}天` : "",
        hours > 0 ? `${hours}小时` : "",
        minutes > 0 ? `${minutes}分钟` : "",
    ].filter(Boolean).join(" ");
}




export async function wecomTemplates(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): Promise<string> {

    console.log("paramMeta.subsystem_code", paramMeta.subsystem_code);

    // 根据 alarmType 分发到不同的模板
    switch (paramMeta.subsystem_code ?? 's10') {
        case "n01":
            return renderWecomConnectivityMessage(ctx, ev, paramMeta, updatedType);
        case "s10":
            return renderWecomGuidanceMessage(ctx, ev, paramMeta, updatedType);
        // case "HEARTBEAT":
        //     return formatWecomHeartbeatMessage(ev, updateType);
        default:
            return renderWecomConnectivityMessage(ctx, ev, paramMeta, updatedType);
    }
}



//     /**
//  * 统一生成企业微信 Text
//  */
export function renderWecomConnectivityMessage(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): string {

    const durationStr = ev.duration_ms ? `持续 ${formatDuration(ev.duration_ms)}` : "";

    const textStatus = ev.value === 1 ? "✅ 已恢复" : `❌ 掉线中 (${durationStr})`;
    // 标题
    let md = `${ctx?.project_short_name ?? ctx?.project_name ?? "N/A"} - ${ctx?.tunnel_name ?? "N/A"} - ${ctx?.tbm_name ?? ev.tbmId}\n${paramMeta.name}: ${textStatus}\n`;

    return md;
}

/** 企业微信 Markdown 的颜色样式 */
export const SeverityColors = {
    1: "info",     // green
    2: "warning",  // yellow
    3: "warning", // red
} as const;

// interface MarkdownOptions {
//     title: string;
//     severity: EventSeverity;
//     items?: Record<string, string | undefined | null>;
//     remark?: string;
// }
// /** 工具函数：格式化时间 */
export function fmt(ts: string | number | Date) {
    return dayjs(ts).format("YYYY-MM-DD HH:mm:ss");
}
export function formatToBeijing(ts: string | number | Date) {
    return dayjs(ts).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
}


/**
 * 统一生成企业微信 Markdown
 */
export function renderWecomGuidanceMessage(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): string {
    const { tbm_name, tunnel_name, project_short_name, project_name } = ctx;
    const { severity } = ev;
    const icon = severityIcon(severity);
    const color = SeverityColors[severity];

    const title = severity === 3 ? `${paramMeta.name}${icon}严重告警` : severity === 2 ? `${paramMeta.name}${icon}警告` : `${paramMeta.name}${icon}恢复`;
    const projectDisplayName = project_short_name ?? project_name ?? "未知项目";
    const tunnelName = tunnel_name ?? "未知区间";

    const minutes = ev.window_ms > 0 ? Math.round(ev.window_ms / 60000) : null;

    const paramName =
        minutes
            ? `${paramMeta.name}（${minutes}分钟波动值）`
            : paramMeta.name;


    const items: Record<string, string | undefined | null> = {
        "项目区间": projectDisplayName,
        "区间": tunnelName,
        "参数": paramName,
        "时间": formatToBeijing(ev.timestamp),
        "持续时间": ev.duration_ms ? `${formatDuration(ev.duration_ms)}` : "刚刚"
    };
    if (ev.parameters && ev.parameters.length > 0) {
        ev.parameters.forEach(param => {
            const formatted = formatParamDisplay(param);
            if (!formatted) return;

            items[formatted.displayName] = formatted.valueStr;
        });
    }





    // 标题
    let md = `### <font color="${color}">${tbm_name} ${title}</font>\n`;

    // 关键数据项
    for (const key in items) {
        const val = items[key];
        if (!val) continue;
        md += `> **${key}：** ${val}\n`;
    }

    // // 备注
    if (ev.message) {
        md += `\n> ${ev.message}\n`;
    }

    // 分割线
    md += `注: \\* 观察数据`;
    md += `\\*\\* 可疑数据`;

    return md;
}



// const items: Record<string, string | undefined | null> = {
//     "项目": project_short_name ?? project_name,
//     "隧道": tunnel_name,
//     "TBM": tbm_name ?? ev.tbmId,
//     "参数": `${paramMeta.name} (${paramMeta.code})`,
//     "时间": fmt(ev.timestamp),
//     "严重性": severity,
//     "当前值": ev.value.toString(),
//     "持续时间": ev.duration_ms ? `${ev.duration_ms} ms` : "N/A",
//     "更新类型": updatedType,
// };

// const icon = severityIcon(severity);
// const color = SeverityColors[severity];

// // 标题
// let md = `### <font color="${color}">${icon} ${title}</font>\n`;

// // 关键数据项
// for (const key in items) {
//     const val = items[key];
//     if (!val) continue;
//     md += `> **${key}：** ${val}\n`;
// }

// // 备注
// if (remark) {
//     md += `\n> ${remark}\n`;
// }

// // 分割线
// md += `\n---`;

//         return {
//             title,
//             severity: ev.severity,
//             wecomText: renderWecomMarkdown({
//                 title,
//                 severity: ev.severity,
//                 items: {
//                     "项目": ctx?.project_name,
//                     "隧道": ctx?.tunnel_name,
//                     "时间": fmt(ev.timestamp),
//                     "状态": ev.message,
//                 },
//             }),
//             smsText: `${tbmName} ${ev.message}，断线时间：${ev.timestamp}`,
//             emailText: `${icon}**${tbmName} ${ev.message} 断线时间：${ev.timestamp}`,

//             raw: ev,

// return md;
// }





// function formatWecomConnectivityMessage(ev: AlarmEvent, ctx: any, paramMeta: any, updateType: EventUpdateType): string {
//     const tbmName = ctx?.tbm_name ?? ev.tbmId;
//     const paramName = paramMeta ? `${paramMeta.name} (${paramMeta.code})` : ev.paramCode;

//     let statusText = ev.value === 1 ? "✅ 已恢复" : "❌ 掉线中";

//     let title = `${tbmName}  ${paramName} - ${statusText}`;


// }




// function resolveConnectivityTitle(tbmName: string, severity: EventSeverity): string {
//     if (severity === "normal") {
//         return `${tbmName} 通信恢复`;
//     }
//     return `${tbmName} 通信异常`;
// }


//     export async function formatConnectivity(ev: AlarmEvent): Promise<AlarmMessage> {

//         const ctx = await getTbmContext(ev.tbmId);
//         const tbmName = ctx?.tbm_name ?? `TBM(${ev.tbmId})`;

//         const icon = severityIcon(ev.severity);

//         // 根据 severity 判断恢复/异常
//         const title = resolveConnectivityTitle(tbmName, ev.severity);

//         return {
//             title,
//             severity: ev.severity,
//             wecomText: renderWecomMarkdown({
//                 title,
//                 severity: ev.severity,
//                 items: {
//                     "项目": ctx?.project_name,
//                     "隧道": ctx?.tunnel_name,
//                     "时间": fmt(ev.timestamp),
//                     "状态": ev.message,
//                 },
//             }),
//             smsText: `${tbmName} ${ev.message}，断线时间：${ev.timestamp}`,
//             emailText: `${icon}**${tbmName} ${ev.message} 断线时间：${ev.timestamp}`,

//             raw: ev,
//         };
//     }


//     // src/notify/wecomMarkdown.ts

//     import type { EventSeverity } from "@models/alarm-event.types";
//     import { severityIcon } from "@utils/alarmSeverity";
//     import dayjs from "dayjs";

