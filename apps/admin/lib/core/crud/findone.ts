// import { createClient } from "@/lib/infra/supabase/server";

// import {
//   TableInsert,
//   TableRow,
//   TableKey
// }
//   from "../types/entity.types";

// import { assertNoError } from "@/lib/infra/repositories/base.repository";
// import { typedEntries } from "../../utils";

// export async function findOne<T extends TableKey>(
//   target: T,
//   match: Partial<TableRow<T>>
// ): Promise<TableRow<T> | null> {
//   const supabase = await createClient();

//   let query = supabase
//     .schema(target.schema)
//     .from(target.table)
//     .select("*");

//   for (const [key, value] of typedEntries(match)) {
//     if (value !== undefined) {
//       query = query.eq(key as string, value);
//     }
//   }

//   const { data, error } = await query.limit(1).maybeSingle();

//   assertNoError(error);

//   return data ?? null;
// }
