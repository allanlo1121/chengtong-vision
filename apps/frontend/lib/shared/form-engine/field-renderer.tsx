import { FieldValues, useWatch } from "react-hook-form";
import { fieldRegistry } from "./registry/field-registry";
import { FieldRendererProps, FormMeta } from "./types/field.types";
import { resolveValue } from "./engines/value-resolver";

export function FieldRenderer<
  T extends FieldValues,
  C = any,
  O = T,
  M extends FormMeta<T> = FormMeta<T>,
>({ name, ui, form, meta }: FieldRendererProps<T, C, O, M>) {
  const Component = fieldRegistry[ui.component as keyof typeof fieldRegistry];

  if (!Component) {
    return null;
  }

  const fieldMeta = meta?.[name];

  const mergedUi = {
    ...ui,
    ...fieldMeta,
  };

  return <Component<T, C, O> name={name} ui={mergedUi} form={form} />;
}
