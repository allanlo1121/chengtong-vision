// form/types/field.types.ts

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { fieldRegistry } from "../field-registry";
import { OptionConfig } from "../../options/types";
import { JSX } from "react";

// export type FieldComponent = keyof typeof fieldRegistry

export type ValueResolver<T extends FieldValues, R> = R | ((values: T) => R);

export interface FieldUI<T extends FieldValues = FieldValues> {
  label?: string;
  component: FieldComponent;
  section?: string;
  colSpan?: number;
  placeholder?: string;
  required?: ValueResolver<T, boolean>;
  disabled?: ValueResolver<T, boolean>;
  readOnly?: boolean;
  option?: ValueResolver<T, OptionConfig>;
  visible?: ValueResolver<T, boolean>;
  dependsOn?: Path<T>[];
  computedValue?: (values: T) => any;
}

export interface FieldDefinition<T extends FieldValues = FieldValues> {
  name: Path<T>;
  ui: FieldUI<T>;
}

export interface FieldRendererProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  ui: FieldUI<T>;
  form: UseFormReturn<T>;
  disabled?: boolean;
  required?: boolean;
}

export type OptionResolver<T extends FieldValues = FieldValues> =
  | OptionConfig
  | ((values: T) => OptionConfig)
  | ((values: T) => Promise<OptionConfig>);

export type FieldComponentType = <T extends FieldValues>(
  props: FieldRendererProps<T>
) => JSX.Element;

export type FieldComponent = "input" | "select" | "treeSelect" | "cascader" | "switch";
