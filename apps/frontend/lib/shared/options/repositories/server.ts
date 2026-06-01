import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
// import { TreeEntity, TreeNodeRow } from "@/lib/core/tree/types";
import { MasterOption, SelectOption } from "../types";

export async function findMasterOptions(definitionCode: string): Promise<MasterOption[]> {
  console.log("findMasterOptions", { definitionCode });
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("v_master_options")
    .select("id,code,name")
    .eq("definition_code", definitionCode)
    .not("id", "is", null)
    .not("name", "is", null)
    .order("code");

  assertNoError(error);

  return (data ?? []).map((item) => ({
    id: item.id!,
    name: item.name!,
  }));
}

export async function listCountries(): Promise<SelectOption[] | []> {
  const supabase = await createClient();
  const { data } = await supabase.from("countries").select("code, name");

  return (
    data?.map((item) => ({
      value: item.code!,
      label: item.name!,
    })) ?? []
  );
}

export async function findAdminRegions(level: number, parentCode?: string) {
  const supabase = await createClient();

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
  const supabase = await createClient();
  let builder = supabase.schema("hr").from("employees").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  return data ?? [];
}

export async function findCustomers(categoryCode: string): Promise<MasterOption[]> {
  const supabase = await createClient();
  const { data: customerCatagorydata } = await supabase
    .from("master_data")
    .select("id")
    .eq("code", categoryCode)
    .maybeSingle();

  if (!customerCatagorydata) {
    console.warn(`No customer category found for code: ${categoryCode}`);
    return [];
  }

  const { data } = await supabase
    .schema("hr")
    .from("customers")
    .select("id, code,name")
    .eq("customer_category_id", customerCatagorydata?.id)
    .not("name", "is", null)
    .order("code");

  return (
    (data ?? []).map((item) => ({
      id: item.id!,
      name: item.name!,
    })) ?? []
  );
}
