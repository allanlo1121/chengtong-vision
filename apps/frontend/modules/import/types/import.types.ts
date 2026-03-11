import { z } from "zod";
import { LookupSource } from "../services/lookup.service";
import { TableName, TableSchemaMap } from "../../shared/types";

export type LookupItem = {
  id: string;
  key: string;
};

export type LookupType<T extends TableName> = Partial<
  Record<keyof z.infer<(typeof TableSchemaMap)[T]>, LookupSource>
>;

export type fieldType<T extends TableName> = Record<
  string,
  keyof z.infer<(typeof TableSchemaMap)[T]>
>;

export type ImportConfig<T extends TableName> = {
  entity: T;
  schema?: any;
  fields: fieldType<T>;
  lookups?: LookupType<T>;
};

export type ImportResult<T = any> = {
  row: T;
  success: boolean;
  errors?: any;
};

export type LookupConfig = {
  source: LookupSource;
  key: "code" | "name";
};

export type LookupMaps = Record<LookupSource, Map<string, string>>;
