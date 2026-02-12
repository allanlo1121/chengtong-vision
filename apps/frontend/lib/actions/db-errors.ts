export type DbFieldError = {
  field: string;
  message: string;
};

export type DbErrorMap = {
  unique?: Record<string, DbFieldError>;
  foreignKey?: Record<string, DbFieldError>;
};

type PostgresError = {
  code?: string;
  constraint?: string;
  message?: string;
  details?: string;
};

export function mapDbErrorToFieldErrors(
  error: unknown,
  map?: DbErrorMap
): Record<string, string[]> | null {
  if (!map) return null;

  const err = error as PostgresError;
  if (!err?.code || !err.constraint) return null;

  // unique_violation
  if (err.code === "23505") {
    const hit = map.unique?.[err.constraint];
    if (hit) {
      return { [hit.field]: [hit.message] };
    }
  }

  // foreign_key_violation
  if (err.code === "23503") {
    const hit = map.foreignKey?.[err.constraint];
    if (hit) {
      return { [hit.field]: [hit.message] };
    }
  }

  return null;
}
