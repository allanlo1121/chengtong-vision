// import { TableName, TableSchemaMap, SchemaRowType } from "@/modules/shared/types";
// import { insertExternalMap, insertOrganizationExternalMap, upsertRowByCode } from "../repositories/import.repository";
// import { Result } from "@/modules/shared/contracts";
// import { ImportConfig, ImportPersistResult, ImportRow,  UpsertResult } from "../types";
// import { ImportRowMap } from "../types/improt-row-map.types";

// export async function importRowsService<T extends TableName>(
//   config: ImportConfig<T>,
//   rows: ImportRow<T>[]

// ): Promise<Result<ImportPersistResult<UpsertResult>>> {

//   console.log("Importing data to table service:", config.entity, rows);

// const result: ImportPersistResult<UpsertResult> = {
//   errors: [],
//   items: [],
//   total: rows.length,
// };

// for (const row of rows) {
//   const { raw,data } = row;

//   if (!data.code) {
//     throw new Error("每行数据必须包含 code 字段");
//   }
//   try {        // 简单校验 code 格式，例如必须为大写字母和数字
//     // 1️⃣ 主表
//     const result = await upsertRowByCode(config.entity, data);

//     if (!result) {
//       throw new Error(`Upsert 失败，code: ${data.code}`);
//     }

//     const externalId = raw[config.externalIdField || "org_code"];

//     if (externalId) {
//       // 2️⃣ 外部 ID 映射表
//       await insertExternalMap({
//         entity_type: config.entity,
//         entity_id: result.id,
//         external_id: externalId,
//         external_source: config.externalSource ?? "import"
//       });
//     }

//       // 3️⃣ import_record
//   await insertImportRecord({
//     batch_id,
//     entity_type: config.entity,
//     entity_id: result.id,
//     external_id: externalId,
//     status: "success",
//     import_json: raw,
//     mapped_json: data,
//   });

// } catch (err: any) {

//   await insertImportRecord({
//     batch_id,
//     entity_type: config.entity,
//     status: "failed",
//     import_json: raw,
//     error_json: [{ message: err.message }],
//   });
// }

// return {
//   success: result.errors.length === 0,
//   data: {
//     errors: result.errors,
//     items: result.items,
//     total: result.total,
//   },

// }

// const result = await upsertRowsByCode(config.entity, rows);

// const rawMap = new Map(raws.map((r) => [r.org_code, r.org_id]));

// const mappingRows = result.items
//   .map((r) => ({
//     organization_id: r.id,
//     external_id: rawMap.get(r.code),
//   }))
//   .filter((r) => r.external_id);

// if (mappingRows.length > 0) {
//   await insertOrganizationExternalMap(mappingRows);
// }

//   return {
//     success: true,
//     data: result,
//   };
// }

// }
