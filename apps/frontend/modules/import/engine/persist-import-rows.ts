import { ImportConfig, ImportResult } from "../types";

export async function persistImportRows(results: ImportResult[], table: string) {
  const rows = results.filter((r) => r.success).map((r) => r.row);

  if (rows.length === 0) {
    return { inserted: 0 };
  }

  console.log("Persisting rows to table:", table, rows);

  // const { error } = await supabase
  //     .from(table)
  //     .insert(rows)

  // if (error) throw error

  return { inserted: rows.length };
}
