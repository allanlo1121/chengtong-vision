

import { ActiveStaticState } from "../types/ActiveState";
import { EventType } from "@core/eventbus/types";
import { publishEvent } from "@/core/eventbus/eventBus";
import { GroupAlarmManager } from "../services/groupAlarmService.js";

export async function handleAlarmEvent(
    topic: string,
    next: ActiveStaticState
): Promise<void> {
    console.log("handleAlarmEvent",topic,next);
    

    // ① 判断是否 group，并加载全部组内 active 状态
    const { isGroup, groupActives } = await GroupAlarmManager.loadGroupActives({
        tbm_id: next.tbm_id,
        param_code: next.param_code
    });

    // ② 构造统一事件对象
    const event: EventType = {
        topic,
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

    // ③ 发送事件（MQTT / EventBus / Kafka）
    publishEvent(topic, event);
}
