// alarm/renderer/StaticAlarmRenderer.ts

import { severityIcon } from "./severityIcons.js";
import { ParameterMetadataEngine } from "@/metadata/ParameterMetadataEngine.js";
import { getTbmContext } from "@/metadata/tbmContextCache.js";
import { EventType } from "@/core/eventbus/types.js";
import { Severity } from "../types/Severity.js";

export class StaticAlarmRenderer {

    protected metaEngine: ParameterMetadataEngine;

    constructor(metaEngine: ParameterMetadataEngine) {
        this.metaEngine = metaEngine;
    }


    renderTitle(tbmName: string, severity: Severity): string {
        const icon = severityIcon(severity);
        const title =
            severity === 2 ? `(严重告警)${icon}` :
                severity === 1 ? `(警告)${icon}` :
                    `(恢复)${icon}`;

        return `### ${tbmName} ${title}`;
    }

    renderBaseInfo(tbmMeta: any): string[] {
        const project = tbmMeta.project_short_name ?? tbmMeta.project_name ?? "未知项目";
        const tunnel = tbmMeta.tunnel_name ?? "未知区间";

        return [
            `> **项目：** ${project}`,
            `> **区间：** ${tunnel}`
        ];
    }

    renderMain(event: EventType): string {
        const line = this.metaEngine.renderParamLine({
            paramCode: event.paramCode,
            value: event.value,
            trend: event.trend
        });

        return `> **${line}**`;
    }

    // renderGroup(event: EventType): string[] {
    //     const items = this.metaEngine.renderGroupItems({
    //         paramCode: event.paramCode,
    //         groupActives: event.groupActives || [],
    //         payload: event.payload || {}
    //     });

    //     if (!items.length) return [];

    //     return [
    //         `> **相关参数：**`,
    //         ...items.map(i => `> • ${i}`)
    //     ];
    // }

    async render(event: EventType): Promise<string> {

        //const meta = this.metaEngine.get(event.paramCode);
        const tbmMeta = await getTbmContext(event.tbmId);
        if (!tbmMeta) {
            throw new Error(`TbmContext not found for tbmId: ${event.tbmId}`);
        }
        const severity = Number(event.severity) as Severity;

        let md: string[] = [];

        // 标题
        md.push(this.renderTitle(tbmMeta.tbm_name ?? "未知盾构机", severity));
        md.push(...this.renderBaseInfo(tbmMeta));
        md.push("");

        // 主参数行
        md.push(this.renderMain(event));
        md.push("");


        md.push("");
        md.push(`注：\\* 观察数据；\\*\\* 可疑数据`);

        return md.join("\n");
    }
}
