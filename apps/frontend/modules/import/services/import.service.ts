import { TableName, TableSchemaMap, SchemaRowType } from "@/modules/shared/types";
import { insertOrganizationExternalMap, upsertRowsByCode } from "../repositories/import.repository";
import { Result } from "@/modules/shared/contracts";
import { ImportPersistResult } from "../types";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function importEntities<T extends TableName>(
  table: T,
  raws: Record<keyof ImportRowMap[T], any>[],
  rows: SchemaRowType<T>[]
): Promise<Result<ImportPersistResult<{ id: string; code: string }>>> {
  try {
    console.log("Importing data to table service:", table, raws, rows);

    const result = await upsertRowsByCode(table, rows);

    const rawMap = new Map(raws.map((r) => [r.org_code, r.org_id]));

    const mappingRows = result.items
      .map((r) => ({
        organization_id: r.id,
        external_id: rawMap.get(r.code),
      }))
      .filter((r) => r.external_id);

    if (mappingRows.length > 0) {
      await insertOrganizationExternalMap(mappingRows);
    }

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
