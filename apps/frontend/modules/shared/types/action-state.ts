export type ActionState<TErrors = Record<string, string[]>> = {
  success: boolean;
  message?: string | null;
  errors?: TErrors;
};
