// // lib/utils/data-mapper.ts

// import { Entity, InsertEntity, TableInsert, TableName, TableUpdate, UpdateEntity } from "../core/types/entity.types";

// /* =========================
//  * 类型工具
//  * ========================= */

// type SnakeCase<S extends string> =
//     S extends `${infer T}${infer U}`
//     ? U extends Uncapitalize<U>
//     ? `${Lowercase<T>}${SnakeCase<U>}`
//     : `${Lowercase<T>}_${SnakeCase<U>}`
//     : S;

// type CamelToSnakeObject<T> = {
//     [K in keyof T as SnakeCase<K & string>]: CamelToSnake<T[K]>;
// };

// type CamelToSnake<T> =
//     T extends Array<infer U>
//     ? CamelToSnake<U>[]
//     : T extends object
//     ? CamelToSnakeObject<T>
//     : T;

// type SnakeToCamel<S extends string> =
//     S extends `${infer T}_${infer U}`
//     ? `${T}${Capitalize<SnakeToCamel<U>>}`
//     : S;

// export type Camelize<T> = {
//     [K in keyof T as SnakeToCamel<K & string>]:
//     T[K] extends object ? Camelize<T[K]> : T[K];
// };

// /* =========================
//  * 基础工具
//  * ========================= */

// function isPlainObject(obj: any) {
//     return Object.prototype.toString.call(obj) === "[object Object]";
// }

// function toRecord(obj: any): Record<string, any> {
//     return obj as Record<string, any>;
// }

// /* =========================
//  * 配置类型
//  * ========================= */

// export type MapperOptions<T = any> = {
//     exclude?: (keyof T | string)[];
//     pick?: (keyof T | string)[];
//     deep?: boolean; // 是否递归（默认 true）
//     transform?: {
//         [key: string]: {
//             toDb?: (v: any) => any;
//             fromDb?: (v: any) => any;
//         };
//     };
// };

// /* =========================
//  * 核心转换函数
//  * ========================= */

// function toSnakeKey(key: string) {
//     return key
//         .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
//         .toLowerCase();
// }

// function toCamelKey(key: string) {
//     return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
// }

// /* =========================
//  * toDb（camel → snake）
//  * ========================= */

// export function toDb<T extends object>(
//     data: T,
//     options?: MapperOptions<T>
// ): CamelToSnake<T> {

//     if (Array.isArray(data)) {
//         return data.map((v) => toDb(v, options)) as any;
//     }

//     if (!isPlainObject(data)) {
//         return data as any;
//     }

//     const result: any = {};
//     const record = toRecord(data);

//     for (const key of Object.keys(record)) {
//         if (options?.pick && !options.pick.includes(key)) continue;
//         if (options?.exclude && options.exclude.includes(key)) continue;

//         let value = record[key];

//         // transform
//         if (options?.transform?.[key]?.toDb) {
//             value = options.transform[key].toDb!(value);
//         }

//         // deep
//         if (options?.deep !== false) {
//             value = toDb(value, options);
//         }

//         result[toSnakeKey(key)] = value;
//     }

//     return result;
// }

// /* =========================
//  * fromDb（snake → camel）
//  * ========================= */

// export function fromDb<T extends object>(
//     data: any,
//     options?: MapperOptions<T>
// ): T {

//     if (Array.isArray(data)) {
//         return data.map((v) => fromDb(v, options)) as any;
//     }

//     if (!isPlainObject(data)) {
//         return data as any;
//     }

//     const result: any = {};
//     const record = toRecord(data);

//     for (const key of Object.keys(record)) {
//         const camelKey = toCamelKey(key);

//         if (options?.pick && !options.pick.includes(camelKey)) continue;
//         if (options?.exclude && options.exclude.includes(camelKey)) continue;

//         let value = record[key];

//         // transform
//         if (options?.transform?.[camelKey]?.fromDb) {
//             value = options.transform[camelKey].fromDb!(value);
//         }

//         // deep
//         if (options?.deep !== false) {
//             value = fromDb(value, options);
//         }

//         result[camelKey] = value;
//     }

//     return result as T;
// }

// /* =========================
//  * 快速模式（浅转换）
//  * ========================= */

// export function fromDbFast<T = any>(rows: any[]): T[] {
//     if (!Array.isArray(rows)) return rows;

//     return rows.map((row) => {
//         const result: any = {};

//         for (const key of Object.keys(row)) {
//             result[toCamelKey(key)] = row[key];
//         }

//         return result;
//     });
// }

// export function toDbTyped<TInput, TOutput>(
//     data: TInput,
//     mapper?: MapperOptions<any>
// ): TOutput {

//     const result = toDb(data, mapper);

//     return result as TOutput;
// }

// export function toDbInsert<T extends TableName>(
//     data: InsertEntity<T>,
//     mapper: MapperOptions<Entity<T>>
// ): TableInsert<T> {

//     return toDbTyped<
//         InsertEntity<T>,
//         TableInsert<T>
//     >(data, mapper);
// }

// export function toDbUpdate<T extends TableName>(
//     data: UpdateEntity<T>,
//     mapper: MapperOptions<Entity<T>>
// ): TableUpdate<T> {

//     return toDbTyped<
//         UpdateEntity<T>,
//         TableUpdate<T>
//     >(data, mapper);
// }
