// listeners/activeStateListener.ts
import { supabase } from "@core/supabase/client";
import { notifyAlarm } from "@/notify/notifyAlarm";
import { GroupAlarmManager } from "@notify/groupStateManager";

export function startActiveStateListener() {
    console.log("🔔 [Realtime] Listening tbm_operational_events …");

    supabase
        .channel("active-alarms")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "tbm_operational_events"
            },
            async (payload) => {
                try {
                    const { eventType, new: newRow, old: oldRow } = payload;

                    console.log("tbm_operational_events change", eventType, { newRow, oldRow });


                    if (eventType === "INSERT") {
                        await handleStartEvent(newRow);
                    } else if (eventType === "UPDATE") {
                        await handleUpdateEvent(oldRow, newRow);
                    } else if (eventType === "DELETE") {
                        await handleEndEvent(oldRow);
                    }
                } catch (err) {
                    console.error("❌ ActiveStateListener error:", err);
                }
            }
        )
        .subscribe();
}

/* ------------------------------------------------------------------
   1) 报警开始（INSERT）
-------------------------------------------------------------------*/
async function handleStartEvent(row: any) {
    if (!row?.tbm_id) return;

    // 🔥 新增：让 GroupAlarmManager 处理 group 逻辑
    const { isGroup, shouldUpdate, groupActives } = await GroupAlarmManager.handleParameterEvent(row);

    console.log("isGroup,shouldUpdate", isGroup, shouldUpdate);
    console.log("groupActives", groupActives);



    if (!shouldUpdate) return;

    let type = "start";

    if (isGroup) {
        type = "group_start";
    }

    // （你本来的 start notify）
    await notifyAlarm({
        type,
        action: row.action,
        tbm_id: row.tbm_id,
        param_code: row.param_code,
        rule_type: row.rule_type,
        old_severity: row.old_severity,
        severity: row.severity,
        data_quality: row.data_quality,
        old_level: row.old_level,
        level: row.level,
        value: row.value,
        delta_value: row.delta_value,
        occurred_at: row.occured_at,
        ring_no: row.ring_no,
        window_ms: row.window_ms,
        payload: row.payload,
        groupActives: groupActives ?? null

    });
}

/* ------------------------------------------------------------------
   2) 报警更新（UPDATE）
-------------------------------------------------------------------*/
async function handleUpdateEvent(oldRow: any, newRow: any) {
    if (!newRow?.tbm_id) return;

    // 没变化就跳过
    if (
        oldRow.severity === newRow.severity &&
        oldRow.level === newRow.level &&
        oldRow.value === newRow.value
    ) {
        return;
    }


    const { isGroup, shouldUpdate } = await GroupAlarmManager.handleParameterEvent(newRow);

    console.log("isGroup,shouldUpdate", isGroup, shouldUpdate);


    if (!shouldUpdate) return;

    let type = "update";

    if (isGroup) {
        type = "group_update";
    }

    // （你本来的 update notify）
    await notifyAlarm({
        type,
        tbm_id: newRow.tbm_id,
        param_code: newRow.param_code,
        rule_type: newRow.rule_type,
        severity: newRow.severity,
        data_quality: newRow.data_quality,
        old_severity: oldRow.severity,
        level: newRow.level,
        old_level: oldRow.level,
        value: newRow.value,
        delta_value: newRow.delta_value,
        ring_no: newRow.ring_no,
        payload: newRow.payload
    });
}

/* ------------------------------------------------------------------
   3) 报警结束（DELETE）
-------------------------------------------------------------------*/
async function handleEndEvent(oldRow: any) {
    if (!oldRow?.tbm_id) return;

    // 🔥 新增：Group 级别结束逻辑
    const { isGroup, shouldUpdate } = await GroupAlarmManager.handleParameterEvent(oldRow);

    console.log("isGroup,shouldUpdate", isGroup, shouldUpdate);


    if (!shouldUpdate) return;

    let type = "end";

    if (isGroup) {
        type = "group_end";
    }

    // （你本来的 end notify）
    await notifyAlarm({
        type,
        tbm_id: oldRow.tbm_id,
        param_code: oldRow.param_code,
        rule_type: oldRow.rule_type,
        severity: oldRow.severity,
        data_quality: oldRow.data_quality,
        level: oldRow.level,
        value: oldRow.value,
        delta_value: oldRow.delta_value,
        ring_no: oldRow.ring_no,
        payload: oldRow.payload,
    });
}



