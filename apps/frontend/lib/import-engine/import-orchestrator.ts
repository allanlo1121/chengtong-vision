import { TableName } from "@/modules/shared/types/common.types";
import { importRowsService } from "../services/import.service";
import { importBatchRepo } from "../repositories";
import { Result } from "@/modules/shared/contracts";
import { ImportConfig, ImportPersistResult, ImportRow, SyncImportResult } from "../types";
import { chunkArray } from "@/lib/utils/chunk-array";
import { processChunk } from "./processors/chunk-processor";

export async function runImport<T extends TableName>(table: T, rows: ImportRow<T>[]) {
  const batch = await importBatchRepo.create({
    tableName: table,
    totalCount: rows.length,
  });

  const chunks = chunkArray(rows, 500);

  let summary = {
    inserted: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const chunk of chunks) {
    const result = await processChunk(table, chunk, batch.id);

    summary.inserted += result.inserted;
    summary.updated += result.updated;
    summary.skipped += result.skipped;
    summary.failed += result.failed;
  }

  await importBatchRepo.finish(batch.id, summary);

  return summary;
}
