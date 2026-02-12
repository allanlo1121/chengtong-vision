// services/tunnels/queries.ts
import { createClient } from "@frontend/lib/supabase/server";
import { SupabaseTbmOverviewRaw, SupabaseTbmRaw } from "./types";
import { mapTbmOverview } from "./mapper";

export async function fetchTbms() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_tbms_overview").select("*");
  if (error) throw error;

  return (data as SupabaseTbmOverviewRaw[]).map(mapTbmOverview);
}
