import { z } from "zod";
import { SchemaRowType, TableName, TableSchemaMap } from "@/modules/shared/types";

import { ZodSchemaError } from "@/lib/zod/types";
import { formatZodError } from "@/lib/zod/format-zod-error";

export function validateRows(rows: any[], schema: any) {
  if (!schema) return rows;

  return rows.map((row) => {
    const parsed = schema.safeParse(row);

    return {
      row,
      success: parsed.success,
      errors: parsed.success ? null : formatZodError(parsed.error),
    };
  });
}

export function validateRow<T extends TableName>(
  row: SchemaRowType<T>,
  schema: (typeof TableSchemaMap)[T]
): { row: SchemaRowType<T>; success: boolean; errors: ZodSchemaError[] | null } {
  if (!schema) return { row, success: true, errors: null };

  const parsed = schema.safeParse(row);

  if (parsed.success) {
    return {
      row,
      success: true,
      errors: null,
    };
  }

  const errors = formatZodError(parsed.error);

  return {
    row,
    success: false,
    errors,
  };
}
