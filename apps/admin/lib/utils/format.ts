export function formatRing(value?: number | null) {
  if (value == null) return "-";

  return value.toString();
}

export function formatMeters(value?: number | null) {
  if (value == null) return "-";

  return value.toFixed(2);
}

export function calcDistance(start?: number | null, end?: number | null) {
  return Math.abs((end ?? 0) - (start ?? 0));
}
