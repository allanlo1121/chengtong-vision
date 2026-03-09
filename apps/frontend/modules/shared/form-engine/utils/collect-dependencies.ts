import { FieldValues } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function collectDependencies<T extends FieldValues>(fields: FieldDefinition<T>[]) {
  const set = new Set<string>();

  for (const field of fields) {
    field.ui.dependsOn?.forEach((d) => set.add(d));
  }

  return [...set];
}
