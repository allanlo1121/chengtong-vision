import { z } from "zod";
import { ActionState } from "./types";
import { zodErrorToFieldErrors } from "./zod-errors";
import { DbErrorMap, mapDbErrorToFieldErrors } from "./db-errors";

type UpdateHandler<T extends z.ZodType, R extends object> = (args: {
  id: string;
  data: z.infer<T>;
  formData: FormData;
}) => Promise<R>;

export function createUpdateAction<TSchema extends z.ZodType, TResult extends object>(
  schema: TSchema,
  options: {
    getId: (formData: FormData) => string | null;
    invalidMessage?: string;
    missingIdMessage?: string;
    dbErrorMap?: DbErrorMap;
  },
  handler: UpdateHandler<TSchema, TResult>
) {
  type Fields = keyof z.infer<TSchema> & string;
  type State = ActionState<Fields> & Partial<TResult>;

  return async function action(prevState: State, formData: FormData): Promise<State> {
    const id = options.getId(formData);

    if (!id) {
      return {
        success: false,
        message: options.missingIdMessage ?? "Missing record ID",
      } as State;
    }

    const parsed = schema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return {
        success: false,
        message: options.invalidMessage ?? "Validation failed",
        errors: zodErrorToFieldErrors<TSchema>(parsed.error),
      } as State;
    }

    try {
      return {
        success: true,
        ...(await handler({
          id,
          data: parsed.data,
          formData,
        })),
      } as State;
    } catch (error) {
      const dbErrors = mapDbErrorToFieldErrors(error, options.dbErrorMap);

      if (dbErrors) {
        return {
          success: false,
          errors: dbErrors,
          message: "Database constraint violation",
        } as State;
      }

      return {
        success: false,
        message: error instanceof Error ? error.message : "Unexpected error",
      } as State;
    }
  };
}
