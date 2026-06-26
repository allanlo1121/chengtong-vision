export function normalizeNullableString(value: unknown): string | null {
  if (value == null) {
    return null;
  }

  const text = String(value).trim();

  if (text === "" || text.toLowerCase() === "null") {
    return null;
  }

  return text;
}

export function normalizeNullableDate(value: unknown): string | null {
  const text = normalizeNullableString(value);

  if (!text) {
    return null;
  }

  return text;
}
