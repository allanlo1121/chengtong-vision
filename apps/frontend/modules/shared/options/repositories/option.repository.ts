import { createClient } from "@/lib/core/supabase/client";
import { TreeNode } from "@/lib/utils/tree";
import { TreeNodeRow } from "../types";

export async function findMasterOptions(definitionCode: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("v_master_options")
    .select("id, code, name")
    .eq("definition_code", definitionCode);

  return data ?? [];
}

export async function listCountries() {
  const supabase = createClient();
  const { data } = await supabase.from("countries").select("code, name");

  return data ?? [];
}

export async function findAdminRegions(level: number, parentCode?: string) {
  const supabase = createClient();

  let query = supabase
    .from("admin_regions")
    .select("code,name,parent_code,level")
    .eq("level", level);

  if (parentCode) {
    query = query.eq("parent_code", parentCode);
  }

  const { data } = await query.order("code");

  return data ?? [];
}

export async function searchEmployees(search?: string) {
  const supabase = createClient();
  let builder = supabase.from("v_employees").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  return data ?? [];
}

export async function searchProjects(search?: string) {
  const supabase = createClient();
  let builder = supabase.from("v_projects").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  return data ?? [];
}

export async function listOrganizations(parentId?: string): Promise<TreeNodeRow[]> {
  const supabase = createClient();
  let query = supabase.from("organizations").select("id, name,parent_id,sort_order");
  if (parentId) {
    query = query.eq("parent_id", parentId);
  }
  const { data } = await query.order("sort_order", { ascending: true });
  return data ?? [];
}
