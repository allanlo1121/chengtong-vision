// form/types/field.types.ts

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { JSX } from "react";
import { OptionConfig, SelectOption } from "../../options/types";
import { FieldComponent } from "../registry/field-registry";

export interface FormFieldMeta<T extends FieldValues = FieldValues> {
  label: string;

  component: FieldComponent;

  type?: FormFieldType;

  section?: string;

  colSpan?: 1 | 2 | 3 | 4;

  placeholder?: string;

  readonly?: ValueResolver<T, boolean>;

  hidden?: ValueResolver<T, boolean>;

  required?: ValueResolver<T, boolean>;

  disabled?: ValueResolver<T, boolean>;

  options?: SelectOption[];

  optionSource?: ValueResolver<T, OptionConfig>;

  dependsOn?: Path<T>[];
}

export type FormFieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "datetime-local"
  | "tel"
  | "url";

export interface FieldRendererProps<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta<T> = FormMeta<T>,
> {
  name: Path<T>;

  ui: FormFieldMeta<T>;

  form: UseFormReturn<T, C, O>;

  meta?: M;
}

export type FieldComponentType = <T extends FieldValues, C = any, O = T>(
  props: FieldRendererProps<T, C, O>
) => JSX.Element;

export type FormMeta<T extends FieldValues> = Partial<Record<Path<T>, Partial<FormFieldMeta<T>>>>;

export type ValueResolver<T extends FieldValues, R> =
  | R
  | ((values: T) => R)
  | ((values: T) => Promise<R>);

export interface FieldDefinition<T extends FieldValues = FieldValues> {
  name: Path<T>;
  ui: FormFieldMeta<T>;
}
