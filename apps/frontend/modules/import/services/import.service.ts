import { TableName, TableSchemaMap, RowType } from "@/modules/shared/types";
import { upsertRowsByCode } from "../repositories/import.repository";
import { Result } from "@/modules/shared/contracts";
import { ImportPersistResult } from "../types";

export async function importEntities<T extends TableName>(
  table: T,
  data: RowType<T>[]
): Promise<Result<ImportPersistResult<RowType<T>>>> {
  try {
    console.log("Importing data to table service:", table, data);

    const result = await upsertRowsByCode(table, data);

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
