// metadata/TbmContextService.ts
import { supabase } from "@/core/supabase/client.js";
import { MetadataServiceBase } from "./MetaDataServiceBase";

import { logger } from "../core/logger.js";
import type { Database } from "@core/supabase/supabase.types.js";

// 从数据库 types 自动推导视图结构
type TbmOverviewRow =
    Database["public"]["Views"]["v_tbm_assignments_overview"]["Row"];

// 添加缓存内部字段
export interface TbmContext extends TbmOverviewRow {
    _updated_at: number;
}

// export interface TbmContext {
//     tbm_id: string;
//     tbm_name: string;
//     project_id: string | null;
//     project_name: string | null;
//     project_short_name: string | null;
//     tunnel_id: string | null;
//     tunnel_name: string | null;
// }

export class TbmContextService extends MetadataServiceBase {

    private contextMap = new Map<string, TbmContext>();

    get(tbmId: string) {
        return this.contextMap.get(tbmId);
    }

    getAll() {
        return this.contextMap;
    }

    async load() {
        console.log("📥 [Metadata] Loading TBM Context...");

        const { data, error } = await supabase
            .from("v_tbm_assignments_overview") // 需要提前建视图
            .select("*");

        if (error) throw error;

        this.contextMap.clear();

        (data || []).forEach(row => {
            this.contextMap.set(row.tbm_id, row as TbmContext);
        });

        this.lastRefreshed = Date.now();
        console.log(`✅ [Metadata] TBM Context loaded: ${this.contextMap.size}`);
    }
}

export const tbmContextService = new TbmContextService();
