/* 格式化数字为固定小数位数，默认保留两位。
 * 支持 null/undefined 安全处理。
 */
export function formatDecimal(
  value: number | string | null | undefined,
  digits = 2,
  fallback = "-"
): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return fallback;
  }
  return Number(value).toFixed(digits);
}
