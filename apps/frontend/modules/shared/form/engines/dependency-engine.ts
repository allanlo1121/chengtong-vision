import { FieldValues, UseFormReturn, Path, PathValue } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function runDependencyEngine<T extends FieldValues>(
  fields: FieldDefinition<T>[],
  values: T,
  form: UseFormReturn<T>
) {
  for (const field of fields) {
    const deps = field.ui.dependsOn;
    if (!deps?.length) continue;

    const shouldClear = deps.some((dep) => {
      const v = values[dep];
      return v === undefined || v === null || v === "";
    });

    if (!shouldClear) continue;

    const current = form.getValues(field.name);

    if (current !== undefined && current !== null) {
      form.setValue(field.name, undefined as PathValue<T, Path<T>>, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }
}
