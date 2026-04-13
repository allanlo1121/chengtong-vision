import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { TablesInsert, Tables } from "@/lib/core/types/database";

export async function insertOrganization(
  input: TablesInsert<"organizations">
): Promise<Tables<"organizations"> | null> {
  const supabase = await createClient();

  console.log("insertOrganization", input);

  const { data: result, error } = await supabase
    .from("organizations")
    .insert(input)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "organizations"`);
  }

  return result;
}
