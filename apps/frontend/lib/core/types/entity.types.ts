import { Database } from "./database";
import { Camelize } from "@/lib/utils/case-converter";

export type TableName = keyof Database["public"]["Tables"];

export type BaseSystemFields =
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "updated_by"
  | "deleted_at"
  | "deleted_by";

type AutoFieldsMap = {
  organizations: "path" | "node_key" | "level";
  projects: never;
  employees: never;
  // 以后扩展
};

export type AutoFields<T extends TableName> =
  | BaseSystemFields
  | (T extends keyof AutoFieldsMap ? AutoFieldsMap[T] : never);

export type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];

export type TableInsert<T extends TableName> = Omit<
  Database["public"]["Tables"][T]["Insert"],
  AutoFields<T>
>;

export type TableUpdate<T extends TableName> = Omit<
  Database["public"]["Tables"][T]["Update"],
  AutoFields<T>
>;
// ======================
// 业务层（camel）
// ======================

export type Entity<T extends TableName> = Camelize<TableRow<T>>;

export type InsertEntity<T extends TableName> = Camelize<TableInsert<T>>;

export type UpdateEntity<T extends TableName> = Partial<Camelize<TableUpdate<T>>>;

export type UpsertEntity<T extends TableName> = InsertEntity<T> & {
  id?: string;
};

export function tableOf<T extends TableName>(table: T) {
  return table as keyof Database["public"]["Tables"];
}

// ======================
// 自动判断table是否有id字段的UpsertResult类型
// ======================

export type HasId<T extends TableName> =
  TableRow<T> extends { id: infer U } ? (U extends string | number ? true : false) : false;

// ======================
//返回类型自动推导
// ======================

export type UpsertResult<T extends TableName> =
  HasId<T> extends true ? TableRow<T> & { id: string } : TableRow<T>;
