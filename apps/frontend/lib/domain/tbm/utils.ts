export function parseDiameter(value?: string | null): number | null {
  if (!value) return null;

  const match = value.match(/\d+(\.\d+)?/);

  if (!match) return null;

  return Number(match[0]);
}
