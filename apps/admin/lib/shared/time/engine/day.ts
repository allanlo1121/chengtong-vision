import { DateString, toDateString } from "@/lib/utils";
import { getStatPeriodConfig } from "../config/config-loader";
import { ReportDateRange } from "../types";

export async function dayToRange(date?: string): Promise<ReportDateRange> {
  const config = await getStatPeriodConfig();

  const cutoffHour = Number(config.day_cutoff_time.split(":")[0] ?? 0);

  // 默认今天
  const base = date ? new Date(date) : new Date();

  const toDate = getBusinessDate(base, cutoffHour);

  return {
    from: toDateString(toDate),
    to: toDateString(toDate),
  };
}

function getBusinessDate(base: Date, cutoffHour: number): Date {
  const date = new Date(base);

  if (date.getHours() >= cutoffHour) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}

export async function TodayToRange(): Promise<ReportDateRange> {
  const to = await getToday();
  const from = to;

  return {
    from,
    to,
  };
}

export async function getToday(): Promise<DateString> {
  const config = await getStatPeriodConfig();

  const cutoffHour = Number(config.day_cutoff_time.split(":")[0] ?? 0);

  const date = getBusinessDate(new Date(), cutoffHour);

  return toDateString(date);
}

export async function getYesterday(): Promise<DateString> {
  const config = await getStatPeriodConfig();

  const cutoffHour = Number(config.day_cutoff_time.split(":")[0] ?? 0);

  const base = new Date();
  base.setDate(base.getDate() - 1);

  const date = getBusinessDate(base, cutoffHour);

  return toDateString(date);
}
