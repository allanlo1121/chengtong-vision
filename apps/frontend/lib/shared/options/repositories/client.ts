import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { MasterOption } from "../types";

export async function findMasterOptions(definitionCode: string): Promise<MasterOption[] | []> {
  console.log("findMasterOptions", { definitionCode });
  const supabase = createClient();
  const { data } = await supabase
    .from("v_master_options")
    .select("id, name")
    .eq("definition_code", definitionCode);

  return (data ?? []) as MasterOption[];
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
  let builder = supabase.schema("hr").from("employees").select("id, name");
  if (search) {
    builder = builder.ilike("name", `%${search}%`);
  }
  const { data } = await builder;
  return data ?? [];
}

// export async function searchProjects(search?: string) {
//   const supabase = createClient();
//   let builder = supabase.from("projects").select("id, name");
//   if (search) {
//     builder = builder.ilike("name", `%${search}%`);
//   }
//   const { data } = await builder;
//   return data ?? [];
// }

// export async function getAllTreeRows(entity: TreeEntity = "organization"): Promise<TreeNodeRow[]> {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .schema("system")
//     .from("v_tree_nodes")
//     .select("*")
//     .eq("entity_type", entity)
//     .order("sort_order", { ascending: true });

//   assertNoError(error);

//   return (data as TreeNodeRow[]) ?? [];
// }

export async function findCustomers(categoryCode: string) {
  const supabase = createClient();

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
    .select("id, name")
    .eq("customer_category_id", customerCatagorydata?.id);

  return data ?? [];
}

export async function listPosts() {
  const supabase = createClient();
  const { data } = await supabase
    .schema("hr")
    .from("posts")
    .select("id, name")
    .eq("is_disabled", false);

  return data ?? [];
}

export async function listTbmSubsystems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_subsystems")
    .select("id,code,name")
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (
    data?.map((item) => ({
      id: item.id,
      name: `${item.code} ${item.name}`,
    })) ?? []
  );
}

export async function listTbmPlcTagNames(
  tbmId: string,
  tagNames: string[]
): Promise<{ id: number; name: string }[]> {
  const supabase = createClient();

  const chunks = chunk(tagNames, 500);

  const result: {
    id: number;
    name: string;
  }[] = [];

  for (const names of chunks) {
    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .select("id, tag_name")
      .eq("tbm_id", tbmId)
      .in("tag_name", names);

    assertNoError(error);

    result.push(
      ...(data?.map((item) => ({
        id: item.id,
        name: item.tag_name,
      })) ?? [])
    );
  }

  return result;
}

export async function listTbmParametersByCode(
  parameterCodes: string[]
): Promise<{ id: number; code: string }[]> {
  const supabase = createClient();

  const chunks = chunk(parameterCodes, 500);

  const result: {
    id: number;
    code: string;
  }[] = [];

  for (const codes of chunks) {
    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select("id, code")
      .in("code", codes);
    assertNoError(error);

    result.push(
      ...(data?.map((item) => ({
        id: item.id,
        code: item.code,
      })) ?? [])
    );
  }

  return result;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
