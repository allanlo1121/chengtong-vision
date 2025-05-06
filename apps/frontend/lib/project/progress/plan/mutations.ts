import { createClient } from "@/utils/supabase/server";
import { ITunnelPlanData } from "../types";

export async function insertTunnelPlanData(
  plan_at: string,
  planRingCount: number
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbm_daily_plans")
    .insert([
      {
        plan_at: plan_at,
        plan_ring_count: planRingCount,
        created_at: new Date().toISOString(),
      },
    ])
    .select("*");

  if (error) {
    console.error("Error inserting plan data:", error);
    return null;
  }

  return data;
}

export async function insertManyTunnelPlanData(
  tunnelPlanData: ITunnelPlanData[]
) {
    if (!tunnelPlanData || tunnelPlanData.length === 0) {
        console.error("No plan data provided for insertion.");
        return null;
    }
    console.log("tunnelPlanData", tunnelPlanData);
    
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tunnel_daily_plans")
    .insert(tunnelPlanData)
    .select("*");

  if (error) {
    console.error("Error inserting plan data:", error);
    return null;
  }

  return data;
}

export async function updateTunnelPlanData(id: string, planRingCount: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbm_daily_plans")
    .update({ plan_ring_count: planRingCount })
    .eq("id", id)
    .select("*");

  if (error) {
    console.error("Error updating plan data:", error);
    return null;
  }

  return data;
}
