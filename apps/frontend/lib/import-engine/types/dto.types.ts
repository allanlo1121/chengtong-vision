// types/dto.types.ts

import { Camelize } from "@/lib/utils/case-converter";
import {
  ExternalMapInsert,
  ExternalMapRow,
  ImportBatch,
  ImportRecordInsert,
  ImportRecordRow,
} from "./entity.types";

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

export type ExternalMapInput = Camelize<ExternalMapInsert>;

export type ExternalMapEntity = Camelize<ExternalMapRow>;
