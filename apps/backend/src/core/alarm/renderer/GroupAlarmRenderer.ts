// alarm/renderer/GroupAlarmRenderer.ts

import { StaticAlarmRenderer } from "./StaticAlarmRenderer.js";
import { EventType } from "@/core/eventbus/types.js";
import { getTbmContext } from "@/metadata/tbmContextCache.js";
import { ParameterMetadataEngine } from "@/metadata/ParameterMetadataEngine.js"

export class GroupAlarmRenderer extends StaticAlarmRenderer {

    constructor(metaEngine: ParameterMetadataEngine) {
        super(metaEngine);
    }

    // ⭐ 专门添加渲染 group 参数的逻辑
    renderGroup(event: EventType): string[] {

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

    // ⭐ 重写 render（覆盖父类）
    async render(event: EventType): Promise<string> {

        const tbmMeta = await getTbmContext(event.tbmId);
        if (!tbmMeta) {
            throw new Error(`TbmContext not found for tbmId: ${event.tbmId}`);
        }

        const severity = Number(event.severity);

        let md: string[] = [];

        // ① 标题
        md.push(this.renderTitle(tbmMeta.tbm_name ?? "未知盾构机", severity));

        // ② 项目/区间
        md.push(...this.renderBaseInfo(tbmMeta));

        md.push("");

        // ③ group 渲染（⭐ 主参数也在里面，并加粗）
        md.push(...this.renderGroup(event));

        md.push("");
        md.push(`注：\\* 观察数据；\\*\\* 可疑数据`);

        return md.join("\n");
    }
}
