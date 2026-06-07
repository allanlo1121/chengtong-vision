import { ImportBatch, ImportBatchRow } from "../types";

export function mapImportBatch(row: ImportBatchRow): ImportBatch {
  return {
    id: row.id,
    tableName: row.table_name,
    totalCount: row.total_count,
    insertedCount: row.inserted_count,
    updatedCount: row.updated_count,
    skippedCount: row.skipped_count,
    failedCount: row.failed_count,
    status: row.status,
    finishedAt: row.finished_at,
    startedAt: row.started_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}
