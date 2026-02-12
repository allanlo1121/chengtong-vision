// lib/master-data/getMasterOptions.ts

import { createClient } from "../supabase/server";

export async function getMasterOptions(category: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("master_data")
    .select("code, name, sort_order")
    .eq("category", category)
    .order("sort_order");

  if (error) throw error;
  return data;
}
