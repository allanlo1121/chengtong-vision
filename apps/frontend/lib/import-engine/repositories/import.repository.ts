import { createClient } from "@/lib/core/supabase/server";
import {
  ImportError,
  ImportPersistResult,
  LookupItem,
  UpsertResult,
  ImportRow,
  SyncImportResult,
} from "../types";
import { TableName } from "@/lib/core/types/entity.types";
import { camelToSnake, snakeToCamel } from "@/modules/shared/utils/case-converter";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

async function getVersionsByCodes<T extends TableName>(
  table: T,
  codes: string[]
): Promise<Map<string, number>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(table)
    .select("code, external_version")
    .in("code", codes);

  assertNoError(error);

  const map = new Map<string, number>();

  for (const row of data ?? []) {
    map.set(row.code, row.external_version ?? 0);
  }

  return map;
}
async function upsertMany<T extends TableName>(table: T, rows: any[]) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).upsert(rows, {
    onConflict: "code",
  });

  assertNoError(error);
}

async function insertImportRecords<T extends TableName>(
  table: T,
  rows: {
    raw: any;
    data: any;
    externalVersion: number;
  }[]
) {
  const supabase = await createClient();
  const payload = rows.map((r) => ({
    table_name: table,
    raw: r.raw,
    data: r.data,
    external_version: r.externalVersion,
  }));

  const { error } = await supabase.from("import_records").insert(payload);

  assertNoError(error);
}

export const repository = {
  upsertMany,
  insertImportRecords,
  getVersionsByCodes,
};
