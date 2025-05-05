import { createClient } from "@/utils/supabase/server";
import { IProjectForm } from "./types";

export async function insertProjectMutation(input: Omit<IProjectForm, "id">): Promise<number> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: input.name,
      short_name: input.shortName,
      address_name: input.addressName,
      region_id: input.regionId,
      construction_costs: input.constructionCosts,
      contract_start_date: input.contractStartDate,
      contract_end_date: input.contractEndDate,
      status: input.status,
    })
    .select("id")
    .single();

  if (error || !data) throw error;
  return data.id;
}

export async function updateProjectMutation(
  id: string,
  input: Partial<IProjectForm>
): Promise<void> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      name: input.name,
      short_name: input.shortName,
      address_name: input.addressName,
      region_id: input.regionId,
      construction_costs: input.constructionCosts,
      contract_start_date: input.contractStartDate,
      contract_end_date: input.contractEndDate,
      status: input.status,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProjectMutation(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
