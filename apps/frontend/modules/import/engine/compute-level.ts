import { ImportConfig, ImportPreviewResult } from "../types";
import { TableName } from "@/modules/shared/types";
import { ImportRowMap } from "../types/improt-row-map.types";

export function computeLevelFromImportRow<T extends TableName>(
  row: Record<keyof ImportRowMap[T], any>
) {
  const code = row["org_code"];

  if (typeof code !== "string") return 0;

  return code.split("-").filter(Boolean).length;
}
