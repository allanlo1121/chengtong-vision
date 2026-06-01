import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterSubsystemRow } from "../types/subsystem.types";

export async function searchTbmSubsystems(): Promise<ParameterSubsystemRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_subsystems")
    .select(
      `
      id,
      code,
      name,
      sort_order,
      is_configurable,
      tbm_runtime_parameters(count)
    `
    )
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (
    data?.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      sort_order: item.sort_order,
      is_configurable: item.is_configurable,
      parameter_count: item.tbm_runtime_parameters?.[0]?.count ?? 0,
    })) ?? []
  );
}
