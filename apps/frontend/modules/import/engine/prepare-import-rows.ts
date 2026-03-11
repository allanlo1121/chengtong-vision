import { loadLookups } from "../lookup/lookup-engine";
import { mapFields } from "../mapper/field-mapper";
import { validateRows } from "../validator/zod-validator";
import { ImportConfig, ImportResult } from "../types";

export async function prepareImportRows<T>(
  rows: any[],
  config: ImportConfig
): Promise<ImportResult<T>[]> {
  // 1️⃣ 加载 lookup
  const lookups = await loadLookups(config.lookups);

  // 2️⃣ 字段映射

  const mappedRows = rows.map((row) => mapFields(row, config, lookups));

  // 3️⃣ schema 校验
  const validated = validateRows(mappedRows, config.schema);

  return validated;
}
