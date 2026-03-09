import { FieldValues, Path } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { FieldDefinition } from "../types/field.types";

export function extractFields<T extends FieldValues>(
  schema: ZodObject<ZodRawShape>
): FieldDefinition<T>[] {
  const shape = schema.shape;
  const fields: FieldDefinition<T>[] = [];

  for (const key in shape) {
    const field = shape[key] as any;
    const meta = typeof field.meta === "function" ? field.meta() : undefined;
    console.log("extractFields field", key, field);
    console.log("extractFields meta", key, meta);
    if (!meta) continue;

    fields.push({
      name: key as Path<T>,
      ui: meta,
    });
  }

  return fields;
}
