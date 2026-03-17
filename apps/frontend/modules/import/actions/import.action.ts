import { SchemaRowType, TableName } from "@/modules/shared/types/common.types";
import { importRowsService } from "../services/import.service";
import { Result } from "@/modules/shared/contracts";
import { ImportConfig, ImportPersistResult, ImportRow } from "../types";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function importEntitiesAction<T extends TableName>(
  config: ImportConfig<T>,
  rows: ImportRow<T>[]
): Promise<Result<ImportPersistResult<{ id: string; code: string }>>> {
  return importRowsService(config, rows);
}
