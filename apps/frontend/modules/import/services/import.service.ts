import { TableName, TableSchemaMap, SchemaRowType } from "@/modules/shared/types";

import { ImportConfig, ImportPersistResult, ImportRow, UpsertResult } from "../types";
import { ImportRowMap } from "../types/improt-row-map.types";

import { upsertRowByCode, ExternalMapRepository, ImportRecordRepository } from "../repositories";

export async function importRowsService<T extends TableName>(
  config: ImportConfig<T>,
  rows: ImportRow<T>[]
): Promise<any> {
  console.log("Importing data to table service:", config.entity, rows);

  let successCount = 0;
  let failedCount = 0;
  const errors: any[] = [];

  // ✅ 2️⃣ 循环处理
  for (const row of rows) {
    const { raw, data } = row;

    try {
      console.log("Processing row:", raw, data);

      if (!data.code) {
        throw new Error("每行数据必须包含 code 字段");
      }

      // 🔹 主表 upsert
      const result = await upsertRowByCode<T>(config.entity, data);

      if (!result) {
        throw new Error(`Upsert 失败，code: ${data.code}`);
      }

      // 🔹 externalId
      const externalIdRaw = raw[config.externalIdField || "org_code"];

      const externalId = externalIdRaw != null ? String(externalIdRaw) : undefined;

      // 🔹 外部映射
      if (externalId) {
        await ExternalMapRepository.InsertOne({
          entityType: config.entity,
          entityId: result.id,
          externalId,
          externalSource: config.externalSource ?? "import",
        });
      }

      // 🔹 成功记录
      await ImportRecordRepository.InsertOne({
        entityType: config.entity,
        entityId: result.id,
        externalId,
        status: "success",
        importJson: raw,
        mappedJson: data,
      });

      successCount++;
    } catch (err: any) {
      failedCount++;

      errors.push({
        raw,
        message: err.message,
      });

      // 🔹 失败记录
      await ImportRecordRepository.InsertOne({
        entityType: config.entity,
        status: "failed",
        importJson: raw,
        errorJson: [{ message: err.message }],
      });
    }
  }

  // ✅ 4️⃣ 返回结果
  return {
    success: failedCount === 0,
    data: {
      total: rows.length,
      successCount,
      failedCount,
      errors,
    },
  };
}
