import type { PhaseRecord, PhaseType } from "@/hooks/useRealtimePhases";
export function convertPhasesToVisItemsWithExtras(phases: any[]): { items: any[], groups: any[] } {
    const items: any[] = [];
    const groups: any[] = [
        { id: 1, content: "环号", style: "height: 40px" },
        { id: 2, content: "掘进", style: "height: 40px" },
        { id: 3, content: "拼装", style: "height: 40px" },
        { id: 4, content: "停机", style: "height: 40px" },
        { id: 5, content: "掉线", style: "height: 40px" },
    ];

    let itemId = 1;
    let ringNumber: number | null = null;
    let ringStartTime: string | null = null;

    for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const { phase: phaseType, start_time, end_time, duration_seconds, ring } = phase;

        let group = 1;
        let className = "";
        let content = (duration_seconds / 60).toFixed(0); // 只保留整数
        let title = `环号: ${ring ?? "-"}，时长: ${duration_seconds}s`;

        // 设置 className 和分组
        if (phaseType === "jue") {
            group = groups[1].id; // 掘进组
            className = "phase-jue";
        } else if (phaseType === "pin") {
            group = groups[2].id;;
            className = "phase-pin";
        } else if (phaseType === "idle") {
            group = groups[3].id;
            className = "phase-idle";
        } else if (phaseType === "offline") {
            group = groups[4].id;
            className = "phase-offline";
        }

        // 环号阶段检测
        if (ring != null) {
            if (ringNumber === null) {
                ringNumber = ring;
                ringStartTime = start_time;
            } else if (ring > ringNumber) {
                // 添加上一环号块
                if (ringStartTime) {
                    items.push({
                        id: `item-${itemId++}`,
                        content: `${ringNumber}`,
                        start: ringStartTime,
                        end: start_time,
                        group: groups[0].id,
                        title: `环号: ${ringNumber}`,
                        className: ringNumber % 2 === 0 ? "phase-ring-light" : "phase-ring-dark",
                    });
                }

                // 更新为新的环号
                ringNumber = ring;
                ringStartTime = start_time;
            }
        }

        // 添加当前 phase 项
        items.push({
            id: `item-${itemId++}`,
            content,
            start: start_time,
            end: end_time,
            group,
            title,
            className,
        });
    }

    // 添加最后一个环号块（如果有）
    if (ringNumber !== null && ringStartTime !== null) {
        const lastPhase = phases[phases.length - 1];
        items.push({
            id: `item-${itemId++}`,
            content: `${ringNumber}`,
            start: ringStartTime,
            end: lastPhase.end_time,
            group: groups[0].id,
            title: `环号: ${ringNumber}`,
            className: ringNumber % 2 === 0 ? "phase-ring-light" : "phase-ring-dark",
        });
    }

    return { items, groups };
}

