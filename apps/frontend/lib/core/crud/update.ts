// import { createClient } from "@/lib/infra/supabase/server";

// import {

//   TableKey,
//   TableRow,
//   TableUpdate
// } from "../types/entity.types";

// import { assertNoError } from "@/lib/infra/repositories/base.repository";
// import { typedEntries } from "../../utils";

// export async function updateOne<T extends TableKey>(
//   target: T,
//   match: Partial<TableRow<T>>,
//   data: TableUpdate<T>
// ): Promise<TableRow<T>> {
//   const supabase = await createClient();

//   let query = supabase
//     .schema(target.schema)
//     .from(target.table)
//     .update(data);

//   for (const [key, value] of typedEntries(match)) {
//     if (value !== undefined) {
//       query = query.eq(key as string, value);
//     }
//   }

//   const { data: result, error } = await query
//     .select("*")
//     .limit(1)
//     .single();

//   assertNoError(error);

//   if (!result) {
//     throw new Error(
//       `Update failed: ${target.schema}.${String(target.table)}`
//     );
//   }

//   return result;
// }
