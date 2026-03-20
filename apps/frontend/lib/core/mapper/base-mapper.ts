// lib/core/mapper/base-mapper.ts
import { isPlainObject, toRecord } from "@/lib/utils/case-converter";

/* =========================
 * 配置类型
 * ========================= */

export type MapperOptions = {
  exclude?: string[];
  pick?: string[];
  deep?: boolean;
  transform?: Record<
    string,
    {
      toDb?: (v: any) => any;
      fromDb?: (v: any) => any;
    }
  >;
};

/* =========================
 * 核心转换函数
 * ========================= */

function toSnakeKey(key: string) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}

function toCamelKey(key: string) {
  return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/* =========================
 * toDb（camel → snake）
 * ========================= */

export function toDb(data: any, options?: MapperOptions): any {
  if (Array.isArray(data)) {
    return data.map((v) => toDb(v, options)) as any;
  }

  if (!isPlainObject(data)) {
    return data as any;
  }

  const result: any = {};
  const record = toRecord(data);

  for (const key of Object.keys(record)) {
    if (options?.pick && !options.pick.includes(key)) continue;
    if (options?.exclude && options.exclude.includes(key)) continue;

    let value = record[key];

    // transform
    if (options?.transform?.[key]?.toDb) {
      value = options.transform[key].toDb!(value);
    }

    // deep
    if (options?.deep !== false) {
      value = toDb(value, options);
    }

    result[toSnakeKey(key)] = value;
  }

  return result;
}

/* =========================
 * fromDb（snake → camel）
 * ========================= */

export function fromDb<T extends object>(data: any, options?: MapperOptions): T {
  if (Array.isArray(data)) {
    return data.map((v) => fromDb(v, options)) as any;
  }

  if (!isPlainObject(data)) {
    return data as any;
  }

  const result: any = {};
  const record = toRecord(data);

  for (const key of Object.keys(record)) {
    const camelKey = toCamelKey(key);

    if (options?.pick && !options.pick.includes(camelKey)) continue;
    if (options?.exclude && options.exclude.includes(camelKey)) continue;

    let value = record[key];

    // transform
    if (options?.transform?.[camelKey]?.fromDb) {
      value = options.transform[camelKey].fromDb!(value);
    }

    // deep
    if (options?.deep !== false) {
      value = fromDb(value, options);
    }

    result[camelKey] = value;
  }

  return result as T;
}
