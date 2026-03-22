import { createClient } from "@/lib/infra/supabase/server";
import { Database } from "@/lib/core/types/database";
import {
  Entity,
  InsertEntity,
  TableInsert,
  TableName,
  tableOf,
  TableRow,
} from "../types/entity.types";

import { toDbInsert, toDbUpdate } from "@/lib/core/mapper/to-db";
import { fromDb } from "../mapper/base-mapper";
import { getMapper } from "../mapper/registry";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { fromDbEntity } from "../mapper/from-db";

export async function insertOne<T extends TableName>(
  table: T,
  data: InsertEntity<T>
): Promise<Entity<T>> {
  const supabase = await createClient();

  const dbData = toDbInsert(table, data) as unknown as Database["public"]["Tables"][T]["Insert"];

  const { data: result, error } = await supabase
    .from(tableOf(table))
    .insert(dbData)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Insert failed: no data returned for table "${table}"`);
  }

  return fromDbEntity(table, result);
}

// export async function insertMany<T extends TableName>(table: T, data: InsertEntity<T>[]): Promise<Entity<T>[]> {
//   const supabase = await createClient();
//   const dbData = data.map((d) => toDbInsert(table, d));

//   const { data: result, error } = await supabase.from(tableOf(table)).insert(dbData).select("*");

//   assertNoError(error);

//   return result.map((r) => fromDb<Entity<T>>(r, getMapper(table)?.base));
// }
