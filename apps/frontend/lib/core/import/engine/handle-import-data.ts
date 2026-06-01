import { ImportRowMap } from "../types";
import { ImportValidateResult } from "../types";
import { importRegistry } from "../registry/import.registry";
import { buildLookupMaps } from "./build-lookup-maps";
import { formatZodError } from "@/lib/utils/zod/format-zod-error";
import { TableEntity } from "@/lib/core/database/types/entity.types";

export async function handleImportData<T extends TableEntity>(
  entity: T,
  raws: ImportRowMap[T][]
): Promise<ImportValidateResult<T>> {
  if (!raws?.length) {
    return { validRows: [], failedRows: [] };
  }

  // 1️⃣ 加载 lookup（建议后面加缓存）
  const config = importRegistry[entity];

  // console.log("===handleImportData config===");
  // console.log("config", config);

  const maps = config.requiredLookups ? await buildLookupMaps(config.requiredLookups) : {};

  console.log("===handleImportData maps===");
  console.log("maps", maps);

  const ctx = { maps };

  const valid: ImportValidateResult<T>["validRows"] = [];
  const failed: ImportValidateResult<T>["failedRows"] = [];

  // 2️⃣ 逐行处理（关键：保留 raw + errors）
  for (const raw of raws) {
    try {
      // 2.1 字段映射（raw → schema data）
      const mapped = config.mapper(raw);

      // 2️⃣ lookup
      const enriched = config.lookups ? { ...mapped, ...(await config.lookups(raw, ctx)) } : mapped;

      // console.log("===handleImportData enriched===");
      // console.log("enriched", enriched);
      // 2.2 schema 校验（建议 safeParse）
      const parsed = config.schema.safeParse(enriched);

      if (parsed.success) {
        valid.push({
          raw,
          data: parsed.data,
        });
      } else {
        failed.push({
          raw,
          errors: formatZodError(parsed.error),
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

  console.log("valid", valid);
  console.log("failed", failed);

  return { validRows: valid, failedRows: failed };
}
