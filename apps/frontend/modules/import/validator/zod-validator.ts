export function validateRows(rows: any[], schema: any) {
  if (!schema) return rows;

  return rows.map((row) => {
    const parsed = schema.safeParse(row);

    return {
      row,

      success: parsed.success,

      errors: parsed.success ? null : parsed.error.flatten(),
    };
  });
}
