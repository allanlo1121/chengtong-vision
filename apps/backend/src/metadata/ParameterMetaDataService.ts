// metadata/ParameterMetadataService.ts
import { supabase } from "@/core/supabase/client.js";
import { MetadataServiceBase } from "./MetaDataServiceBase.js";

export interface ParameterMetadata {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    digits: number | null;
    true_label: string | null;
    false_label: string | null;
    sort_order: number | null;

    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;
    subsystem_code: string | null;
    subsystem_name: string | null;

    group_members?: string[];
    group_size?: number;
}

export class ParameterMetadataService extends MetadataServiceBase {

    private metaMap = new Map<string, ParameterMetadata>();

    get(paramCode: string) {
        return this.metaMap.get(paramCode);
    }

    getAll() {
        return this.metaMap;
    }

    // --------------------------------------------------------
    // 加载参数元数据并构建 group_members
    // --------------------------------------------------------
    async load() {
        console.log("📥 [Metadata] Loading parameter metadata...");

        const { data, error } = await supabase
            .from("tbm_runtime_parameters")
            .select(`
                id, code, name, unit, digits,
                true_label, false_label, sort_order,
                group_code, group_name,
                subsystem_id,
                subsystem:tbm_subsystems ( id, code, name )
            `);

        if (error) throw error;

        this.metaMap.clear();

        const rows = data as any[];;

        // ① 基础元数据
        rows.forEach(row => {
            if (!row.code) return;
            this.metaMap.set(row.code, {
                id: row.id,
                code: row.code,
                name: row.name,
                unit: row.unit,
                digits: row.digits,
                true_label: row.true_label,
                false_label: row.false_label,
                sort_order: row.sort_order,

                group_code: row.group_code,
                group_name: row.group_name,

                subsystem_id: row.subsystem_id,
                subsystem_code: row.subsystem?.code ?? null,
                subsystem_name: row.subsystem?.name ?? null,

                group_members: [],
                group_size: 0
            });
        });

        // ② 构建 group 映射
        const groupMap: Record<string, string[]> = {};

        this.metaMap.forEach(meta => {
            if (!meta.group_code) return;
            if (!groupMap[meta.group_code]) groupMap[meta.group_code] = [];
            groupMap[meta.group_code].push(meta.code);
        });

        // ③ group_members 排序
        Object.keys(groupMap).forEach(groupCode => {
            groupMap[groupCode].sort((aCode, bCode) => {
                const a = this.metaMap.get(aCode);
                const b = this.metaMap.get(bCode);
                return (a?.sort_order ?? 9999) - (b?.sort_order ?? 9999);
            });
        });

        // ④ 写入 group_members
        this.metaMap.forEach(meta => {
            if (!meta.group_code) return;
            meta.group_members = groupMap[meta.group_code] ?? [];
            meta.group_size = meta.group_members.length;
        });

        this.lastRefreshed = Date.now();
        console.log(`✅ [Metadata] Parameter metadata loaded: ${this.metaMap.size}`);
    }
}

export const parameterMetadataService = new ParameterMetadataService();

