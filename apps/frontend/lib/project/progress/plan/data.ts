import { createClient } from "@/utils/supabase/server";

export async function getTunnelPlanData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbm_daily_plans")
    .select("*")
    .order("plan_at", { ascending: true });

  if (error) {
    console.error("Error fetching plan data:", error);
    return [];
  }

  return data;
}
