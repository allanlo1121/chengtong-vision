// ============================================================================
//  GroupAlarmManager.ts  —— 极简规则：只比较 newRow 与当组其它参数
// ============================================================================

import { supabase } from "@core/supabase/client.js";
import { getParameterMetadata } from "@/metadata/parameterMetadataCache.js";
import { Severity } from "@core/alarm/types/Severity.js";

export class GroupAlarmManager {

    static async handleParameterEvent(newRow: any): Promise<{
        isGroup: boolean;
        shouldUpdate: boolean;
        reason?: string;

        // 返回原始查询数据 & 完整组状态
        groupActives: any[];
        groupState: Record<string, { severity: number; level: number }>;
    }> {
        if (!newRow?.tbm_id)
            return { isGroup: false, shouldUpdate: false, reason: "no_tbm_id", groupActives: [], groupState: {} };

        const tbmId = newRow.tbm_id;
        const paramCode = newRow.param_code;
        const ruleType = newRow.rule_type;
        const windowMs = newRow.window_ms;

        const meta = getParameterMetadata(paramCode);

        // ===== 非 group 参数 =====
        if (!meta?.group_code) {
            return {
                isGroup: false,
                shouldUpdate: true,
                groupActives: [],
                groupState: {}
            };
        }

        const groupParams = meta.group_members ?? [];

        // ===== 单参数组 =====
        if (!groupParams || groupParams.length <= 1) {
            return {
                isGroup: false,
                shouldUpdate: true,
                reason: "single_param_group",
                groupActives: [],
                groupState: {}
            };
        }

        // ===== 查询组 active =====
        const { data: actives, error } = await supabase
            .from("tbm_active_parameter_state")
            .select("param_code,severity,level,value,delta_value,data_quality")
            .eq("tbm_id", tbmId)
            .eq("rule_type", ruleType)
            .eq("window_ms", windowMs)
            .in("param_code", groupParams);

        if (error) {
            console.error("Group query failed:", error);
            return {
                isGroup: true,
                shouldUpdate: false,
                reason: "query_failed",
                groupActives: [],
                groupState: {}
            };
        }

        // ===== 构造组状态 =====
        const groupState: Record<string, { severity: number; level: number }> = {};
        for (const p of groupParams) groupState[p] = { severity: 0, level: 0 };
        for (const row of actives) {
            groupState[row.param_code] = { severity: row.severity, level: row.level };
        }

        const newSeverity = newRow.severity;
        const newLevel = newRow.level;

        const others = Object.entries(groupState)
            .filter(([code]) => code !== paramCode)
            .map(([_, v]) => v);

        const maxOtherSeverity = Math.max(...others.map(o => o.severity));
        const otherLevelsSameSeverity = others
            .filter(o => o.severity === newSeverity)
            .map(o => o.level);

        // ============================================================
        //  🚀 规则：Delta 动态报警（你指定的行为）
        // ============================================================
        if (ruleType === "delta") {

            // ① 回到 normal 不触发
            if (newSeverity === 0) {
                return {
                    isGroup: true,
                    shouldUpdate: false,
                    reason: "delta_back_to_normal_no_message",
                    groupActives: actives,
                    groupState
                };
            }

            // ② severity 变大 → 更新
            if (newSeverity > maxOtherSeverity) {
                return {
                    isGroup: true,
                    shouldUpdate: true,
                    reason: "delta_severity_increase",
                    groupActives: actives,
                    groupState
                };
            }

            // ③ severity 相同但 level 变大 → 更新
            if (otherLevelsSameSeverity.length > 0) {
                const maxLevelSame = Math.max(...otherLevelsSameSeverity);
                if (newLevel > maxLevelSame) {
                    return {
                        isGroup: true,
                        shouldUpdate: true,
                        reason: "delta_level_increase",
                        groupActives: actives,
                        groupState
                    };
                }
            }

            // ④ 其他情况完全不触发
            return {
                isGroup: true,
                shouldUpdate: false,
                reason: "delta_no_need_update",
                groupActives: actives,
                groupState
            };
        }

        // ============================================================
        //  🚀 普通 group 规则（保留你的逻辑）
        // ============================================================

        // 规则 1：组全 normal → 更新
        const allNormal = others.every(o => o.severity === 0);
        if (allNormal && newSeverity === 0) {
            return {
                isGroup: true,
                shouldUpdate: true,
                reason: "group_all_normal",
                groupActives: actives,
                groupState
            };
        }

        // 规则 2：severity 最大 → 更新
        if (newSeverity > maxOtherSeverity) {
            return {
                isGroup: true,
                shouldUpdate: true,
                reason: "new_severity_is_max",
                groupActives: actives,
                groupState
            };
        }

        // 规则 3：severity 相同、level 最大 → 更新
        if (otherLevelsSameSeverity.length > 0) {
            const maxLevelSame = Math.max(...otherLevelsSameSeverity);
            if (newLevel > maxLevelSame) {
                return {
                    isGroup: true,
                    shouldUpdate: true,
                    reason: "new_level_is_max_under_same_severity",
                    groupActives: actives,
                    groupState
                };
            }
        }

        // 默认不更新
        return {
            isGroup: true,
            shouldUpdate: false,
            reason: "group_no_update",
            groupActives: actives,
            groupState
        };
    }

}
