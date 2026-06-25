import {
  fetchTunnelProgressByPeriod,
  fetchTunnelProgressOverview,
} from "@/lib/domain/command-center/server.service";
import { reportQuery } from "@/lib/domain/command-center/queries/report.query";
import { ReportsClientPage } from "./_components/ReportsClientPage";
import { raw } from "next/dist/build/webpack/loaders/lightningcss-loader/src/loader";
import { getToday } from "@/lib/shared/time/engine/day";
import { getCurrentWeek } from "@/lib/shared/time/engine/week";
import { getCurrentMonth } from "@/lib/shared/time/engine/month";

export const REPORT_PERIODS = ["daily", "weekly", "monthly"] as const;

export type ReportPeriod = (typeof REPORT_PERIODS)[number];

interface ReportsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const rawParams = await searchParams;

  const params = reportQuery.parse(rawParams);

  const normalizedQuery = {
    ...params,
    date: params.date ?? (await getToday()),
    week: params.week ?? (await getCurrentWeek()),
    month: params.month ?? (await getCurrentMonth()),
  };

  let result;
  const data = await fetchTunnelProgressByPeriod(normalizedQuery);

  console.log("===data===", data);
  return (
    <>
      {/* <DashboardBackground /> */}
      <ReportsClientPage query={normalizedQuery} data={data} />
    </>
  );
}
