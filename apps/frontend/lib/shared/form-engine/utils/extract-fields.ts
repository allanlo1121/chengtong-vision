import { FieldValues, Path } from "react-hook-form";
import { z, ZodObject, ZodRawShape, ZodType } from "zod";
import { FieldDefinition } from "../types/field.types";

export function extractFields<TSchema extends ZodObject<any>>(
  schema: TSchema
): FieldDefinition<z.input<TSchema>>[] {
  const shape = schema.shape;
  // console.log("Extracting fields from schema", { shape });

  const fields: FieldDefinition<z.input<TSchema>>[] = [];

  for (const key in shape) {
    const field: any = shape[key];
    const meta = typeof field.meta === "function" ? field.meta() : undefined;
    // console.log("Extracting field", { key, field, meta });
    if (!meta) continue;

    fields.push({
      name: key as Path<z.input<TSchema>>,
      ui: meta,
    });
  }

  return fields;
}
