// lib/utils/case-converter.ts

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${SnakeCase<U>}`
    : `${Lowercase<T>}_${SnakeCase<U>}`
  : S;
type CamelToSnakeObject<T> = {
  [K in keyof T as SnakeCase<K & string>]: CamelToSnake<T[K]>;
};

type CamelToSnake<T> =
  T extends Array<infer U> ? CamelToSnake<U>[] : T extends object ? CamelToSnakeObject<T> : T;

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

export type Camelize<T> =
  T extends Array<infer U>
    ? Camelize<U>[]
    : T extends object
      ? {
          [K in keyof T as SnakeToCamel<K & string>]: Camelize<T[K]>;
        }
      : T;

type SnakeToCamelObject<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K] extends object ? SnakeToCamelObject<T[K]> : T[K];
};

export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function toRecord(obj: any): Record<string, any> {
  return obj as Record<string, any>;
}

export function snakeToCamel<T>(obj: T): SnakeToCamelObject<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeToCamel(v)) as any;
  }

  if (obj !== null && isPlainObject(obj)) {
    const result: any = {};

    for (const key of Object.keys(toRecord(obj))) {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

      result[camelKey] = snakeToCamel((obj as any)[key]);
    }

    return result;
  }

  return obj as any;
}

export function camelToSnake<T>(obj: T): CamelToSnake<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelToSnake(v)) as any;
  }

  if (obj !== null && isPlainObject(obj)) {
    const result: any = {};

    for (const key of Object.keys(toRecord(obj))) {
      const snakeKey = key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

      result[snakeKey] = camelToSnake((obj as any)[key]);
    }

    return result;
  }

  return obj as any;
}

export function snakeToCamelFast(rows: any[]) {
  if (!rows) return rows;

  return rows.map((row) => {
    const result: any = {};

    for (const key in row) {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

      result[camelKey] = row[key];
    }

    return result;
  });
}
