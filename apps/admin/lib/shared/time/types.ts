import { DateString } from "@/lib/utils/types/date.types";

export type ReportPeriod = "daily" | "weekly" | "monthly" | "quarter" | "year" | "custom";

export type StatPeriodConfig = {
  week_start_dow: number;
  month_start_day: number;
  day_cutoff_time: string;
  timezone: string;
};

export type ReportDateRange = {
  from: DateString;
  to: DateString;
};
