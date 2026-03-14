import { LookupSource } from "../services/lookup.service";
import { RowType, TableName, TableSchemaMap } from "../../shared/types";

export type LookupItem = {
  id: string;
  key: string;
};

export type LookupType<T extends TableName> = Partial<Record<keyof RowType<T>, LookupSource>>;

export type fieldType<T extends TableName> = Record<string, keyof RowType<T>>;

export type ImportConfig<T extends TableName> = {
  entity: T;
  schema?: (typeof TableSchemaMap)[T];
  fields: fieldType<T>;
  lookups?: LookupType<T>;
};

export type ImportPreviewResult<T extends TableName> = {
  row: RowType<T>;
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
