// services/tunnels/queries.ts
import { createClient } from "@frontend/lib/supabase/server";
import { SupabaseTunnelOverviewRaw } from "./types";
import { mapTunnelOverview } from "./mapper";

export async function fetchTunnels() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_tunnels_overview").select("*");
  if (error) throw error;

  return (data as SupabaseTunnelOverviewRaw[]).map(mapTunnelOverview);
}
