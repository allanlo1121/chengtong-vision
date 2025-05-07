import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

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

