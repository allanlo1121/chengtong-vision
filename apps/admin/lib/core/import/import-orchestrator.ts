"use server";

import { importBatchRepo } from "./repositories";
import { Result } from "@/lib/shared/contracts";
import { ImportRow, SyncImportResult } from "./types";
import { chunkArray } from "@/lib/utils/chunk-array";
import { processChunk } from "./processors/chunk-processor";
import { TableEntity } from "@/lib/core/database/types/entity.types";

export async function runImport<T extends TableEntity>(
  entity: T,
  rows: ImportRow<T>[]
): Promise<Result<SyncImportResult>> {
  // console.log("Starting runImport with entity:", entity);
  // console.log(" rows to import:", rows);
  const batch = await importBatchRepo.create({
    tableName: entity,
    totalCount: rows.length,
  });

  const chunks = chunkArray(rows, 50);

  let summary = {
    inserted: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const chunk of chunks) {
    const result = await processChunk(entity, chunk, batch.id);

    summary.inserted += result.inserted;
    summary.updated += result.updated;
    summary.skipped += result.skipped;
    summary.failed += result.failed;
  }

  await importBatchRepo.finish(batch.id, summary);

  return { success: true, data: summary };
}
