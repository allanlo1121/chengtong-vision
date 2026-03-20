import { Database } from "./database";
import { Camelize } from "@/lib/utils/case-converter";
import { mapperRegistry } from "../mapper/mapper-registry";

export type TableName = keyof Database["public"]["Tables"];

// export type TableName = keyof typeof mapperRegistry;

export type SystemFields = "created_at" | "created_by" | "updated_at" | "updated_by";

export type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];

export type TableInsert<T extends TableName> = Omit<
  Database["public"]["Tables"][T]["Insert"],
  SystemFields
>;

export type TableUpdate<T extends TableName> = Omit<
  Database["public"]["Tables"][T]["Update"],
  SystemFields
>;

// ======================
// 业务层（camel）
// ======================

export type Entity<T extends TableName> = Camelize<TableRow<T>>;

export type InsertEntity<T extends TableName> = Camelize<TableInsert<T>>;

export type UpdateEntity<T extends TableName> = Partial<Camelize<TableUpdate<T>>>;

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
