import { EventType } from "@/core/eventbus/types";
import { getParameterMetadata } from "@/cache/parameterMetadataCache";
import { getTbmContext } from "@/cache/tbmContextCache";
import { formatGroupEventsForDisplay } from "./alarmGroupTemple";
import { severityIcon } from "@utils/alarmSeverity";
import { Trend } from "@/core/alarm/types/ActiveState";

function trendArrow(trend: Trend | null | undefined) {
    switch (trend) {
        case Trend.Rising:
            return "↑";
        case Trend.Falling:
            return "↓";
        default:
            return "→";    // 持平
    }
}

function displayValue(value: any, meta: any): string {

    // 布尔
    if (meta.type === "bool" || meta.unit === "bool") {
        return value
            ? (meta.true_label ?? "是")
            : (meta.false_label ?? "否");
    }

    // 枚举
    if (meta.type === "enum" && meta.enum_map) {
        return meta.enum_map[value] ?? `未知(${value})`;
    }

    // 数字
    if (typeof value === "number") {
        const digits = meta.decimal_digits ?? 0;
        return value.toFixed(digits);
    }

    return String(value);
}


function buildParamLine({
    paramCode,
    value,
    trend
}: {
    paramCode: string;
    value: any;
    trend?: Trend | null;
}) {
    const meta = getParameterMetadata(paramCode);

    if (!meta) return `${paramCode}：${String(value)}`;

    const formattedValue = displayValue(value, meta);

    // 数字类型→加单位
    const withUnit =
        (meta.unit)
            ? `${formattedValue} ${meta.unit}`
            : formattedValue;

    // 布尔值→不加 arrow
    const arrow =
        (meta.unit === "BOOL")
            ? ""
            : ` ${trendArrow(trend)}`;

    return `${meta.name || paramCode}：${withUnit}${arrow}`;
}


export async function alarmWecomTemplate(event: EventType): Promise<string> {

    if (!event?.tbmId) throw new Error("tbmId is required");
    if (!event?.paramCode) throw new Error("paramCode is required");

    const tbmId = event.tbmId;
    const paramCode = event.paramCode;

    const meta = getParameterMetadata(paramCode);
    if (!meta) {
        throw new Error(`Parameter metadata not found for: ${paramCode}`);
    }

    const tbmMeta = await getTbmContext(tbmId);
    const { tbm_name, tunnel_name, project_short_name, project_name } = tbmMeta || {};
    const projectName = project_short_name ?? project_name ?? "未知项目";
    const tunnelName = tunnel_name ?? "未知区间";

    const severityNum = Number(event.severity) as 0 | 1 | 2;
    const icon = severityIcon(severityNum);

    const title =
        severityNum === 2 ? `(严重告警)${icon}` :
            severityNum === 1 ? `(警告)${icon}` :
                `(恢复)${icon}`;

    // ======= 构建 Markdown =======
    let md: string[] = [];

    // 标题
    md.push(`### ${tbm_name} 盾构机 ${title}`);
    md.push(`> **项目：** ${projectName}`);
    md.push(`> **区间：** ${tunnelName}`);

    // ======= 主参数行（单行风格） =======
    const mainLine = buildParamLine({
        paramCode,
        value: event.value,
        trend: event.trend
    });

    md.push(`> **${mainLine}**`);
    md.push(""); // 空行分隔

    // ======= 如果有 group_members → 渲染分组 =======
    const groupMembers = meta.group_members || [];
    if (groupMembers.length > 0) {

        const groupList = formatGroupEventsForDisplay({
            groupMembers,
            groupActives: event.groupActives || [],
            payload: event.payload || {}
        });

        if (groupList.length > 0) {
            md.push(`> **相关参数：**`);
            const ZWSP = "\u200B";

            for (const item of groupList) {
                md.push(`> •${ZWSP}${item.text}`);
            }
        }
    }

    // 数据质量注释
    md.push("");
    md.push(`注：\\* 观察数据；\\*\\* 可疑数据`);

    return md.join("\n");
}

















export async function alarmWecomGroupTemplate(event: EventType): Promise<string> {

    const tbmId = event.tbmId || "未知设备";
    if (!tbmId) {
        throw new Error("tbmId is required in event");
    }
    const paramCode = event.paramCode || "未知参数";
    if (!paramCode) {
        throw new Error("paramCode is required in event");
    }
    const paramMeta = getParameterMetadata(paramCode);
    if (!paramMeta) {
        throw new Error(`Parameter metadata not found for paramCode: ${paramCode}`);
    }
    const tbmMeta = await getTbmContext(tbmId);

    const { tbm_name, tunnel_name, project_short_name, project_name } = tbmMeta || {};


    const { group_code: groupCode, subsystem_code: subsystemCode } = paramMeta




    const severityNum = Number(event?.severity) as 0 | 1 | 2;
    const icon = severityIcon(severityNum);


    const title =
        severityNum === 2 ? `(严重告警)${icon}`
            : severityNum === 1 ? `(警告)${icon}`
                : `(恢复)${icon}`;

    const projectDisplayName = project_short_name ?? project_name ?? "未知项目";
    const tunnelName = tunnel_name ?? "未知区间";
    const group_members = paramMeta?.group_members || [];




    // ========== 2) Markdown 构建开始 ==========
    let md = `### ${tbm_name} 盾构机 ${title}\n`;

    // 基础信息
    const baseItems: Record<string, string | null> = {
        "项目": projectDisplayName,
        "区间": tunnelName,
        "参数": paramMeta?.name || paramCode,
        "报警值": `${Math.floor(event.value)} ${trendArrow(event.trend)}`,
    };

    for (const key in baseItems) {
        const val = baseItems[key];
        if (!val) continue;
        md += `> **${key}：** ${val}\n`;
    }

    // ========== 3) 分组参数列表 ==========
    if (group_members.length > 0) {



        const payload = event.payload || {};

        // ========== 1) 分组参数格式化 ==========
        const groupDisplayList = formatGroupEventsForDisplay({
            groupMembers: group_members,
            groupActives: event.groupActives || [],
            payload
        });
        const ZWSP = "\u200B";
        if (groupDisplayList.length > 0) {
            md += `\n> **相关参数：**\n`;

            for (const item of groupDisplayList) {
                md += `> •${ZWSP}${item.text}\n`;
            }
        }
    }


    // ========== 5) 数据质量标注 ==========
    md += `\n注：\\* 观察数据；\\*\\* 可疑数据`;

    return md;
}
