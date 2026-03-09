import { FieldValues, useWatch } from "react-hook-form";
import { fieldRegistry } from "./registry/field-registry";
import { FieldRendererProps } from "./types/field.types";
import { resolveCondition } from "./engines/condition-engine";
import { resolveValue } from "./engines/value-resolver";

export function FieldRenderer<T extends FieldValues>({ name, ui, form }: FieldRendererProps<T>) {
  const dependsOn = ui.dependsOn ?? [];

  const watchValues = useWatch({
    control: form.control,
    name: dependsOn,
  });

  const context = {
    ...form.getValues(),
    ...watchValues,
  };

  const visible = resolveValue(ui.visible, context);

  if (visible === false) return null;

  const Component = fieldRegistry[ui.component];
  if (!Component) return null;

  const disabled = resolveValue(ui.disabled, context);
  const required = resolveValue(ui.required, context);

  return <Component<T> name={name} ui={ui} form={form} disabled={disabled} required={required} />;
}
