export function formatDateTime(value: string | Date) {
  const date = new Date(value);

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
