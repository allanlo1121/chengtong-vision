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
    clone.setUTCHours(0, 0, 0, 0); // // UTC+0 的 11:00，相当于北京时间 19:00
    result.push(clone); // clone
    current.setDate(current.getDate() + 1);
  }

  return result;
}


import { startOfYear, startOfMonth, startOfWeek } from "date-fns";
import { zhCN } from "date-fns/locale";

/**
 * 获取某个日期所在年份的第一天
 * @param date 默认当前日期
 */
export function getStartOfYear(date: Date = new Date()): Date {
  return startOfYear(date);
}

/**
 * 获取某个日期所在月份的第一天
 * @param date 默认当前日期
 */
export function getStartOfMonth(date: Date = new Date()): Date {
  return startOfMonth(date);
}

/**
 * 获取某个日期所在周的第一天（以周一为起始）
 * @param date 默认当前日期
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  return startOfWeek(date, { weekStartsOn: 1, locale: zhCN }); // 周一
}


export function getTimeRangeForDay(day: string): [string, string] {
  const start = new Date(`${day}T19:00:00+08:00`);
  start.setDate(start.getDate() - 1);
  const end = new Date(`${day}T19:00:00+08:00`);
  return [start.toISOString(), end.toISOString()];
}