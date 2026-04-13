export function diffFields<T extends Record<string, any>>(
  oldRow: T,
  newRow: Partial<T>,
  ignoreKeys: (keyof T)[] = []
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in newRow) {
    if (ignoreKeys.includes(key)) continue;

    const oldVal = oldRow[key];
    const newVal = newRow[key];

    // 关键：统一 null / undefined
    const normalizedOld = oldVal ?? null;
    const normalizedNew = newVal ?? null;

    if (normalizedOld !== normalizedNew) {
      result[key] = newVal as T[keyof T];
    }
  }

  return result;
}
