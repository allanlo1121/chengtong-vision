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

export function toDate(value?: string | null) {
  if (!value) return null;
  return value.slice(0, 10);
}

export function toPgDate(date: Date | null | undefined) {
  if (!date) return null;

  return date.toISOString().split("T")[0];
}

export function toDatetimeLocalValue(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  const offset = date.getTimezoneOffset();

  const local = new Date(date.getTime() - offset * 60 * 1000);

  return local.toISOString().slice(0, 16);
}

export function getCurrentWorkDay() {
  const now = new Date();

  // 转北京时间
  const beijingNow = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Shanghai",
    })
  );

  // 19:00 后属于下一工作日
  if (beijingNow.getHours() >= 19) {
    beijingNow.setDate(beijingNow.getDate() + 1);
  }

  return beijingNow.toISOString().slice(0, 10);
}
