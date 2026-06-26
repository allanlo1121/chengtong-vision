export function removeUndefined<T extends Record<string, unknown>>(obj: T) {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
