import { FieldValues, UseFormReturn } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function runComputedEngine<T extends FieldValues>(
  fields: FieldDefinition<T>[],
  values: T,
  form: UseFormReturn<T>
) {
  for (const field of fields) {
    const compute = field.ui.computedValue;

    if (!compute) continue;

    const result = compute(values);

    form.setValue(field.name, result as any);
  }
}
