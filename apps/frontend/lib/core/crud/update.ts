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

export async function update<T extends TableName>(
  table: T,
  id: string,
  data: InsertEntity<T>
): Promise<Entity<T>> {
  const supabase = await createClient();

  const dbData = toDbUpdate(table, data) as unknown as Database["public"]["Tables"][T]["Update"];

  const { data: result, error } = await supabase
    .from(tableOf(table))
    .update(dbData)
    .select("*")
    .single();

  assertNoError(error);

  if (!result) {
    throw new Error(`Update failed: no data returned for table "${table}"`);
  }

  return fromDbEntity(table, result);
}
