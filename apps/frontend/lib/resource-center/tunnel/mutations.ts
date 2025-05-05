import { createClient } from "@/utils/supabase/server";
import { ITunnelBasicForm } from "./types";

export async function insertTunnelMutation(
  input: Omit<ITunnelBasicForm, "id">
): Promise<string> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tunnels")
    .insert({
      name: input.name,
      short_name: input.shortName,
      ring_start: input.ringStart,
      ring_end: input.ringEnd,
      op_num_start: input.opNumStart,
      op_num_end: input.opNumEnd,
      plan_launch_date: input.planLaunchDate,
      plan_breakthrough_date: input.planBreakthroughDate,
      actual_launch_date: input.actualLaunchDate,
      actual_breakthrough_date: input.actualBreakthroughDate,
      wtype: input.wtype,
      project_id: input.projectId,
      tbm_id: input.tbmId,
      status: input.status,
    })
    .select("id")
    .single();

  if (error || !data) throw error;
  return data.id;
}

export async function updateTunnelMutation(
  id: string,
  input: Partial<ITunnelBasicForm>
): Promise<void> {
  if (!input) throw new Error("No input provided");
  const supabase = await createClient();
  const { error } = await supabase
    .from("tunnels")
    .update({
      name: input.name,
      short_name: input.shortName,
      ring_start: input.ringStart,
      ring_end: input.ringEnd,
      op_num_start: input.opNumStart,
      op_num_end: input.opNumEnd,
      plan_launch_date: input.planLaunchDate,
      plan_breakthrough_date: input.planBreakthroughDate,
      actual_launch_date: input.actualLaunchDate,
      actual_breakthrough_date: input.actualBreakthroughDate,
      wtype: input.wtype,
      project_id: input.projectId,
      tbm_id: input.tbmId,
      status: input.status,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteTunnelMutation(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tunnels").delete().eq("id", id);
  if (error) throw error;
}
