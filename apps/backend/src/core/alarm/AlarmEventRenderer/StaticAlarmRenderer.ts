

import { ParameterMetadataEngine } from "@/metadata/ParameterMetadataEngine.js";
import { severityIcon } from "../renderer/severityIcons";   // 你已有的图标方法
import { getTbmContext, type TbmContext } from "@cache/tbmContextCache.js";
import { EventType } from "@/core/eventbus/types.js";
import { Severity } from "../types/Severity";

export class AlarmRenderEngine {

    constructor(private metaEngine: ParameterMetadataEngine) { }

    // --------------------------------------------------------
    // 渲染主参数行（加粗）
    // --------------------------------------------------------
    renderMainParam(event: any): string {
        const line = this.metaEngine.renderParamLine({
            paramCode: event.paramCode,
            value: event.value,
            trend: event.trend
        });

        return `> **${line}**`;
    }

    // --------------------------------------------------------
    // 渲染分组参数
    // --------------------------------------------------------
    renderGroup(event: any): string[] {
        const items = this.metaEngine.renderGroupItems({
            paramCode: event.paramCode,
            groupActives: event.groupActives || [],
            payload: event.payload || {}
        });

        if (!items.length) return [];

        return [
            `> **相关参数：**`,
            ...items.map(i => `> • ${i}`)
        ];
    }

    // --------------------------------------------------------
    // 渲染标题（严重/警告/恢复）
    // --------------------------------------------------------
    renderTitle(tbmName: string, severityNum: Severity): string {

        const icon = severityIcon(severityNum);

        const title =
            severityNum === 2 ? `(严重告警)${icon}` :
                severityNum === 1 ? `(警告)${icon}` :
                    `(恢复)${icon}`;

        return `### ${tbmName} ${title}`;
    }

    // --------------------------------------------------------
    // 渲染基础信息（项目/区间）
    // --------------------------------------------------------
    renderBaseInfo(tbmMeta: TbmContext): string[] {

        const project = tbmMeta.project_short_name ?? tbmMeta.project_name ?? "未知项目";
        const tunnel = tbmMeta.tunnel_name ?? "未知区间";

        return [
            `> **项目：** ${project}`,
            `> **区间：** ${tunnel}`,
        ];
    }

    // --------------------------------------------------------
    // 主渲染入口：返回 Markdown
    // --------------------------------------------------------
    async render(event: EventType): Promise<string> {

        const meta = this.metaEngine.get(event.paramCode);
        if (!meta) throw new Error(`Metadata not found for ${event.paramCode}`);

        const tbmMeta = await getTbmContext(event.tbmId);
        if (!tbmMeta) throw new Error(`TBM context not found: ${event.tbmId}`);

        const severityNum = Number(event.severity) as 0 | 1 | 2;

        let md: string[] = [];

        // ① 标题
        md.push(this.renderTitle(tbmMeta.tbm_name ?? "未知盾构机", severityNum));

        // ② 基础信息（项目、区间）
        md.push(...this.renderBaseInfo(tbmMeta));

        md.push(""); // 空行分隔

        // ③ 主参数
        md.push(this.renderMainParam(event));

        md.push(""); // 空行分隔

        // ④ 分组参数（如果有 group）
        if (meta.group_members && meta.group_members.length > 0) {
            md.push(...this.renderGroup(event));
        }

        // ⑤ 数据质量注解
        md.push("");
        md.push(`注：\\* 观察数据；\\*\\* 可疑数据`);

        return md.join("\n");
    }
}
