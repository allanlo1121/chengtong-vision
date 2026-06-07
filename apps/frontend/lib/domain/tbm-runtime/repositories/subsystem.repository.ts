import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterSubsystemNode } from "../types/subsystem.types";

export async function searchTbmSubsystems(): Promise<ParameterSubsystemNode[]> {
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
      sortOrder: item.sort_order,
      isConfigurable: item.is_configurable,
      parameterCount: item.tbm_runtime_parameters?.[0]?.count ?? 0,
    })) ?? []
  );
}
