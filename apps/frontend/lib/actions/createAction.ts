import { z } from "zod";
import { ActionState } from "./types";
import { zodErrorToFieldErrors } from "./zod-errors";
import { DbErrorMap, mapDbErrorToFieldErrors } from "./db-errors";

type CreateHandler<T extends z.ZodType, R extends object> = (args: {
  data: z.infer<T>;
  formData: FormData;
}) => Promise<R>;

export function createAction<TSchema extends z.ZodType, TResult extends object>(
  schema: TSchema,
  handler: CreateHandler<TSchema, TResult>,
  options?: {
    invalidMessage?: string;
    dbErrorMap?: DbErrorMap;
  }
) {
  type Fields = keyof z.infer<TSchema> & string;
  type State = ActionState<Fields> & Partial<TResult>;

  return async function action(prevState: State, formData: FormData): Promise<State> {
    const raw = Object.fromEntries(formData);

    console.log("raw form data", raw);

    const parsed = schema.safeParse(raw);

    console.log("parsed", parsed);

    if (!parsed.success) {
      console.log("❌ zod tree error", z.treeifyError(parsed.error));
      return {
        success: false,
        message: options?.invalidMessage ?? "Validation failed",
        errors: zodErrorToFieldErrors<TSchema>(parsed.error),
      } as State;
    } else {
      console.log("✅ zod validation success", parsed.data);
    }

    try {
      return {
        success: true,
        ...(await handler({
          data: parsed.data,
          formData,
        })),
      } as State;
    } catch (error) {
      const dbErrors = mapDbErrorToFieldErrors(error, options?.dbErrorMap);

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
