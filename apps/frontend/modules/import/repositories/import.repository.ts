import { createClient } from "@/lib/core/supabase/client";
import { LookupItem } from "../types";

export async function findMasterOptions(definitionCode: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("v_master_options")
    .select("id, code, name")
    .eq("definition_code", definitionCode);

  return data ?? [];
}

export async function listMasterDatasets(): Promise<LookupItem[]> {
  const supabase = createClient();
  const { data } = await supabase.from("master_data").select("id,code");
  const result = data?.map((r) => ({
    id: r.id,
    key: r.code,
  }));
  return result ?? [];
}

export async function listCountries(): Promise<LookupItem[]> {
  const supabase = createClient();
  const { data } = await supabase.from("countries").select("code, name");

  const result = data?.map((r) => ({
    id: r.code,
    key: r.name,
  }));
  return result ?? [];
}

export async function listAdminRegions(): Promise<LookupItem[]> {
  const supabase = createClient();

  let query = supabase.from("admin_regions").select("code,name,parent_code,level");

  const { data } = await query.order("code");

  const result = data?.map((r) => ({
    id: r.code,
    key: r.name,
  }));
  return result ?? [];
}

export async function searchEmployees(search?: string): Promise<LookupItem[]> {
  const supabase = createClient();
  let builder = supabase.from("v_employees").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  const result = data?.map((r) => ({
    id: r.id,
    key: r.name,
  }));
  return result ?? [];
}

export async function searchProjects(search?: string): Promise<LookupItem[]> {
  const supabase = createClient();
  let builder = supabase.from("v_projects").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  const result = data?.map((r) => ({
    id: r.id,
    key: r.name,
  }));
  return result ?? [];
}

export async function listOrganizations(): Promise<LookupItem[]> {
  const supabase = createClient();
  let query = supabase.from("organizations").select("id,code,fullname ");
  const { data } = await query.order("sort_order", { ascending: true });
  const result = data?.map((r) => ({
    id: r.id,
    key: r.fullname,
  }));
  return result ?? [];
}
