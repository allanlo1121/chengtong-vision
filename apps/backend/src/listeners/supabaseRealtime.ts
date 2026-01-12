/**
 * Supabase Realtime Listener
 * --------------------------
 * 监听以下表的变化：
 *   - tbm_assignments
 *   - tunnels
 *   - projects
 *   - project_leader_history
 *   - employees
 *
 * 一旦有变动 → 计算受影响 tbm_ids → 刷新 TBM Context 缓存
 */

import { supabase } from "../core/supabase/client.js";
import { logger } from "../core/logger.js";
import { refreshMultipleTbmContext } from "../metadata/tbmContextCache.js";
import { ensureSnapshot, deleteSnapshot } from "../domain/tbm/tbmConnectivityService.js";
import { loadAllThresholds } from "@/metadata/tbmThresoldCache.js"
import { refreshParameterMetadata } from "@/metadata/parameterMetadataCache.js";
import { log } from "console";



// ===============================================
// 工具函数：根据表变更找到受影响的 tbm_ids
// ===============================================

async function resolveAffectedTbmIds(change: any): Promise<string[]> {
    const table = change.table;
    // console.log("changge",change);

    // console.log("table",table);


    // -------- 1. tbm_assignments：最直接，必刷 --------
    if (table === "tbm_assignments") {
        const tbmId =
            change.new?.tbm_id || change.old?.tbm_id;

        return tbmId ? [tbmId] : [];
    }

    // -------- 2. tunnels：查所有 assignment 中使用该隧道的 TBM --------
    if (table === "tunnels") {
        const tunnelId = change.new?.id || change.old?.id;
        if (!tunnelId) return [];

        const { data, error } = await supabase
            .from("tbm_assignments")
            .select("tbm_id")
            .eq("tunnel_id", tunnelId);

        if (error) {
            logger.error("❌ tunnels reverse lookup failed:", error);
            return [];
        }

        return data?.map((x) => x.tbm_id).filter(Boolean) || [];
    }

    // -------- 3. project_leader_history：项目领导变更 → 找该项目下的所有 TBM --------
    if (table === "project_leader_history") {
        const projectId =
            change.new?.project_id || change.old?.project_id;
        if (!projectId) return [];

        const { data, error } = await supabase
            .from("tbm_assignments")
            .select("tbm_id, tunnels!inner(project_id)")
            .eq("tunnels.project_id", projectId);

        if (error) {
            logger.error("❌ plh reverse lookup failed:", error);
            return [];
        }

        return data?.map((x) => x.tbm_id).filter(Boolean) || [];
    }

    // -------- 4. projects：项目名称变化 → 影响该项目下全部 TBM --------
    if (table === "projects") {
        const projectId = change.new?.id || change.old?.id;
        if (!projectId) return [];

        const { data, error } = await supabase
            .from("tbm_assignments")
            .select("tbm_id, tunnels!inner(project_id)")
            .eq("tunnels.project_id", projectId);

        if (error) {
            logger.error("❌ project reverse lookup failed:", error);
            return [];
        }

        return data?.map((x) => x.tbm_id).filter(Boolean) || [];
    }

    // -------- 5. employees：员工信息变化 → 找该员工所在项目下 TBM --------
    if (table === "employees") {
        const employeeId =
            change.new?.id || change.old?.id;
        if (!employeeId) return [];

        // 查 employee → project
        const { data: roles, error: rErr } = await supabase
            .from("project_leader_history")
            .select("project_id")
            .eq("employee_id", employeeId);

        if (rErr) {
            logger.error("❌ employee → project reverse lookup failed:", rErr);
            return [];
        }

        const projectIds = roles?.map((x) => x.project_id).filter(Boolean) || [];
        if (!projectIds.length) return [];

        // 查项目 → TBM
        const { data, error } = await supabase
            .from("tbm_assignments")
            .select("tbm_id, tunnels!inner(project_id)")
            .in("tunnels.project_id", projectIds);

        if (error) {
            logger.error("❌ employee project → TBM lookup failed:", error);
            return [];
        }

        return data?.map((x) => x.tbm_id).filter(Boolean) || [];
    }

    return [];
}


// ===============================================
// 主函数：启动 Realtime 监听
// ===============================================

export function startRealtimeListeners() {
    logger.info("🔌 Starting Supabase realtime listeners...");


    /* =====================================================
    *  TBM Context 相关表：更新 tbmContextCache
    * ===================================================== */

    const tables = [
        "tbm_assignments",
        "tunnels",
        "project_leader_history",
        "projects",
        "employees"
    ];

    for (const table of tables) {
        supabase
            .channel(`realtime_${table}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table },
                handleChange
            )
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    logger.info(`📡 Realtime subscribed → ${table}`);
                }
            });
    }

    /* =====================================================
     *  Threshold 相关表：更新 thresholdCache
     * ===================================================== */
    const thresholdTables = [
        "tbm_parameter_thresholds",
        "tbm_parameter_delta_thresholds",
        "tbm_threshold_overrides",
        "tbm_delta_threshold_overrides"
    ];

    for (const table of thresholdTables) {
        supabase
            .channel(`realtime_threshold_${table}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table },
                async () => {
                    logger.warn(`⚙️ Threshold changed → reload thresholds (${table})`);
                    await loadAllThresholds();
                }
            )
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    logger.info(`📡 Realtime subscribed → thresholds:${table}`);
                }
            });
    }





    const parameterTables = [
        "tbm_runtime_parameters",
        "tbm_subsystems"
    ];

    for (const table of parameterTables) {
        supabase
            .channel(`realtime_param_${table}`)
            .on("postgres_changes", { event: "*", schema: "public", table }, async () => {
                logger.warn(`⚙️ Parameter table changed → ${table}, reloading metadata...`);
                await refreshParameterMetadata();
            })
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    logger.info(`📡 Subscribed parameter table → ${table}`);
                }
            });
    }
    logger.info("🚀 All realtime listeners registered ✓");

}


// ===============================================
// 统一处理变更事件
// ===============================================

export async function handleChange(payload: any) {
    try {
        const table = payload.table;
        const event = payload.eventType;

        logger.debug(`🟣 Realtime change [${table}] event=${event}`);

        const tbmIds = await resolveAffectedTbmIds(payload);

        if (tbmIds.length === 0) return;

        logger.info(`🔄 Refreshing TBM Context for: ${tbmIds.join(", ")}`);

        // 1. 刷新上下文缓存
        await refreshMultipleTbmContext(tbmIds);

        // 2. Snapshot 逻辑（仅 tbm_assignments 有状态）
        if (table === "tbm_assignments") {
            console.log("tbm_assignments payload", payload);

            const eventType = payload.eventType;
            const tbmId = payload.new?.tbm_id || payload.old?.tbm_id;

            if (!tbmId) {
                logger.warn("⚠️ tbm_assignments event but no TBM ID");
                return;
            }

            if (eventType === "DELETE") {
                logger.info(`🗑 tbm_assignments DELETE → 清理 TBM=${tbmId}`);

                await deleteSnapshot(tbmId);
                await clearActiveParameterState(tbmId);  // 👈 你新增的逻辑

                return;
            }

            // 其余 INSERT / UPDATE 沿用旧逻辑
            const status = payload.new?.operation_status;

            if (status === "WORKING") {
                await ensureSnapshot(tbmId);
            } else {
                await deleteSnapshot(tbmId);
            }
        }
    } catch (err) {
        logger.error("❌ Error handling realtime change:", err);
    }
}


async function clearActiveParameterState(tbmId: string) {
    const { error } = await supabase
        .from("tbm_active_parameter_state")
        .delete()
        .eq("tbm_id", tbmId);

    if (error) {
        logger.error("❌ 删除 tbm_active_parameter_state 出错", error);
    } else {
        logger.info(`🧹 清理 active_parameter_state 完成 → TBM=${tbmId}`);
    }
}