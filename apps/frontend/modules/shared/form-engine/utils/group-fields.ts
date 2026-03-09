import { FieldValues } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function groupFields<T extends FieldValues>(fields: FieldDefinition<T>[]) {
  const map = new Map();

  for (const field of fields) {
    const section = field.ui.section || "default";

    if (!map.has(section)) {
      map.set(section, []);
    }

    map.get(section).push(field);
  }

  return map;
}
