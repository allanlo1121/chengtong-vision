import { RowType, TableName } from "@/modules/shared/types/common.types";
import { importEntities } from "../services/import.service";
import { Result } from "@/modules/shared/contracts";
import { ImportPersistResult } from "../types";

export async function importEntitiesAction<T extends TableName>(
  table: T,
  data: RowType<T>[]
): Promise<Result<ImportPersistResult<RowType<T>>>> {
  return importEntities(table, data);
}
