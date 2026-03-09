export function unwrapZod(field: any) {
  if (field._def?.typeName === "ZodOptional") {
    return field._def.innerType;
  }

  if (field._def?.typeName === "ZodNullable") {
    return field._def.innerType;
  }

  return field;
}
