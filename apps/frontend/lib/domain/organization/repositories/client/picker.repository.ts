import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { OrganizationPickerQuery, OrganizationPickerResult } from "../../types";

export async function searchOrganizationPicker(
  query: OrganizationPickerQuery
): Promise<OrganizationPickerResult> {
  const supabase = createClient();

  let builder = supabase.schema("hr").from("v_organization_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`
      name.ilike.%${query.search}%,
      short_name.ilike.%${query.search}%
    `);
  }

  if (query.parentId) {
    builder = builder.eq("parent_id", query.parentId);
  }

  if (query.orgTypeName) {
    builder = builder.eq("org_type_name", query.orgTypeName);
  }

  if (query.parentOrgName) {
    builder = builder.ilike("parent_org_name", `%${query.parentOrgName}%`);
  }

  if (query.provinceName) {
    builder = builder.ilike("province_name", `%${query.provinceName}%`);
  }

  if (query.cityName) {
    builder = builder.ilike("city_name", `%${query.cityName}%`);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    data: data ?? [],
    count: count ?? 0,
  };
}

export function getPickerItemById(id: string) {
  const supabase = createClient();

  return supabase
    .schema("hr")
    .from("v_organization_picker")
    .select("*")
    .eq("id", id)
    .single()
    .then(({ data, error }) => {
      assertNoError(error);
      return data ?? null;
    });
}
