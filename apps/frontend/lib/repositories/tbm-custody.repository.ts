import { createClient } from "../supabase/server";

export async function fetchTbmOverviewById(id: string): Promise<TbmOverview> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("v_tbms_overview").select("*").eq("id", id).single();
  if (error) throw error;
  if (!data) throw new Error("TBM not found");
  return mapTbmOverview(data as SupabaseTbmOverviewRaw);
}
