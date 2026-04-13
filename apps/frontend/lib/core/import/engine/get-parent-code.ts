export function getParentCode(code?: string): string | null {
  if (!code) return null;

  const parts = code.split("-");

  if (parts.length <= 1) return null;

  parts.pop();

  return parts.join("-");
}
