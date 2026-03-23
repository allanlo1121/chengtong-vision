import { createClient } from "@/lib/infra/supabase/server";
import {
  Entity,
  InsertEntity,
  TableName,
  tableOf,
  UpsertResult,
  UpsertEntity,
} from "../types/entity.types";
import { toDb } from "../mapper/base-mapper";

import { mapperRegistry, type MapperTable } from "../mapper/mapper-registry";

export async function upsertOne<T extends MapperTable>(
  table: T,
  data: UpsertEntity<T>
): Promise<UpsertResult<T>> {
  const supabase = await createClient();

  const mapper = mapperRegistry[table];

  if (!mapper) {
    throw new Error(`No mapper for table: ${table}`);
  }

  const dbData = toDb(data);

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
