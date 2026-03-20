import { createRepository } from "@/lib/infra/repositories/create.repository";

// export async function insetImportBatch(input: { entityType: string; total: number }) {
//     const importRepo = await createRepository<"import_batches">("import_batches");

//     const data = await importRepo.insert({
//         entityType: input.entityType,
//         total: input.total,
//         success: 0,
//         failed: 0,
//         status: "pending",
//     });

//     if (!data) {
//         return {
//             success: false,
//             message: "导入批次创建失败",
//         };
//     }

//     return {
//         success: true,
//         data,
//     };
// }

export async function insertExternalMap(row: {
  entityType: string;
  entityId: string;
  externalId: string;
  externalSource: string;
}) {
  const externalRepo = await createRepository<"external_maps">("external_maps");

  const data = await externalRepo.insert(row);

  if (!data) {
    return {
      success: false,
      message: "插入外部映射关系失败",
    };
  }

  return {
    success: true,
    data,
  };
}

export async function insertImportRecord(row: {
  batchId: string;
  entityType: string;
  entityId?: string;
  externalId?: string;
  status: "success" | "failed";
  importJson: Record<string, any>;
  mappedJson?: Record<string, any>;
  errorJson?: Record<string, any>;
}) {
  const recordRepo = await createRepository<"import_records">("import_records");
  const data = await recordRepo.insert(row);

  if (!data) {
    return {
      success: false,
      message: "插入导入记录失败",
    };
  }
  return {
    success: true,
    data,
  };
}
