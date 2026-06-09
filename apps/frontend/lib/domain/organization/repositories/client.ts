import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { mapOrganization, mapOrganizationPicker } from "../mappers";
import { Organization, OrganizationPickerQuery, OrganizationPickerItem } from "../types";
import { PaginatedResult } from "@/lib/shared/contracts";

export const organizationClientRepository = {
  findById,
  searchOrganizationPicker,
  getPickerItemById,
};

async function findById(id: string): Promise<Organization | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("organizations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapOrganization(data) : null;
}

async function searchOrganizationPicker(
  query: OrganizationPickerQuery
): Promise<PaginatedResult<OrganizationPickerItem>> {
  console.log("searchOrganizationPicker query", query);
  const supabase = createClient();

  let builder = supabase.schema("hr").from("v_organization_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`
      name.ilike.%${query.search}%,
      short_name.ilike.%${query.search}%
    `);
  }

  if (query.orgTypeName) {
    builder = builder.eq("org_type_name", query.orgTypeName);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    items: (data ?? []).map(mapOrganizationPicker),
    total: count ?? 0,
    page,
    pageSize,
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
