"use server";

import { SchemaRowType, TableName } from "@/modules/shared/types/common.types";
import { importRowsService } from "../services/import.service";
import { Result } from "@/modules/shared/contracts";
import { ImportConfig, ImportPersistResult, ImportRow } from "../types";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function importEntitiesAction<T extends TableName>(
  config: ImportConfig<T>,
  rows: ImportRow<T>[]
): Promise<Result<ImportPersistResult<{ id: string; code: string }>>> {
  console.log("Starting importEntitiesAction with config:", config);
  console.log("Number of rows to import:", rows.length);
  return importRowsService<T>(config, rows);
}
