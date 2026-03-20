import { createClient } from "@/lib/core/supabase/server";
import { ImportError, ImportPersistResult, LookupItem, UpsertResult } from "../types";
import { SchemaRowType, TableName } from "@/modules/shared/types";

import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function upsertRowByCode<T extends TableName>(
  table: T,
  row: SchemaRowType<T>
): Promise<UpsertResult> {
  const supabase = await createClient();

  const dbRow = camelToSnake(row);

  const { data, error } = await supabase
    .from(table)
    .upsert(dbRow, {
      onConflict: "code",
    })
    .select("id, code")
    .single();

  assertNoError(error);

  return data as UpsertResult;
}
