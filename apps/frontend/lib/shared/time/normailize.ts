import { weekToRange } from "./engine/week";
import { monthToRange } from "./engine/month";
import { ReportPeriod } from "./types";

export type CompiledReportQuery = {
  from: string;
  to: string;

  cacheKey: string;

  sqlWhere: string;

  label: string;

  granularity: ReportPeriod;
};

export async function normalizeReportQuery(query: any) {
  switch (query.period) {
    case "daily":
      return {
        from: query.date,
        to: query.date,
      };

    case "weekly":
      return await weekToRange(query.week);

    case "monthly":
      return await monthToRange(query.month);

    case "custom":
      return {
        from: query.from,
        to: query.to,
      };
  }
}

export function buildCacheKey(query: any, from: string, to: string) {
  return [
    "report",
    query.period,
    query.week ?? "",
    query.month ?? "",
    query.date ?? "",
    from,
    to,
  ].join(":");
}

export function buildLabel(query: any, from: string, to: string) {
  switch (query.period) {
    case "daily":
      return `日报 ${from}`;

    case "weekly":
      return `周报 ${query.week}`;

    case "monthly":
      return `月报 ${query.month}`;

    case "custom":
      return `自定义 ${from} ~ ${to}`;
  }
}

export function resolveGranularity(period: string) {
  switch (period) {
    case "daily":
      return "day";
    case "weekly":
      return "week";
    case "monthly":
      return "month";
    case "year":
      return "year";
    default:
      return "day";
  }
}
