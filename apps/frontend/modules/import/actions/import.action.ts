import { SchemaRowType, TableName } from "@/modules/shared/types/common.types";
import { importEntities } from "../services/import.service";
import { Result } from "@/modules/shared/contracts";
import { ImportPersistResult } from "../types";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function importEntitiesAction<T extends TableName>(
  table: T,
  raws: Record<keyof ImportRowMap[T], any>[],
  rows: SchemaRowType<T>[]
): Promise<Result<ImportPersistResult<{ id: string; code: string }>>> {
  return importEntities(table, raws, rows);
}
