import { TableName } from "@/modules/shared/types";
import { persistImportRows } from "./persist-import-rows";
import { ImportRowMap } from "../types/improt-row-map.types";

export async function importValidatorData<T extends TableName>(
  entity: T,
  raws: Record<keyof ImportRowMap[T], any>[],
  previewRows: any[]
) {
  const successRows = previewRows.filter((r) => r.success).map((r) => r.row);

  if (!successRows.length) {
    return {
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  const res = await persistImportRows(entity, raws, successRows);

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
}
