import { EventType } from "@/core/eventbus/types";
import { getParameterMetadata } from "@/cache/parameterMetadataCache";
import { getTbmContext } from "@/cache/tbmContextCache";
import { formatGroupEventsForSmsDisplay } from "./alarmGroupTemple";
import { severityIcon } from "@utils/alarmSeverity";




export async function alarmSmsGroupTemplate(event: EventType): Promise<string> {

    const tbmId = event.tbmId || "未知设备";
    if (!tbmId) {
        throw new Error("tbmId is required in event");
    }
    const paramCode = event.paramCode || "未知参数";
    if (!paramCode) {
        throw new Error("paramCode is required in event");
    }
    const paramMeta = getParameterMetadata(paramCode);
    const tbmMeta = await getTbmContext(tbmId);

    const { tbm_name, tunnel_name, project_short_name, project_name } = tbmMeta || {};


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
    let md = ` ${tbm_name}盾构机  ${title}\n`;

    // 基础信息
    const baseItems: Record<string, string | null> = {
        "项目": projectDisplayName,
        "区间": tunnelName,
        "参数": paramMeta?.name || paramCode,
        "值": String(event.value),
    };

    for (const key in baseItems) {
        const val = baseItems[key];
        if (!val) continue;
        md += `> ${key}： ${val}\n`;
    }

    // ========== 3) 分组参数列表 ==========
    if (group_members.length > 0) {



        const payload = event.payload || {};

        // ========== 1) 分组参数格式化 ==========
        const groupDisplayList = formatGroupEventsForSmsDisplay({
            groupMembers: group_members,
            groupActives: event.groupActives || [],
            payload
        });

        if (groupDisplayList.length > 0) {
            md += `\n 相关参数：\n`;

            for (const item of groupDisplayList) {
                md += `> • ${item.text}\n`;
            }
        }
    }


    // ========== 5) 数据质量标注 ==========
    // md += `\n注：\\* 观察数据；\\*\\* 可疑数据`;

    return md;
}
