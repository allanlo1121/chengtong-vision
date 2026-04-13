// import { createClient } from "@/lib/infra/supabase/server";

// import {
//   TableInsert,
//   TableRow,
//   TableKey,
//   InsertData
// }
//   from "../types/entity.types";

// import { assertNoError } from "@/lib/infra/repositories/base.repository";

// function typedEntries<T extends object>(
//   obj: T
// ): [keyof T, T[keyof T]][] {
//   return Object.entries(obj) as any;
// }

// export async function insertOne<T extends TableKey>(
//   target: T,
//   data: InsertData<T>
// ): Promise<TableRow<T>> {
//   const supabase = await createClient();

//   const { data: result, error } = await supabase
//     .schema(target.schema)
//     .from(target.table)
//     .insert(data)
//     .select("*")
//     .single();

//   assertNoError(error);

//   if (!result) {
//     throw new Error(
//       `Insert failed: ${target.schema}.${String(target.table)}`
//     );
//   }

//   return result;
// }
