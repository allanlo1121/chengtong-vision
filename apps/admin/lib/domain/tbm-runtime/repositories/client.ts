import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterSubsystemNode } from "../types";

export async function listTbmSubsystems(): Promise<ParameterSubsystemNode[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_subsystems")
    .select(
      `
      id,
      code,
      name,
      sort_order,
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

      parameterCount: item.tbm_runtime_parameters?.[0]?.count ?? 0,
    })) ?? []
  );
}
