import { toDateString } from "@/lib/utils/date";
import { getStatPeriodConfig } from "../config/config-loader";
import { ReportDateRange } from "../types";

export async function monthToRange(monthKey: string): Promise<ReportDateRange> {
  const config = await getStatPeriodConfig();

  const [yearStr, monthStr] = monthKey.split("-");

  const year = Number(yearStr);
  const month = Number(monthStr);

  const start = new Date(year, month - 1, config.month_start_day);

  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setDate(end.getDate() - 1);

  return {
    from: toDateString(start),
    to: toDateString(end),
  };
}

export async function getCurrentMonth(): Promise<string> {
  const config = await getStatPeriodConfig();

  console.log("getCurrentMonth", { config });

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // 规则：26号及之后算下个月
  const offset = day >= config.month_start_day ? 1 : 0;

  const target = new Date(year, month - 1 + offset, 1);

  const targetYear = target.getFullYear();
  const targetMonth = target.getMonth() + 1;

  return `${targetYear}-${String(targetMonth).padStart(2, "0")}`;
}
