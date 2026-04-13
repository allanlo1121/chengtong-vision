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

export type Camelize<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K];
};

// type CamelToSnake<S extends string> =
//     S extends `${infer T}${infer U}`
//     ? U extends Uncapitalize<U>
//     ? `${Lowercase<T>}${CamelToSnake<U>}`
//     : `${Lowercase<T>}_${CamelToSnake<U>}`
//     : S

type SnakeToCamelObject<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K] extends object ? SnakeToCamelObject<T[K]> : T[K];
};

// type CamelToSnakeObject<T> =
//   T extends Array<infer U>
//     ? CamelToSnake < U > []
//     : T extends object
//         ? CamelToSnakeObject<T>
//         : T

// export function snakeToCamel(str: string): string {
//     return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
// }

// export function camelToSnake(str: string): string {
//     return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
// }

export function snakeToCamel<T>(obj: T): SnakeToCamelObject<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeToCamel(v)) as any;
  }

  if (obj !== null && typeof obj === "object") {
    const result: any = {};

    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

      result[camelKey] = snakeToCamel((obj as any)[key]);
    }

    return result;
  }

  return obj as any;
}

export function camelToSnake<T>(obj: T): CamelToSnake<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelToSnake(v)) as CamelToSnake<T>;
  }

  if (obj !== null && typeof obj === "object") {
    const result: any = {};

    for (const key in obj) {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

      result[snakeKey] = camelToSnake((obj as any)[key]);
    }

    return result;
  }

  return obj as CamelToSnake<T>;
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
