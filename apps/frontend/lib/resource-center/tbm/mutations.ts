import { createClient } from "@/utils/supabase/server";
import { ITbmMainForm } from "./types";

export async function insertTbmMutation(
  input: Omit<ITbmMainForm, "id">
): Promise<string> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbms")
    .insert({
      name: input.name,
      type: input.type,
      diameter: input.diameter,
      segmentOuter: input.segmentOuter,
      productionDate: input.productionDate,
      owner_id: input.ownerId,
      geo: input.geo,
      remark: input.remark,
    })
    .select("id")
    .single();

  if (error || !data) throw error;
  return data.id;
}

export async function updateTbmMutation(
  id: string,
  input: Partial<ITbmMainForm>
): Promise<void> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { error } = await supabase
    .from("tbms")
    .update({
      name: input.name,
      type: input.type,
      diameter: input.diameter,
      segmentOuter: input.segmentOuter,
      productionDate: input.productionDate,
      owner_id: input.ownerId,
      geo: input.geo,
      remark: input.remark,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteTbmMutation(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tbms").delete().eq("id", id);
  if (error) throw error;
}
