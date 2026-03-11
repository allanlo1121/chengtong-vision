// form/types/field.types.ts

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { OptionConfig } from "../../options/types";
import { JSX } from "react";

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
  option?: ValueResolver<T, OptionConfig>;
  dependsOn?: Path<T>[];
  computedValue?: (values: T) => any | Promise<any>;
}

export interface FieldDefinition<T extends FieldValues = FieldValues> {
  name: Path<T>;
  ui: FieldUI<T>;
}

export interface FieldRendererProps<T extends FieldValues, C = any, O = T> {
  name: Path<T>;
  ui: FieldUI<T>;
  form: UseFormReturn<T, C, O>;
  disabled?: boolean;
  required?: boolean;
}

export type FieldComponentType = <T extends FieldValues, C = any, O = T>(
  props: FieldRendererProps<T, C, O>
) => JSX.Element;

export const fieldComponents = ["input", "select", "treeSelect", "cascader", "switch"] as const;

export type FieldComponent = (typeof fieldComponents)[number];
