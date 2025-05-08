import { createClient } from "@/utils/supabase/server";
import { TypeTbmFormSchema } from "./types";

export async function insertTbmMutation(
  input: Omit<TypeTbmFormSchema, "id">
): Promise<string> {
  if (!input) throw new Error("No input provided");
  console.log("input", input);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbms")
    .insert({
      name: input.name,
      code: input.code,
      type_id: input.typeId,
      diameter: input.diameter,
      segment_outer:
        input.segmentOuter === undefined ? null : input.segmentOuter,
      producer_id: input.producerId === undefined ? null : input.producerId,
      production_date:
        input.productionDate === "" ? null : input.productionDate,
      owner_id: input.ownerId === "" ? null : input.ownerId,
      geo: input.geo === "" ? null : input.geo,
      remark: input.remark === "" ? null : input.remark,
    })
    .select("id")
    .single();

  if (error || !data) throw error;
  return data.id;
}

export async function updateTbmMutation(
  id: string,
  input: Partial<TypeTbmFormSchema>
): Promise<void> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { error } = await supabase
    .from("tbms")
    .update({
      name: input.name,
      code: input.code,
      type_id: input.typeId,
      diameter: input.diameter,
      segment_outer:
        input.segmentOuter === undefined ? null : input.segmentOuter,
      producer_id: input.producerId === undefined ? null : input.producerId,
      production_date: input.productionDate,
      owner_id: input.ownerId === "" ? null : input.ownerId,
      geo: input.geo === "" ? null : input.geo,
      remark: input.remark === "" ? null : input.remark,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteTbmMutation(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tbms").delete().eq("id", id);
  if (error) throw error;
}
