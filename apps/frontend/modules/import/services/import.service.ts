import { TableName } from "@/modules/shared/types";
import { Result } from "@/modules/shared/contracts";
import { ImportConfig, ImportRow, SyncImportResult } from "../types";

import { syncEntityWithRecord } from "../repositories";

export async function importRowsService<T extends TableName>(
  config: ImportConfig<T>,
  rows: ImportRow<T>[]
): Promise<Result<SyncImportResult>> {
  console.log("Importing data to table service:", config.entity, rows);

  try {
    // ❗ 1️⃣ 空数据保护
    if (!rows?.length) {
      return {
        success: true,
        data: {
          total: 0,
          inserted: 0,
          updated: 0,
          failed: 0,
          skipped: 0,
        },
        message: "没有数据需要导入",
      };
    }

    // ❗ 2️⃣ 调用 RPC（核心）
    const result = await syncEntityWithRecord<T>(config.entity, rows);

    // ❗ 3️⃣ 统一 total
    const total = result.total ?? result.inserted + result.updated + result.failed + result.skipped;

    // ❗ 4️⃣ 返回统一结构（给前端）
    return {
      success: true,
      data: {
        total,
        inserted: result.inserted ?? 0,
        updated: result.updated ?? 0,
        failed: result.failed ?? 0,
        skipped: result.skipped ?? 0,
      },
    };
  } catch (err: any) {
    console.error("❌ importRowsService error:", err);

    // ❗ 5️⃣ 统一错误返回（不要 throw）
    return {
      success: false,
      message: err?.message ?? "导入失败",
    };
  }
}
