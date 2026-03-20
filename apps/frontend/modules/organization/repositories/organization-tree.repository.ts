import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { OrganizationTreeRow } from "./organization.repository.types";

export async function getOrganizationTreeRows(
  parentId?: string | null
): Promise<OrganizationTreeRow[]> {
  const supabase = await createClient();

  let query = supabase
    .from("v_organizations_tree")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (parentId === null) {
    query = query.is("parent_id", null);
  } else if (parentId !== undefined) {
    query = query.eq("parent_id", parentId);
  }

  const { data, error } = await query;
  assertNoError(error);

  return (data as OrganizationTreeRow[]) ?? [];
}
