import { ReportDateRange } from "../types";
import { getStatPeriodConfig } from "../config/config-loader";
import { toDateString } from "@/lib/utils/date";

export async function weekToRange(weekKey: string): Promise<ReportDateRange> {
  const config = await getStatPeriodConfig();

  const [yearStr, weekStr] = weekKey.split("-W");

  const year = Number(yearStr);
  const week = Number(weekStr);

  const jan1 = new Date(year, 0, 1);
  const jan1Dow = jan1.getDay();

  let offset = config.week_start_dow - jan1Dow;
  if (offset > 0) offset -= 7;

  const firstWeekStart = new Date(jan1);
  firstWeekStart.setDate(jan1.getDate() + offset);

  const from = new Date(firstWeekStart);
  from.setDate(firstWeekStart.getDate() + (week - 1) * 7);

  const to = new Date(from);
  to.setDate(from.getDate() + 6);

  return {
    from: toDateString(from),
    to: toDateString(to),
  };
}

export async function getCurrentWeek(): Promise<string> {
  const config = await getStatPeriodConfig();

  const now = new Date();

  const year = now.getFullYear();

  const jan1 = new Date(year, 0, 1);
  const jan1Dow = jan1.getDay();

  let offset = config.week_start_dow - jan1Dow;
  if (offset > 0) offset -= 7;

  const firstWeekStart = new Date(jan1);
  firstWeekStart.setDate(jan1.getDate() + offset);

  // 当前日期距离第一周起点
  const diffDays = Math.floor((now.getTime() - firstWeekStart.getTime()) / (1000 * 60 * 60 * 24));

  // 第几周
  const week = Math.floor(diffDays / 7) + 1;

  return `${year}-W${String(week).padStart(2, "0")}`;
}
