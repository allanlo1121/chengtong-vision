// import { TableName, TableSchemaMap, SchemaRowType } from "@/modules/shared/types";
// import { insertExternalMap } from "./import-record.service";

// import { insertImportRecord } from "./import-record.service";

// import { ImportConfig, ImportPersistResult, ImportRow, UpsertResult } from "../types";
// import { ImportRowMap } from "../types/improt-row-map.types";

// import { upsertOne } from "@/lib/core/crud/upsert";

// export async function processRow<T extends TableName>(
//     config: ImportConfig<T>,
//     row: ImportRow<T>,
//     batchId: string
// ): Promise<{ success: boolean; error?: { raw: any; message: string } }> {
//     const { raw, data } = row;

//     try {
//         if (!data.code) {
//             throw new Error("缺少 code");
//         }

//         // 1️⃣ upsert
//         const result = await upsertOne(config.entity, data);

//         if (!result) {
//             throw new Error("Upsert 失败");
//         }

//         // 2️⃣ externalId
//         const externalField = config.externalIdField ?? "org_code";
//         const externalId = raw[externalField];

//         if (externalId) {
//             await insertExternalMap({
//                 entityType: config.entity,
//                 entityId: result.id,
//                 externalId,
//                 externalSource: config.externalSource ?? "import",
//             });
//         }

//         // 3️⃣ 成功记录
//         await insertImportRecord({
//             batchId,
//             entityType: config.entity,
//             entityId: result.id,
//             externalId,
//             status: "success",
//             importJson: raw,
//             mappedJson: data,
//         });

//         return { success: true };

//     } catch (err: any) {
//         await insertImportRecord({
//             batchId,
//             entityType: config.entity,
//             status: "failed",
//             importJson: raw,
//             errorJson: [{ message: err.message }],
//         });

//         return {
//             success: false,
//             error: {
//                 raw,
//                 message: err.message,
//             },
//         };
//     }
// }
