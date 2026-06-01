import { createClient } from "@/lib/infra/supabase/server";

import { TableEntity } from "@/lib/core/database/types/entity.types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

async function insertImportRecords<T extends TableEntity>(
  table: T,
  rows: {
    raw: any;
    data: any;
  }[]
) {
  const supabase = await createClient();
  const payload = rows.map((r) => ({
    table_name: table,
    raw: r.raw,
    data: r.data,
    external_version: r.data.externalVersion,
  }));

  const { error } = await supabase.schema("public").from("import_records").insert(payload);

  assertNoError(error);
}

export const repository = {
  // upsertMany,
  insertImportRecords,
};
