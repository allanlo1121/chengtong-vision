// services/tunnels/queries.ts
import { createClient } from "@frontend/lib/supabase/server";
import { SupabaseTbmConnectivityOverviewRaw } from "./types";
import { mapTbmConnectivityOverview } from "./mapper";

export async function fetchTbmConnectivity() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_tbm_active_connectivity").select("*");
  if (error) throw error;

  return (data as SupabaseTbmConnectivityOverviewRaw[]).map(mapTbmConnectivityOverview);
}
