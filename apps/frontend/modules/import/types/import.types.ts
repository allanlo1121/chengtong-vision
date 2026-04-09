import { LookupSource } from "../services/lookup.service";

import { ZodSchemaError } from "@/lib/zod/types";
import { ImportInsertInputMap, ImportRowMap } from "./import-row-map.types";
import { TableEntity } from "@/lib/core/types/entity.types";
import { LOOKUP_DEFINITIONS } from "../services/lookup.service";

export type LookupItem = {
  id: string;
  key: string;
};

// export type LookupType<T extends TableEntity> = Partial<
//   Record<keyof SchemaRowType<T>, LookupSource>
// >;

// export type fieldType<T extends TableEntity> = Partial<
//   Record<keyof ImportRowMap[T], keyof SchemaRowType<T>>
// >;

// export type ImportRowResult<T extends TableEntity> = {
//   row: ImportRowMap[T];
//   success: boolean;
//   level?: number;
//   errors?: ZodSchemaError[];
// };

// export type ImportPreviewResult<T extends TableEntity> = {
//   raw: ImportRowMap[T];
//   row: ImportInsertInputMap[T];
//   success: boolean;
//   level?: number;
//   errors?: ZodSchemaError[];
// };

// export type LookupMaps = Record<LookupSource, Map<string, string>>;

// export type ImportError = {
//   row: number; // Excel / CSV 行号
//   field?: string; // 哪个字段
//   message: string; // 错误信息
//   value?: any; // 原始值（可选）
// };

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
