// form/types/field.types.ts

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { OptionConfig, SelectOption } from "../../options/types";
import { JSX } from "react";

// export interface FieldOption {
//   label: string;
//   value: string | number | boolean;
//   disabled?: boolean;
//   description?: string;
// }

export type ValueResolver<T extends FieldValues, R> =
  | R
  | ((values: T) => R)
  | ((values: T) => Promise<R>);

export interface FieldUI<T extends FieldValues = FieldValues> {
  label?: string;
  component: FieldComponent;
  type?: string;
  section?: string;
  colSpan?: number;
  placeholder?: string;
  required?: ValueResolver<T, boolean>;
  disabled?: ValueResolver<T, boolean>;
  visible?: ValueResolver<T, boolean>;
  optionSource?: ValueResolver<T, OptionConfig>;
  options?: SelectOption[];
  dependsOn?: Path<T>[];
  computedValue?: (values: T) => unknown | Promise<unknown>;
}

export interface FieldDefinition<T extends FieldValues = FieldValues> {
  name: Path<T>;
  ui: FieldUI<T>;
}

export interface FieldRendererProps<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
> {
  name: Path<T>;
  ui: FieldUI<T>;
  form: UseFormReturn<T, C, O>;
  meta?: M;
  disabled?: boolean;
  required?: boolean;
}

export type FieldComponentType = <
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta = FormMeta,
>(
  props: FieldRendererProps<T, C, O, M>
) => JSX.Element;

export const fieldComponents = ["input", "select", "cascader", "switch"] as const;

export type FieldComponent = (typeof fieldComponents)[number];

export interface FormMeta {
  entities?: Partial<Record<string, unknown>>;
}
