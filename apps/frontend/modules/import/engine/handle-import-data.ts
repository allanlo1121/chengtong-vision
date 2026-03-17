import { loadLookups } from "../processors/lookup-engine";
import { mapFields } from "../processors/field-mapper";
import { validateRow } from "../processors/zod-validator";
import { ImportConfig, ImportPreviewResult } from "../types";
import { SchemaRowType, TableName } from "@/modules/shared/types";
import { ImportRowMap } from "../types/improt-row-map.types";
import { ImportValidateResult } from "../types";

export async function handleImportData<T extends TableName>(
  raws: Record<keyof ImportRowMap[T], any>[],
  config: ImportConfig<T>
): Promise<ImportValidateResult<T>> {
  if (!raws?.length) {
    return { validRows: [], failedRows: [] };
  }

  // 1️⃣ 加载 lookup（建议后面加缓存）
  const lookupMaps = await loadLookups(config.lookups);

  const valid: ImportValidateResult<T>["validRows"] = [];
  const failed: ImportValidateResult<T>["failedRows"] = [];

  // 2️⃣ 逐行处理（关键：保留 raw + errors）
  for (const raw of raws) {
    try {
      // 2.1 字段映射（raw → schema data）
      const mapped = mapFields(
        raw,
        config.fields,
        config.lookups,
        lookupMaps,
        config.extraFields ?? {}
      );

      // 2.2 schema 校验（建议 safeParse）
      const parsed = validateRow(mapped, config.schema);

      if (parsed.success) {
        valid.push({
          raw,
          data: parsed.row,
        });
      } else {
        failed.push({
          raw,
          errors: parsed.errors ?? [],
        });
      }
    } catch (err: any) {
      // 2.3 兜底错误（比如 lookup 抛异常）
      failed.push({
        raw,
        errors: [{ message: err.message ?? "未知错误" }],
      });
    }
  }

  // console.log("valid",valid);
  // console.log("failed",failed);

  return { validRows: valid, failedRows: failed };
}
