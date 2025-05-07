import dayjs from "dayjs";

/**
 * 把数据库里的 timestamp (或 null) 格式化成 `<input type="date">` 可以用的字符串
 */
export function formatDateForInput(date: string | null | undefined): string {
  console.log("formatDateForInput 收到的值:", date);
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * 把 `<input type="date">` 返回的字符串转成标准 ISO 格式，用来提交到数据库
 */
export function formatInputDateToISO(
  date: string | null | undefined
): string | null {
  if (!date || date.trim() === "") return null; // 避免传空字符串
  return dayjs(date).toISOString(); // PostgreSQL 可以接受标准 ISO 字符串
}

export function generateDateRange(start: string, end: string): Date[] {
  const result: Date[] = [];
  const current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    let clone = new Date(current); // clone
    clone.setUTCHours(11, 0, 0, 0); // // UTC+0 的 11:00，相当于北京时间 19:00
    result.push(clone); // clone
    current.setDate(current.getDate() + 1);
  }

  return result;
}
