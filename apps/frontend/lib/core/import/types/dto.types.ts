// types/dto.types.ts

import { Camelize } from "@/lib/utils/case-converter";
import { ImportBatch, ImportRecordInsert, ImportRecordRow } from "./db.types";

export type CreateImportBatch = {
  entityType: string;
  total: number;
};

export type UpdateImportBatch = {
  success?: number;
  failed?: number;
  status?: ImportBatch["status"];
};

export type ImportRecordInput = Camelize<ImportRecordInsert>;

export type ImportRecordEntity = Camelize<ImportRecordRow>;
