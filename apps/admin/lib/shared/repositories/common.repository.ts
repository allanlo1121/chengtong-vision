// import { SchemaName, TableEntity, TableKey, TableName } from "@/lib/core/types/entity.types";
// import { assertNoError } from "@/lib/infra/repositories/base.repository";
// import { createClient } from "@/lib/infra/supabase/server";

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

// export async function getVersionsByCodes<T extends TableEntity>(
//   entity: T,
//   codes: string[]
// ): Promise<Map<string, number>> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from(entity)
//     .select("code, external_version")
//     .in("code", codes);

//   assertNoError(error);

//   const map = new Map<string, number>();

//   for (const row of data ?? []) {
//     map.set(row.code, row.external_version ?? 0);
//   }

//   return map;
// }

// export async function getVersionsByCode<
//   S extends SchemaName,
//   T extends TableName<S>
// >(
//   entity: TableKey<S, T>,
//   code: string
// ): Promise<{ id: string | null; version: number | null }> {

//   const supabase = await createClient();
//   console.log(await supabase.auth.getUser());
//   console.log("Getting versions by code for entity:", entity, "code:", code);

//   const { data, error } = await supabase
//     .schema(entity.schema)
//     .from(entity.table as string)
//     .select("id,code,external_version")
//     .eq("code", code);

//   console.log("Version query result for code", code, ":", data, "error:", error);

//   assertNoError(error);

//   if (data && data.length > 0) {
//     return {
//       id: data[0].id ?? null,
//       version: data[0].external_version ?? null,
//     };
//   }

//   return { id: null, version: null };
// }
