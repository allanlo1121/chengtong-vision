import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { createClient } from "@/lib/infra/supabase/server";
import { CountById } from "@/lib/shared/options/types";

export async function findTbmTypeCounts(): Promise<CountById[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("v_tbm_type_counts")
    .select("tbm_type_id, tbm_count");

  assertNoError(error);

  return (data ?? []).map((item) => ({
    id: item.tbm_type_id!,
    count: item.tbm_count!,
  }));
}

export async function findManufacturerCounts(): Promise<CountById[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("v_tbm_manufacturer_counts")
    .select("manufacturer_id, tbm_count");

  assertNoError(error);

  return (data ?? []).map((item) => ({
    id: item.manufacturer_id!,
    count: item.tbm_count!,
  }));
}
