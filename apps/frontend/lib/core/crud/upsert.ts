import { createClient } from "@/lib/infra/supabase/server";
import {
  MapperTable,
  Entity,
  InsertEntity,
  TableName,
  tableOf,
  UpsertResult,
} from "../types/entity.types";

import { toDbInsert, toDbUpdate } from "@/lib/core/mapper/to-db";
import { getMapper } from "../mapper/registry";
import { mapperRegistry } from "../mapper/mapper-registry";

export async function upsertOne<T extends MapperTable>(
  table: T,
  data: InsertEntity<T>
): Promise<UpsertResult<T>> {
  const supabase = await createClient();

  const mapper = mapperRegistry[table];

  if (!mapper) {
    throw new Error(`No mapper for table: ${table}`);
  }

  const dbData = mapper.toInsert(data);

  const { data: result, error } = await supabase
    .from(tableOf(table))
    .upsert([dbData], {
      onConflict: mapper.conflict ?? "code",
    })
    .select("*")
    .single();

  if (error) throw error;

  return result as UpsertResult<T>;
}
