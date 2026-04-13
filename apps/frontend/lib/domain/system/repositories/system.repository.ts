import { createClient } from "@/lib/core/supabase/server";

export async function softDelete(table: string, ids: string[]): Promise<number> {
  const supabase = await createClient();

  console.log("softDelete", ids);

  const { data, error } = await supabase.rpc("soft_delete", {
    p_table: table,
    p_ids: ids,
  });

  if (error) throw error;

  console.log("softDelete", error);

  return data ?? 0;
}
