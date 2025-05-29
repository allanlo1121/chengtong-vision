import { SupabaseClient } from "@supabase/supabase-js";
import { startOfDay, endOfDay,addDays } from "date-fns";

export async function fetchStartRingSumBetween(
  supabase: SupabaseClient,
  from: Date,
  to: Date,
  tunnelIds: string[]
): Promise<number> {
  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .select("ring_start")
    .in("tunnel_id", tunnelIds)
    .gte("progress_at", from.toISOString())
    .lte("progress_at", to.toISOString());

  if (error) throw error;

  return (data ?? []).reduce((sum, row) => sum + (row.ring_start ?? 0), 0);
}

export async function fetchPlanSumBetween(
  supabase: SupabaseClient,
  from: Date,
  to: Date,
  tunnelIds: string[]
): Promise<number> {
  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .select("plan_ring_count")
    .in("tunnel_id", tunnelIds)
    .gte("progress_at", from.toISOString())
    .lte("progress_at", to.toISOString());

  if (error) throw error;

  return (data ?? []).reduce((sum, row) => sum + (row.plan_ring_count ?? 0), 0);
}



export async function fetchStartRingSumOfDay(
  supabase: SupabaseClient,
  day: Date,
  tunnelIds: string[]
): Promise<number> {
  const from = startOfDay(day);
  const to = endOfDay(day);

  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .select("ring_start")
    .in("tunnel_id", tunnelIds)
    .gte("progress_at", from.toISOString())
    .lt("progress_at", to.toISOString());

  if (error) throw error;

//   console.log("fetchStartRingSumOfDay", {
//     from: from.toISOString(),
//     to: to.toISOString(),
//     tunnelIds,
//     data,
//     error,
//   }
//   );
  

  return (data ?? []).reduce((sum, row) => sum + (row.ring_start ?? 0), 0);
}

export async function fetchPlanSumOfDay(
  supabase: SupabaseClient,
  day: Date,
  tunnelIds: string[]
): Promise<number> {
  const from = startOfDay(day);
  const to = startOfDay(addDays(day, 1));

  const { data, error } = await supabase
    .from("tunnel_daily_progress")
    .select("plan_ring_count")
    .in("tunnel_id", tunnelIds)
    .gte("progress_at", from.toISOString())
    .lt("progress_at", to.toISOString());

  if (error) throw error;

  return (data ?? []).reduce((sum, row) => sum + (row.plan_ring_count ?? 0), 0);
}