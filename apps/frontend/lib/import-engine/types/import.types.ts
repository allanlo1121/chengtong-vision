import { LookupSource } from "../services/lookup.service";
import { SchemaRowType, TableName, TableSchemaMap } from "../../shared/types";
import { ZodSchemaError } from "@/lib/zod/types";
import { ImportRowMap } from "./improt-row-map.types";
import { Entity } from "@/lib/core/types/entity.types";

export type LookupItem = {
  id: string;
  key: string;
};

export type LookupType<T extends TableName> = Partial<Record<keyof SchemaRowType<T>, LookupSource>>;

export type fieldType<T extends TableName> = Partial<
  Record<keyof ImportRowMap[T], keyof SchemaRowType<T>>
>;

export type ExtraFieldResolver<T extends TableName> = (
  row: Record<keyof ImportRowMap[T], any>,
  mapped: Partial<SchemaRowType<T>>,
  lookupMap?: Map<string, string>
) => any | Promise<any>;

// export type VersionStrategy =
//   | "incremental" // 新 > 旧 才更新
//   | "always"      // 总是更新
//   | "never";      // 永不更新

// export type VersionConfig<T extends TableName> = {
//   /** 原始数据字段（raw） */
//   field: string;

//   /** 存入 entity 的字段（必须是表字段） */
//   target: keyof Entity<T>;

//   /** 数据来源（多系统支持） */
//   source?: string;

//   /** 策略 */
//   strategy?: VersionStrategy;
// };

export type ImportConfig<T extends TableName> = {
  entity: T;
  schema: (typeof TableSchemaMap)[T];
  fields: fieldType<T>;
  lookups?: LookupType<T>;
  extraFields?: Partial<Record<keyof SchemaRowType<T>, ExtraFieldResolver<T>>>;
  externalSource?: string; // 可选
  getExternalVersion?: (row: unknown) => number;
};

export type ImportRowResult<T extends TableName> = {
  row: ImportRowMap[T];
  success: boolean;
  level?: number;
  errors?: ZodSchemaError[];
};

export type ImportPreviewResult<T extends TableName> = {
  raw: Record<keyof ImportRowMap[T], any>;
  row: SchemaRowType<T>;
  success: boolean;
  level?: number;
  errors?: ZodSchemaError[];
};

export type LookupMaps = Record<LookupSource, Map<string, string>>;

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

export type ImportRow<T extends TableName> = {
  raw: ImportRowMap[T];
  data: SchemaRowType<T>;
  meta: {
    externalVersion: number;
    externalSource?: string;
  };
};

export type ImportErrorRow<T extends TableName> = {
  raw: ImportRowMap[T];
  errors: ZodSchemaError[];
};

export type ImportValidateResult<T extends TableName> = {
  validRows: ImportRow<T>[];
  failedRows: ImportErrorRow<T>[];
};

export type UpsertResult = {
  id: string;
  code: string;
} | null;

export type SyncImportResult = {
  total: number;
  inserted: number;
  updated: number;
  failed: number;
  skipped: number;
};
