import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { OrganizationInsertRow, OrganizationRow } from "../types";

export async function insertOrganization(
  input: OrganizationInsertRow
): Promise<OrganizationRow | null> {
  const supabase = await createClient();

  console.log("insertOrganization", input);

  const { data: result, error } = await supabase
    .schema("hr")
    .from("organizations")
    .insert(input)
    .select("*")
    .single();

  assertNoError(error);

  return result;
}
