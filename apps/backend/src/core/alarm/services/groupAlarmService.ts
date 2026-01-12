import { getParameterMetadata } from "@/metadata/parameterMetadataCache.js";
import { ActiveRepo } from "../reposistory/activeRepo.js";
import { ActiveStaticState } from "../types/ActiveState.js";

export class GroupAlarmManager {

    /**
     * 返回:
     * - isGroup: 是否属于 group 参数
     * - groupMembers: ["s100206003", "s100206004", ...]
     * - groupActives: ActiveStaticState[] (可直接传给后续逻辑)
     */
    static async loadGroupActives(newRow: {
        tbm_id: string;
        param_code: string;
    }): Promise<{
        isGroup: boolean;
        groupMembers: string[];
        groupActives: ActiveStaticState[];
    }> {

        const { tbm_id: tbmId, param_code: paramCode } = newRow;

        if (!tbmId || !paramCode) {
            return { isGroup: false, groupMembers: [], groupActives: [] };
        }

        // 查 metadata，判断是否 group 参数
        const meta = getParameterMetadata(paramCode);

        if (!meta?.group_code || !Array.isArray(meta.group_members)) {
            return { isGroup: false, groupMembers: [], groupActives: [] };
        }

        const groupMembers = meta.group_members;

        // group 只有一个参数 → 不算 group
        if (groupMembers.length <= 1) {
            return { isGroup: false, groupMembers: [], groupActives: [] };
        }

        // ⭐ 用 ActiveRepo.get 拉取每个组成员的 active 状态
        const groupActives: ActiveStaticState[] = [];

        for (const memberCode of groupMembers) {
            const active = await ActiveRepo.get(tbmId, memberCode);
            if (active) groupActives.push(active);
        }

        return {
            isGroup: true,
            groupMembers,
            groupActives
        };
    }
}
