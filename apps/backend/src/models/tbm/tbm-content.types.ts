import type { Database } from "@models/supabase.types.js";

// 从数据库 types 自动推导视图结构
type TbmOverviewRow =
    Database["public"]["Views"]["v_tbm_assignments_overview"]["Row"];

// 添加缓存内部字段
export interface TbmContext extends TbmOverviewRow {
    _updated_at: number;
}