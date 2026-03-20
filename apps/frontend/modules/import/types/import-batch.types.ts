import { Camelize } from "@/modules/shared/utils/case-converter";

// DB 层（snake）
export type ImportBatchRow = {
  id: string;
  entity_type: string;
  total: number;
  success: number;
  failed: number;
  status: "running" | "done" | "failed";
  created_at?: string;
};

// Domain 层（camel）
export type ImportBatch = Camelize<ImportBatchRow>;

// ✅ 创建（DTO，不从 Entity 推导）
export type CreateImportBatch = {
  entityType: string;
  total: number;
};

// ✅ 更新（payload，不带 id）
export type UpdateImportBatch = {
  success?: number;
  failed?: number;
  status?: ImportBatch["status"];
};
