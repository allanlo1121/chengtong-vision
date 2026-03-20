import { createClient } from "@/lib/infra/supabase/server";
import { Entity, InsertEntity, TableName, tableOf } from "../types/entity.types";

import { toDbInsert, toDbUpdate } from "@/lib/core/mapper/to-db";
import { fromDb } from "../mapper/base-mapper";
import { getMapper } from "../mapper/registry";

export async function insertOne<T extends TableName>(table: T, data: InsertEntity<T>) {
  const supabase = await createClient();

  const dbData = toDbInsert(table, data);

  const { data: result, error } = await supabase
    .from(tableOf(table))
    .insert([dbData])
    .select("*")
    .single();

  if (error) throw error;

  return result;
}

export async function insertMany<T extends TableName>(table: T, data: InsertEntity<T>[]) {
  const supabase = await createClient();
  const dbData = data.map((d) => toDbInsert(table, d));

  const { data: result, error } = await supabase.from(tableOf(table)).insert(dbData).select("*");

  if (error) throw error;

  return result;
}
