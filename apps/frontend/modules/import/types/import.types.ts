import { LookupSource } from "../services/lookup.service";
import { SchemaRowType, TableName, TableSchemaMap } from "../../shared/types";

import { ImportRowMap } from "./improt-row-map.types";

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

export type ImportConfig<T extends TableName> = {
  entity: T;
  schema?: (typeof TableSchemaMap)[T];
  fields: fieldType<T>;
  lookups?: LookupType<T>;
  extraFields?: Partial<Record<keyof SchemaRowType<T>, ExtraFieldResolver<T>>>;
};

export type ImportRowResult<T extends TableName> = {
  row: ImportRowMap[T];
  success: boolean;
  level?: number;
  errors?: any;
};

export type ImportPreviewResult<T extends TableName> = {
  raw: Record<keyof ImportRowMap[T], any>;
  row: SchemaRowType<T>;
  success: boolean;
  level?: number;
  errors?: any;
};

export type LookupMaps = Record<LookupSource, Map<string, string>>;

export type ImportError = {
  row: number; // Excel / CSV 行号
  field?: string; // 哪个字段
  message: string; // 错误信息
  value?: any; // 原始值（可选）
};

export type ImportPersistResult<T> = {
  inserted: number;
  updated: number;
  skipped: number;
  errors: ImportError[];
  items: T[];
  total: number;
};

// export type ImportError = {
//   row: number
//   field?: string
//   message: string
// }
