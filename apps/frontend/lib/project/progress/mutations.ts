import { createClient } from "@/utils/supabase/server";
import { ITunnelProgressData, TypeTunnelProgressSchema } from "./types";

export async function insertTunnelProgressData(
  tunnelProgressData: Omit<TypeTunnelProgressSchema, "id">
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .insert(tunnelProgressData)
    .select("*");

  if (error) {
    console.error("Error inserting Progress data:", error);
    return null;
  }

  return data;
}

export async function insertManyTunnelProgressData(
  tunnelProgressData: Omit<ITunnelProgressData, "id">[]
) {
  if (!tunnelProgressData || tunnelProgressData.length === 0) {
    console.error("No Progress data provided for insertion.");
    return null;
  }
  console.log("tunnelProgressData", tunnelProgressData);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .insert(tunnelProgressData)
    .select("*");

  if (error) {
    console.error("Error inserting Progress data:", error);
    return null;
  }

  return data;
}

export async function updateTunnelProgressData(
  tunnelProgressData: Partial<TypeTunnelProgressSchema> & { id: string }
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .update({
      plan_ring_count: tunnelProgressData.plan_ring_count,
      ring_start: tunnelProgressData.ring_start,
      ring_end: tunnelProgressData.ring_end,
      op_num_start: tunnelProgressData.op_num_start,
      op_num_end: tunnelProgressData.op_num_end,
    })
    .eq("id", tunnelProgressData.id)
    .select("*");

  if (error) {
    console.error("Error updating Progress data:", error);
    return null;
  }

  return data;
}
