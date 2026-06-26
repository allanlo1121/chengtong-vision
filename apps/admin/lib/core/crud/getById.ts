// import { createClient } from "@/lib/infra/supabase/server";
// import { Entity, TableName, tableOf } from "../types/entity.types";
// import { fromDbEntity } from "../mapper/from-db";

// export async function getById<T extends TableName>(
//   table: T,
//   id: string
// ): Promise<Entity<T> | null> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from(tableOf(table))
//     .select("*")
//     .eq("id", id)
//     .maybeSingle(); // ⭐ 推荐

//   if (error) throw error;

//   if (!data) return null;

//   return fromDbEntity(table, data);
// }
