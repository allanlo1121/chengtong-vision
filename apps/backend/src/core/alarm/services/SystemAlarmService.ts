// core/alarm/SystemAlarmService.ts

import { ActiveRepo } from "../reposistory/activeRepo";
import type { ActiveStaticState, Trend } from "../types/ActiveState";

export async function upsertSpecialAlarm(
    tbmId: string,
    key: string,
    severity: number,
    value: number,
    payload: any
) {
    const next: ActiveStaticState = {
        tbm_id: tbmId,
        param_code: key,

        value,
        severity,
        level: 0,
        data_quality: 0,


        payload,
        ring_no: null,
    };

    try {
        if (severity === 0) {
            await ActiveRepo.delete(next);      // 恢复 → end event
        } else {
            await ActiveRepo.upsert(next);      // 进入 active 或更新
        }
    } catch (err) {
        console.error("❌ upsertSpecialAlarm failed:", err);
        // ❗ 不继续向外抛，防止 Node 崩溃
    }
}
