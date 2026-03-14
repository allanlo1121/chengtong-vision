// import { createClient } from "@/lib/core/supabase/client";
// import { z } from "zod";
// import { TableName, TableSchemaMap } from "../types";
// import { camelToSnake, snakeToCamel } from "../utils/case-converter";
// import { ImportResult } from "../contracts";

// export async function upsertRowsByCode<T extends TableName>(
//   table: T,
//   data: z.infer<(typeof TableSchemaMap)[T]>[]
// ): Promise<ImportResult<z.infer<(typeof TableSchemaMap)[T]>>> {
//   console.log("Importing data to table repository:", table, data);
//   const supabase = await createClient()

//   const rows = camelToSnake(data)

//   console.log("Upserting rows to table:", table, rows);

//   const { data: result, error } = await supabase
//     .from(table)
//     .upsert(rows, {
//       onConflict: "code"
//     })
//     .select()

//   if (error) throw error

//   const records = snakeToCamel(result) as z.infer<(typeof TableSchemaMap)[T]>[]

//   return {
//     items: records,
//     total: records.length
//   }

// }
