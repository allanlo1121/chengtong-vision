import { FieldValues, Path } from "react-hook-form";

import { FieldDefinition } from "../types/field.types";
import { z, ZodDefault, ZodNullable, ZodObject, ZodOptional } from "zod";

function isRequiredField(field: any): boolean {
  return !field.safeParse(undefined).success;
}

export function extractFields<TSchema extends ZodObject<any>>(
  schema: TSchema
): FieldDefinition<z.input<TSchema>>[] {
  const shape = schema.shape;

  const fields: FieldDefinition<z.input<TSchema>>[] = [];

  for (const key in shape) {
    const field: any = shape[key];

    const meta = typeof field.meta === "function" ? field.meta() : undefined;

    if (!meta) continue;

    fields.push({
      name: key as Path<z.input<TSchema>>,
      ui: meta,
      required: isRequiredField(field),
    });
  }

  return fields;
}
