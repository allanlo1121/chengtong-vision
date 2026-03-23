import { TableName } from "@/lib/core/types/entity.types";
import { repository } from "../repositories";
import { ImportRow } from "../types";

export async function processChunk<T extends TableName>(
  table: T,
  rows: ImportRow<T>[],
  batchId: string
) {
  const codes = rows.map((r) => (r.data as any).code);

  // 1️⃣ 查 DB version
  const versionMap = await repository.getVersionsByCodes(table, codes);

  const toUpsert: any[] = [];
  const auditRows: any[] = [];

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of rows) {
    try {
      const code = (r.data as any).code;
      const incomingVersion = r.meta.externalVersion ?? 0;
      const dbVersion = versionMap.get(code);

      let status: string;

      if (dbVersion !== undefined && dbVersion >= incomingVersion) {
        status = "skipped";
        skipped++;
      } else {
        status = dbVersion ? "updated" : "inserted";

        if (status === "inserted") inserted++;
        else updated++;

        toUpsert.push({
          ...r.data,
          externalVersion: incomingVersion,
        });
      }

      auditRows.push({
        batch_id: batchId,
        table_name: table,
        raw: r.raw,
        data: r.data,
        external_version: incomingVersion,
        external_source: r.meta.externalSource,
        status,
      });
    } catch (err: any) {
      failed++;

      auditRows.push({
        batch_id: batchId,
        table_name: table,
        raw: r.raw,
        data: r.data,
        external_version: r.meta.externalVersion,
        external_source: r.meta.externalSource,
        status: "error",
        message: err.message,
      });
    }
  }

  // 2️⃣ 批量 upsert
  if (toUpsert.length > 0) {
    await repository.upsertMany(table, toUpsert);
  }

  // 3️⃣ 写审计（包含 skipped）
  await repository.insertImportRecords(table, auditRows);

  return { inserted, updated, skipped, failed };
}
