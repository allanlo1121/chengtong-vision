import { loadLookups } from "../processors/lookup-engine";
import { mapFields } from "../processors/field-mapper";
import { validateRows } from "../processors/zod-validator";
import { ImportConfig, ImportPreviewResult } from "../types";
import { TableName } from "@/modules/shared/types";
import { computeLevel } from "../utils/compute-level";

export async function prepareImportRows<T extends TableName>(
  rows: Record<string, any>[],
  config: ImportConfig<T>
): Promise<ImportPreviewResult<T>[]> {
  // 1️⃣ 加载 lookup 数据
  const lookupMaps = await loadLookups(config.lookups);

  // 2️⃣ 字段映射

  const mappedRows = rows.map((row) => mapFields(row, config.fields, config.lookups, lookupMaps));

  // 计算层级
  // 1️⃣ 获取 schema 中的层级字段（如果有）

  // 3️⃣ schema 校验
  const validated = validateRows(mappedRows, config.schema);

  const levelField = Object.entries(config.fields).find(([_, target]) => target === "path")?.[0];

  if (!levelField) {
    return validated;
  }

  return validated.map((item) => {
    const path = item.row?.path;

    return {
      ...item,
      level: path ? computeLevel(path) : undefined,
    };
  });
}
