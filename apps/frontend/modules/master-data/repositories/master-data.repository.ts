import { createClient } from "@/lib/core/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { MasterOptionRow } from "../types";

export async function findMasterOptionsByDefinitionCode(
  definition_code: string
): Promise<MasterOptionRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("v_master_options")
    .select("id,code,name,description,definition_code,definition_name")
    .eq("definition_code", definition_code)
    .order("code", { ascending: true });

  assertNoError(error);

  return data ?? [];
}
