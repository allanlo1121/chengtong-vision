import { FieldValues } from "react-hook-form";
import { FieldDefinition } from "../types/field.types";

export function groupFieldsBySection<T extends FieldValues>(fields: FieldDefinition<T>[]) {
  const sections = new Map<string, FieldDefinition<T>[]>();
  for (const field of fields) {
    const section = field.ui.section ?? "default";
    if (!sections.has(section)) {
      sections.set(section, []);
    }
    sections.get(section)!.push(field);
  }

  return sections;
}
