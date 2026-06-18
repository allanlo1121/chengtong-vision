import { ReportQueryType } from "@/lib/domain/command-center/queries/report.query";
import { getStatPeriodConfig } from "../config/config-loader";
import { dayToRange, getToday, TodayToRange } from "./day";
import { monthToRange, getCurrentMonth } from "./month";
import { weekToRange, getCurrentWeek } from "./week";
import { ReportDateRange } from "../types";

export async function resolvePeriod(query: ReportQueryType): Promise<ReportDateRange> {
  switch (query.period) {
    case "daily":
      return dayToRange(query.date!);

    case "monthly":
      return monthToRange(query.month!);

    case "weekly":
      return weekToRange(query.week!);

    default:
      return dayToRange();
  }
}
