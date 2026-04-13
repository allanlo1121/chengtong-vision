export function getMeta(schema: any): any {
  if (!schema?._def) return {};

  // v4 metadata
  if (schema._def.metadata) {
    return schema._def.metadata;
  }

  // optional / nullable
  if (schema._def.innerType) {
    return getMeta(schema._def.innerType);
  }

  // default
  if (schema._def.schema) {
    return getMeta(schema._def.schema);
  }

  // effects (refine / transform)
  if (schema._def.type) {
    return getMeta(schema._def.type);
  }

  return {};
}
