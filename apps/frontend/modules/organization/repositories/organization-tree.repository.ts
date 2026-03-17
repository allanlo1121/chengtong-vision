import { createClient } from "@/lib/core/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { OrganizationTreeRow } from "./organization.repository.types";

export async function getOrganizationTreeRows(): Promise<OrganizationTreeRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_organizations_tree")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (data as OrganizationTreeRow[]) ?? [];
}
