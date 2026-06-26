import { ZodSchemaError } from "@/lib/utils/zod/types";
import { ImportInsertInputMap, ImportRowMap } from "./import-row-map.types";
import { TableEntity } from "@/lib/core/database/types/entity.types";
import { LOOKUP_DEFINITIONS } from "../services/lookup.service";

export type LookupItem = {
  id: string;
  key: string;
};

export type ImportPersistResult<T> = {
  errors: ImportError[];
  items: T[];
  total: number;
};

export type ImportError = {
  row: number;
  field?: string;
  message: string;
};

export type ImportRow<T extends TableEntity> = {
  raw: ImportRowMap[T];
  data: ImportInsertInputMap[T];
};

export type ImportErrorRow<T extends TableEntity> = {
  raw: ImportRowMap[T];
  errors: ZodSchemaError[];
};

export type ImportValidateResult<T extends TableEntity> = {
  validRows: ImportRow<T>[];
  failedRows: ImportErrorRow<T>[];
};

export type UpsertResult = {
  id: string;
  code: string;
} | null;

export type SyncImportResult = {
  inserted: number;
  updated: number;
  failed: number;
  skipped: number;
};

export type ImportConfig<T extends TableEntity> = {
  schema: any;
  mapper: any;
  lookups?: any;
  requiredLookups?: (keyof typeof LOOKUP_DEFINITIONS)[];
  writer: (data: ImportInsertInputMap[T]) => Promise<any>;
};
