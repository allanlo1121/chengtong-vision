import { FieldValues } from "react-hook-form";
import { fieldRegistry } from "./registry/field-registry";
import { FieldRendererProps } from "./types/field.types";
import { resolveCondition } from "./engines/condition-engine";
import { resolveValue } from "./engines/value-resolver";

export function FieldRenderer<T extends FieldValues>({ name, ui, form }: FieldRendererProps<T>) {
  const values = form.getValues();

  const visible = resolveValue(ui.visible, values);

  if (visible === false) {
    return null;
  }

  const Component = fieldRegistry[ui.component];

  console.log("Rendering field:", name, "Component:", ui.component, "Visible:", visible);

  if (!Component) {
    return null;
  }

  const disabled = resolveValue(ui.disabled, values);
  const required = resolveValue(ui.required, values);

  return <Component<T> name={name} ui={ui} form={form} disabled={disabled} required={required} />;
}
