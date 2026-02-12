// lib/projects/queries.ts
import { createClient } from "../supabase/server";
import { SupabaseProjectOverviewRaw } from "./types";
import { mapProjectOverview } from "./mapper";

export async function getProjectsOverview() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("v_projects_overview").select("*");

  if (error) throw error;

  return (data as SupabaseProjectOverviewRaw[]).map(mapProjectOverview);
}
