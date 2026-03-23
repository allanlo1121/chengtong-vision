// hooks/use-import-validator.ts

export function validateRows(rows, schema) {
  return rows.map((row) => {
    const result = schema.safeParse(row);

    return {
      row,
      success: result.success,
      errors: result.success ? null : result.error.flatten().fieldErrors,
    };
  });
}
