// alarm/renderer/AlarmEventRenderer.ts
import { StaticAlarmRenderer } from "./StaticAlarmRenderer.js";
//import { DeltaAlarmRenderer } from "./DeltaAlarmRenderer.js";
import { GroupAlarmRenderer } from "./GroupAlarmRenderer.js";
import { ParameterMetadataEngine } from "@/metadata/ParameterMetadataEngine.js";
import type { EventType } from "@/core/eventbus/types.js";

export class AlarmEventRenderer {

    private staticRenderer: StaticAlarmRenderer;
    //private deltaRenderer: DeltaAlarmRenderer;
    private groupRenderer: GroupAlarmRenderer;

    constructor(private metaEngine: ParameterMetadataEngine) {

        this.staticRenderer = new StaticAlarmRenderer(metaEngine);
        //this.deltaRenderer = new DeltaAlarmRenderer(metaEngine);
        this.groupRenderer = new GroupAlarmRenderer(metaEngine);
    }

    async render(event: EventType): Promise<string> {

        const meta = this.metaEngine.get(event.paramCode);

        if (!meta) {
            throw new Error(`Metadata not found for ${event.paramCode}`);
        }

        // ① group 报警优先
        if (meta.group_members && meta.group_members.length > 0) {
            return this.groupRenderer.render(event);
        }

        // ② delta（波动）报警
        // if (event.rule_type === "delta") {
        //     return this.deltaRenderer.render(event);
        // }

        // ③ 静态阈值报警
        return this.staticRenderer.render(event);
    }
}
