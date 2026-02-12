// services/projects/queries.ts
import { createClient } from "@frontend/lib/supabase/server";
import { SupabaseProjectOverviewRaw } from "./types";
import { mapProjectOverview } from "./mapper";

export async function fetchProjects(params: { projectStatusIds?: string[] }) {
  const supabase = await createClient();
  let query = supabase.from("v_projects_overview").select("*");

  if (params.projectStatusIds?.length) {
    query = query.in("project_status_id", params.projectStatusIds);
  }

  const { data, error } = await query;
  if (error) throw error;

  console.log("v_projects_overview", data);

  return (data as SupabaseProjectOverviewRaw[]).map(mapProjectOverview);
}
