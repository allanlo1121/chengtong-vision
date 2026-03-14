import { importEntitiesAction } from "../actions/import.action";
import { ImportPersistResult, ImportPreviewResult } from "../types";

import { TableName, RowType } from "@/modules/shared/types";

import { Result } from "@/modules/shared/contracts";

export async function persistImportRows<T extends TableName>(
  table: T,
  rows: RowType<T>[]
): Promise<Result<ImportPersistResult<RowType<T>>>> {
  if (rows.length === 0) {
    return {
      success: false,
      message: "没有有效数据可供导入",
    };
  }

  const result = await importEntitiesAction<T>(table, rows);
  return result;
}
