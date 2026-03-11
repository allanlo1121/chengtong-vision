import { createClient } from "@/lib/core/supabase/server";
import { z } from "zod";
import { TableName, TableSchemaMap } from "../types";

export async function upsertRowsByCode<T extends TableName>(
  table: T,
  rows: z.infer<(typeof TableSchemaMap)[T]>[]
) {
  const supabase = await createClient();

  const { error } = await supabase.from(table).upsert(rows, {
    onConflict: "code",
  });

  if (error) throw error;
}
