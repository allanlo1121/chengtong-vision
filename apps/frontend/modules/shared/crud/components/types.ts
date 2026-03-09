import { ZodType } from "zod";
import { DefaultValues, FieldValues } from "react-hook-form";

export type CrudActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type CrudAction<T> = (data: T) => Promise<CrudActionResult<T>>;

export type CrudFormPageProps<T extends FieldValues> = {
  title: string;
  description?: string;

  schema: ZodType<T>;

  initialValues?: DefaultValues<T>;

  action: CrudAction<T>;

  redirect?: string;

  onSuccess?: (result: CrudActionResult<T>) => void;
  onError?: (result: CrudActionResult<T>) => void;
};
