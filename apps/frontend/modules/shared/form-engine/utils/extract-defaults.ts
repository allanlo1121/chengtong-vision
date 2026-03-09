export function extractDefaults(schema: any) {
  const shape = schema.shape;

  const defaults: Record<string, any> = {};

  Object.keys(shape).forEach((key) => {
    const field = shape[key];

    if (field._def.defaultValue) {
      defaults[key] = field._def.defaultValue;
    }
  });

  return defaults;
}
