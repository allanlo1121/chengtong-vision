// lib/repositories/master/master.repository.ts
import { createClient } from "../supabase/server";
import { MasterOption } from "../types/master.type";

/**
 * 根据 master_definitions.key 获取master_data的所有子节点（常用于下拉）
 */
export async function fetchMasterChildrenByKey(key: string): Promise<MasterOption[]> {
  const supabase = await createClient();

  // 1. 找到 root 节点
  const { data: root, error: rootError } = await supabase
    .from("master_definitions")
    .select("code")
    .eq("key", key)
    .single();

  if (rootError) throw rootError;

  // 2. 查它的直接子节点（通常就是下拉选项）
  const { data, error } = await supabase
    .from("master_data")
    .select("code, name, sort_order")
    .eq("domain", root.code)
    .eq("is_disabled", false)
    .order("code", { ascending: true });

  if (error) throw error;

  return data as MasterOption[];
}
