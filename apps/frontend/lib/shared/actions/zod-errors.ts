import { z, ZodError } from "zod";

export function zodErrorToFieldErrors<T extends z.ZodType>(
  error: ZodError
): Partial<Record<keyof z.infer<T> & string, string[]>> {
  const fieldErrors: Partial<Record<keyof z.infer<T> & string, string[]>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (!key) continue;

    const field = key as keyof z.infer<T> & string;

    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }

    fieldErrors[field]!.push(issue.message);
  }

  return fieldErrors;
}
