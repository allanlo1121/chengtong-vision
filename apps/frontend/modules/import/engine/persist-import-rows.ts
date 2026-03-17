import { importEntitiesAction } from "../actions/import.action";
import { ImportPersistResult, ImportPreviewResult } from "../types";

import { TableName, SchemaRowType } from "@/modules/shared/types";

import { Result } from "@/modules/shared/contracts";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function persistImportRows<T extends TableName>(
  table: T,
  raws: Record<keyof ImportRowMap[T], any>[],
  rows: SchemaRowType<T>[]
): Promise<Result<ImportPersistResult<{ id: string; code: string }>>> {
  if (rows.length === 0) {
    return {
      success: false,
      message: "没有有效数据可供导入",
    };
  }

  const result = await importEntitiesAction<T>(table, raws, rows);
  return result;
}
