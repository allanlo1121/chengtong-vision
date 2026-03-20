import { createClient } from "@/lib/infra/supabase/server";
import { getMapper } from "@/lib/core/mapper/registry";
import { toDbInsert, toDbUpdate } from "@/lib/core/mapper/to-db";

import { Entity, TableName, tableOf } from "@/lib/core/types/entity.types";
import { Repository } from "./base.repository";
import { fromDb, toDb } from "@/lib/core/mapper/base-mapper";
import { fromDbEntity } from "@/lib/core/mapper/from-db";

export function createRepository<T extends TableName>(table: T): Repository<T> {
  const mapper = getMapper(table);

  return {
    // ========================
    // INSERT
    // ========================
    async insert(data) {
      const supabase = await createClient();

      const dbData = toDbInsert<T>(table, data);

      const { data: result, error } = await supabase
        .from(tableOf(table))
        .insert([dbData])
        .select("*")
        .single();

      if (error) throw error;

      return fromDbEntity(table, result);
    },

    // ========================
    // UPDATE
    // ========================
    async update(id, data) {
      const supabase = await createClient();

      const dbData = toDbUpdate<T>(table, data);

      const { data: result, error } = await supabase
        .from(tableOf(table))
        .update(dbData)
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;

      return fromDbEntity(table, result);
    },

    // ========================
    // UPSERT（按 code）
    // ========================
    async upsert(data) {
      const supabase = await createClient();

      const dbData = toDb(data, mapper.base);

      const { data: result, error } = await supabase
        .from(tableOf(table))
        .upsert(dbData, { onConflict: "code" })
        .select("*")
        .single();

      if (error) throw error;

      return fromDb<Entity<T>>(result, mapper.base);
    },

    // ========================
    // DELETE
    // ========================
    async remove(id) {
      const supabase = await createClient();

      const { error } = await supabase.from(tableOf(table)).delete().eq("id", id);

      if (error) throw error;
    },
  };
}
