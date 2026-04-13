// lib/actions/types.ts

export type ActionState<Fields extends string = string> = {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<Fields, string[]>>;
};
