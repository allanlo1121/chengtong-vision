import { z } from "zod";

export function optionalFields<T extends Record<string, z.ZodTypeAny>>(fields: T) {
  const result: Record<string, z.ZodTypeAny> = {};

  for (const key in fields) {
    const field = fields[key];

    result[key] = field.optional();
  }

  return result;
}
