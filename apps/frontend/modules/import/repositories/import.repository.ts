import { createClient } from "@/lib/core/supabase/server";
import {
  ImportError,
  ImportPersistResult,
  LookupItem,
  UpsertResult,
  ImportRow,
  SyncImportResult,
} from "../types";
import { SchemaRowType, TableName } from "@/modules/shared/types";
import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function upsertRowByCode<T extends TableName>(
  table: T,
  row: SchemaRowType<T>
): Promise<UpsertResult> {
  const supabase = await createClient();

  const dbRow = camelToSnake(row);

  const { code } = dbRow as any;

  if (!code) {
    throw new Error(`Row must have a 'code' field for upsert by code`);
  }

  // 查看是否存在
  const { data: existing, error: selectError } = await supabase
    .from(table)
    .select("id")
    .eq("code", code)
    .single();

  assertNoError(selectError);

  if (existing) {
    // 已存在，执行更新
    const { data, error } = await supabase
      .from(table)
      .update(dbRow)
      .eq("code", code)
      .select("id, code")
      .single();

    assertNoError(error);

    return data as UpsertResult;
  }

  // 不存在，执行插入

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

export async function syncEntityAuto<T extends TableName>(
  table: T,
  p_rows: SchemaRowType<T>[]
): Promise<any> {
  const supabase = await createClient();

  const dbRow = camelToSnake(p_rows);

  const { data, error } = await supabase.rpc("sync_entity_auto", {
    p_table: table,
    p_rows: dbRow,
  });

  assertNoError(error);

  return data;
}

export async function syncEntityWithRecord<T extends TableName>(
  table: T,
  p_rows: ImportRow<T>[]
): Promise<SyncImportResult> {
  const supabase = await createClient();

  console.log("syncEntityWithRecord called with table:", table, "rows:", p_rows);

  const payload = p_rows.map((r) => ({
    raw: r.raw,
    data: camelToSnake(r.data),
  }));

  console.log("Payload for RPC:", payload);

  const { data, error } = await supabase.rpc("sync_entity_with_record", {
    p_table: table,
    p_rows: payload,
  });

  console.log("RPC result:", { data, error });

  assertNoError(error);

  return {
    total: p_rows.length,
    inserted: data?.inserted ?? 0,
    updated: data?.updated ?? 0,
    failed: data?.failed ?? 0,
    skipped: data?.skipped ?? 0,
  };
}
