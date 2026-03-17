import { ImportConfig, ImportPreviewResult, ImportRowResult } from "../types";
import { TableName } from "@/modules/shared/types";
import { computeLevelFromImportRow } from "./compute-level";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function prepareImportRows<T extends TableName>(
  rows: Record<keyof ImportRowMap[T], any>[],
  config: ImportConfig<T>
): Promise<ImportRowResult<T>[]> {
  const rowsWithLevel = rows.map((row) => ({
    row,
    level: computeLevelFromImportRow(row),
  }));

  return rowsWithLevel.map(({ row, level }) => ({
    row,
    level,
    success: true,
    errors: null,
  }));
}
