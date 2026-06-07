import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { MasterOption } from "../types";
import { mapMasterOption } from "../mapper/master-option.mapper";

export async function findMasterOptionsByDefinitionCode(
  definition_code: string
): Promise<MasterOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("v_master_options")
    .select("*")
    .eq("definition_code", definition_code)
    .order("code", { ascending: true });

  assertNoError(error);

  return (data ?? []).map(mapMasterOption);
}
