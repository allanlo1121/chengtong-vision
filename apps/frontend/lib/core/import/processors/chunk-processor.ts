import { repository } from "../repositories";
import { ImportRow } from "../types";
import { importRegistry } from "../registry/import.registry";
import { TableEntity } from "@/lib/core/types/entity.types";

export async function processChunk<T extends TableEntity>(
  entity: T,
  rows: ImportRow<T>[],
  batchId: string
) {
  const config = importRegistry[entity];

  const auditRows: any[] = [];

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of rows) {
    try {
      const data = await config.writer(r.data);

      if (!data.success) {
        failed++;

        auditRows.push({
          batch_id: batchId,
          table_name: entity,
          raw: r.raw,
          data: r.data,
          external_version: r.data.externalVersion,
          external_source: "MDM",
          status: "error",
          message: data.error.message,
        });

        continue;
      }

      if (data.action === "skipped") {
        skipped++;
      } else if (data.action === "inserted") {
        inserted++;
      } else if (data.action === "updated") {
        updated++;
      }

      auditRows.push({
        batch_id: batchId,
        table_name: entity,
        raw: r.raw,
        data: r.data,
        external_version: r.data.externalVersion,
        external_source: "MDM",
        status: "ready",
      });
    } catch (err: any) {
      failed++;

      auditRows.push({
        batch_id: batchId,
        table_name: entity,
        raw: r.raw,
        data: r.data,
        external_version: r.data.externalVersion,
        external_source: "MDM",
        status: "error",
        message: err.message,
      });
    }
  }

  // 3️⃣ 写审计（包含 skipped）
  await repository.insertImportRecords(entity, auditRows);

  return { inserted, updated, skipped, failed };
}
