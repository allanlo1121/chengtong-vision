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




export async function smsTemplates(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): Promise<string> {
    // 根据 alarmType 分发到不同的模板
    switch (paramMeta.subsystem_code ?? 's10') {
        case "n01":
            return renderSmsConnectivityMessage(ctx, ev, paramMeta, updatedType);
        case "s10":
            return renderSmsGuidanceMessage(ctx, ev, paramMeta, updatedType);
        // case "HEARTBEAT":
        //     return formatSmsHeartbeatMessage(ev, updateType);
        default:
            return renderSmsConnectivityMessage(ctx, ev, paramMeta, updatedType);
    }
}



//     /**
//  * 统一生成企业微信 Text
//  */
export function renderSmsConnectivityMessage(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): string {

    const durationStr = ev.duration_ms ? `持续 ${formatDuration(ev.duration_ms)}` : "";

    const textStatus = ev.value === 1 ? "✅ 已恢复" : `掉线中 (${durationStr})`;
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
 * 统一生成短信内容
 */
export function renderSmsGuidanceMessage(ctx: TbmContext, ev: AlarmEvent, paramMeta: ParameterMetadata, updatedType: EventUpdateType): string {
    const { tbm_name, tunnel_name, project_short_name, project_name } = ctx;
    const { severity } = ev;
    const icon = severityIcon(severity);
    const title = severity === 3 ? `${paramMeta.name}${icon}严重告警` : severity === 2 ? `${paramMeta.name}${icon}警告` : `${paramMeta.name}${icon}恢复`;
    const projectDisplayName = project_short_name ?? project_name ?? "未知项目";
    const tunnelName = tunnel_name ?? "未知区间";


    const items: Record<string, string | undefined | null> = {
        "项目区间": projectDisplayName,
        "区间": tunnelName,
        "参数": `${paramMeta.name} `,
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
    let md = `${title}\n`;

    // 关键数据项
    for (const key in items) {
        const val = items[key];
        if (!val) continue;
        md += ` ${key}： ${Math.floor(Number(val))}\n`;
    }

    // // 备注
    if (ev.message) {
        md += `\n> ${ev.message}\n`;
    }

    // 分割线
    md += `\n*为待观察数据 **为可疑数据`;

    return md;
}







