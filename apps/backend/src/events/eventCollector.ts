// eventCollector.ts
import { publishEvent } from "@/core/eventbus/eventBus";
import type { AlarmEvent } from "@models/alarm-event.types";



export class EventCollector {
    private events: AlarmEvent[] = [];

    add(event: AlarmEvent) {
        this.events.push(event);
    }

    addMany(events: AlarmEvent[]) {
        this.events.push(...events);
    }

    hasEvents(): boolean {
        return this.events.length > 0;
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

        console.log("uniqueEvents",uniqueEvents);
        

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
function dedupeEvents(events: AlarmEvent[]): AlarmEvent[] {
    const map = new Map<string, AlarmEvent>();

    for (const ev of events) {
        const key = `${ev.tbmId}-${ev.alarmType}-${ev.message ?? ""}-${JSON.stringify(ev.parameters ?? [])}`;
        if (!map.has(key)) {
            map.set(key, ev);
        }
    }

    return Array.from(map.values());
}
