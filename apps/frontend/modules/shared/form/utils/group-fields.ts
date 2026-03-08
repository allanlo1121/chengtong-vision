import { FieldDefinition } from "../field-component.types";

export function groupFields(fields: FieldDefinition[]) {
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
