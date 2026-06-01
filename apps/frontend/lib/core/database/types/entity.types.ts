import { Database } from "./database";

export type SchemaName = keyof Database;
export type TableName<S extends SchemaName> = keyof Database[S]["Tables"];

export type TableKey<S extends keyof Database, T extends keyof Database[S]["Tables"]> = {
  schema: S;
  table: T;
};

export function createTable<S extends keyof Database, T extends keyof Database[S]["Tables"]>(
  schema: S,
  table: T
) {
  return { schema, table } as const;
}

type HrTables = keyof Database["hr"]["Tables"];
type ProjTables = keyof Database["proj"]["Tables"];
type EqpTables = keyof Database["eqp"]["Tables"];

export const tableEntities = [
  "organizations",
  "employees",
  "projects",
  "tunnels",
  "tbms",
] as const satisfies readonly (HrTables | ProjTables | EqpTables)[];

export type TableEntity = (typeof tableEntities)[number];

export type BaseSystemFields =
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "updated_by"
  | "deleted_at"
  | "deleted_by";

// type AutoFieldsMap = {
//   organizations: "path" | "node_key" | "level";
//   projects: never;
//   employees: never;
//   // 以后扩展
// };

// type BaseAutoFields =
//   | "id"
//   | "created_at"
//   | "updated_at"
//   | "deleted_at"
//   | "created_by"
//   | "updated_by"
//   | "deleted_by";

// export type AutoFields<T extends TableName> = BaseAutoFields;

// export type TableRow<T extends TableName> =
//   T extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][T]["Row"]
//   : T extends keyof Database["hr"]["Tables"]
//   ? Database["hr"]["Tables"][T]["Row"]
//   : T extends keyof Database["rbac"]["Tables"]
//   ? Database["rbac"]["Tables"][T]["Row"]
//   : T extends keyof Database["system"]["Tables"]
//   ? Database["system"]["Tables"][T]["Row"]
//   : never;

// export type TableInsert<T extends TableName> = Omit<
//   T extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][T]["Insert"]
//   : T extends keyof Database["hr"]["Tables"]
//   ? Database["hr"]["Tables"][T]["Insert"]
//   : T extends keyof Database["rbac"]["Tables"]
//   ? Database["rbac"]["Tables"][T]["Insert"]
//   : T extends keyof Database["system"]["Tables"]
//   ? Database["system"]["Tables"][T]["Insert"]
//   : never,
//   BaseAutoFields
// >;

// export type TableUpdate<T extends TableName> = Omit<
//   T extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][T]["Update"]
//   : T extends keyof Database["hr"]["Tables"]
//   ? Database["hr"]["Tables"][T]["Update"]
//   : T extends keyof Database["rbac"]["Tables"]
//   ? Database["rbac"]["Tables"][T]["Update"]
//   : T extends keyof Database["system"]["Tables"]
//   ? Database["system"]["Tables"][T]["Update"]
//   : never,
//   AutoFields<T>
// >;
// ======================
// 业务层（camel）
// ======================

// export type TableEntity = "organizations" | "employees" | "projects" | "tbms";

// export type Entity<T extends TableName> = Camelize<TableRow<T>>;

// export type InsertEntity<T extends TableName> = Camelize<TableInsert<T>>;

// export type UpdateEntity<T extends TableName> = Partial<Camelize<TableUpdate<T>>>;

// export type UpsertEntity<T extends TableName> = InsertEntity<T> & {
//   id?: string;
// };

// export function tableOf<T extends TableName>(table: T) {
//   return table as keyof Database[SchemaOfTable<T>]["Tables"];
// }

// ======================
// 自动判断table是否有id字段的UpsertResult类型
// ======================

// export type HasId<T extends TableName> =
//   TableRow<T> extends { id: infer U } ? (U extends string | number ? true : false) : false;

// ======================
//返回类型自动推导
// ======================

// export type UpsertResult<T extends TableName> =
//   HasId<T> extends true ? TableRow<T> & { id: string } : TableRow<T>;

export type SoftDeleteTable = "organizations" | "employees" | "projects" | "tbms";
