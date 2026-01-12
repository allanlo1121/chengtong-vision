import { supabase } from "../core/supabase/client.js";
import type { Database } from "@models/supabase.types.js";

export interface ParameterMetadata {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    true_label: string | null;
    false_label: string | null;
    sort_order: number | null;

    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;
    subsystem_code: string | null;
    subsystem_name: string | null;

    group_members?: string[];   // 新增：同组所有参数 code
    group_size?: number;        // 新增：成员数量    
}


export interface ParamMetaRow {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    true_label: string | null;
    false_label: string | null;
    sort_order: number | null;

    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;

    subsystem: {
        id: string;
        code: string;
        name: string;
    } | null;
}

// 参数缓存 Map<paramCode, ParameterMetadata>
const parameterMetadataCache = new Map<string, ParameterMetadata>();

// 最后刷新时间
let parameterMetadataLastRefreshed = 0;



export const refreshParameterMetadata = async () => {
    try {
        console.log("📥 [ParamMeta] 正在加载参数元数据…");

        const { data, error } = await supabase
            .from("tbm_runtime_parameters")
            .select(`
                id,
                code,
                name,
                unit,
                true_label,
                false_label,
                sort_order,
                group_code,
                group_name,
                subsystem_id,
                subsystem:tbm_subsystems (
                    id,
                    code,
                    name
                )
            `);

        if (error) throw error;

        // 清空缓存
        parameterMetadataCache.clear();

        if (!data || !data.length) {
            console.warn("⚠️ [ParamMeta] 未从数据库获取任何参数数据");
            parameterMetadataLastRefreshed = Date.now();
            return parameterMetadataCache;
        }

        const rows = data as unknown as ParamMetaRow[];

        // 写入缓存
        rows.forEach(row => {
            if (!row.code) return;

            parameterMetadataCache.set(row.code, {
                id: row.id,
                code: row.code,
                name: row.name,
                unit: row.unit,
                true_label: row.true_label,
                false_label: row.false_label,
                sort_order: row.sort_order,

                group_code: row.group_code ?? null,
                group_name: row.group_name ?? null,

                subsystem_id: row.subsystem_id ?? null,
                subsystem_code: row.subsystem?.code ?? null,
                subsystem_name: row.subsystem?.name ?? null,

                // 稍后补充 group_members
                group_members: [],
                group_size: 0,

            });
        });

        // 第 2 步：按 group_code 聚合
        const groupMap: Record<string, string[]> = {};

        parameterMetadataCache.forEach(meta => {
            if (!meta.group_code) return; // 无 group 的跳过
            if (!groupMap[meta.group_code]) {
                groupMap[meta.group_code] = [];
            }
            groupMap[meta.group_code].push(meta.code);
        });

        // 第 3 步：写入 group_members 到每个参数
        parameterMetadataCache.forEach(meta => {
            if (!meta.group_code) return;

            const members = groupMap[meta.group_code] ?? [];

            meta.group_members = members;
            meta.group_size = members.length;
        });


        parameterMetadataLastRefreshed = Date.now();

        console.log(`✅ [ParamMeta] 加载完成：${parameterMetadataCache.size} 个参数`);
        return parameterMetadataCache;

    } catch (err) {
        console.error("❌ [ParamMeta] 加载失败:", err);
        throw err;
    }
};

export function getParameterMetadata(paramCode: string): ParameterMetadata | undefined {
    return parameterMetadataCache.get(paramCode);
}

export function getAllParameterMetadata(): Map<string, ParameterMetadata> {
    return parameterMetadataCache;
}

export async function reloadParameterMetadata() {
    return await refreshParameterMetadata();
}

export async function initParameterMetadata() {
    await refreshParameterMetadata();
}
