// eventCollector.ts
import { publishEvent } from "@/core/eventbus/eventBus";
import { type EventType } from "@core/eventbus/types";
import { ActiveStaticState } from "@core/alarm/types/ActiveState";

import { GroupAlarmManager } from "@core/alarm/services/groupAlarmService.js";


const topic = "alarm/event";

export class EventCollector {
    private events: EventType[] = [];

    add(event: EventType) {
        this.events.push(event);
    }

    addMany(events: EventType[]) {
        this.events.push(...events);
    }

    hasEvents(): boolean {
        return this.events.length > 0;
    }

    public getEvents() {
        return this.events;
    }

    /** 
     * 最终统一发送报警
     * - 去重
     * - 合并（未来）
     * - 防抖 / 冷却（未来）
     */
    async flush() {
        if (this.events.length === 0) return;

        const uniqueEvents = dedupeEvents(this.events);

        // console.log("uniqueEvents", uniqueEvents);


        for (const ev of uniqueEvents) {
            try {
                await publishEvent(ev.topic, ev);
            } catch (err) {
                console.error("❌ Failed to publish event:", ev, err);
            }
        }

        this.events = [];
    }
}

/* ------------ 去重：同 TBM + 类型 + message + 参数 4 维度 ------------ */
function dedupeEvents(events: EventType[]): EventType[] {
    const map = new Map<string, EventType>();

    for (const ev of events) {
        const key = `${ev.tbmId}-${ev.paramCode})}`;
        if (!map.has(key)) {
            map.set(key, ev);
        }
    }

    return Array.from(map.values());
}

// export function buildAlarmEventsByParameters(
//     tbmId: string,
//     ringNo: number,
//     eventParameterDetail: EventParameterDetail[],
//     timestamp: number = new Date().getTime(),
// ) {
//     // console.log("buildAlarmEventsByParameters", { tbmId, ringNo, eventParameterDetail, timestamp });

//     if (!tbmId) return [];
//     if (!ringNo) return [];
//     if (eventParameterDetail.length === 0) return [];

//     const events: AlarmEvent[] = [];

//     // 1️⃣ 按 groupCode 分组
//     const groupMap = new Map<string, EventParameterDetail[]>();

//     for (const detail of eventParameterDetail) {
//         if (detail.groupCode) {
//             if (!groupMap.has(detail.groupCode)) groupMap.set(detail.groupCode, []);
//             groupMap.get(detail.groupCode)!.push(detail);
//         }
//     }

//     // 2️⃣ 生成 group event（有 groupCode 的）
//     for (const [groupCode, details] of groupMap) {
//         //console.log("details");

//         const lead = details.reduce((max, cur) =>
//             Math.abs(cur.value) > Math.abs(max.value) ? cur : max
//         );
//         const event: AlarmEvent = {
//             tbmId,
//             ringNo,
//             paramCode: groupCode,
//             value: lead.value,
//             window_ms: lead.window_ms,
//             dataQuality: lead.dataQuality ?? "good",
//             severity: lead.severity,
//             timestamp: timestamp,
//             parameters: details
//         };

//         events.push(event);
//     }

//     // 3️⃣ 处理没有 groupCode 的参数（每个参数一个 event）
//     const noGroup = eventParameterDetail.filter(d => !d.groupCode);

//     for (const d of noGroup) {
//         events.push({
//             tbmId,
//             ringNo,
//             paramCode: d.paramCode,
//             value: d.value,
//             window_ms: d.window_ms,
//             severity: d.severity,
//             dataQuality: d.dataQuality ?? "good",
//             timestamp: timestamp,
//             message: `Parameter ${d.paramCode} threshold exceeded`,
//             parameters: [d]
//         });
//     }

//     return events;
// }





export async function handleAlarmEvent(
    topic: string,
    next: ActiveStaticState
): Promise<EventType> {
    console.log("handleAlarmEvent",topic, next);


    // ① 判断是否 group，并加载全部组内 active 状态
    const { isGroup, groupActives } = await GroupAlarmManager.loadGroupActives({
        tbm_id: next.tbm_id,
        param_code: next.param_code
    });

    // ② 构造统一事件对象
    const event: EventType = {
        topic: topic,
        tbmId: next.tbm_id,
        paramCode: next.param_code,
        ringNo: next.ring_no ?? null,

        severity: next.severity,
        level: next.level,
        trend: next.trend,
        dataQuality: next.data_quality,

        value: next.value,
        rule: next.rule ?? null,
        payload: next.payload ?? null,

        timestamp: Date.now(),

        // ⭐ groupActives 用 ActiveStaticState[] 返回
        groupActives: isGroup ? groupActives : []
    };

    return event
}
