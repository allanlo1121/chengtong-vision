import { ZodTypeAny } from "zod";

export const optionalFields = <T extends Record<string, ZodTypeAny>>(fields: T) =>
  Object.fromEntries(Object.entries(fields).map(([key, schema]) => [key, schema.optional()]));
