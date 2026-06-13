import { DataTable } from "@/lib/domain/command-center/components/data-table";
import { fetchTunnelProgressOverview } from "@/lib/domain/command-center/server.service";
import { columns } from "@/lib/domain/command-center/components/tunnel-progress-overview-columns";
import React from "react";
import { Tabs } from "@/components/ui/tabs";

export const REPORT_PERIODS = ["daily", "weekly", "monthly"] as const;

export type ReportPeriod = (typeof REPORT_PERIODS)[number];

interface ReportsPageProps {
  searchParams?: { period?: ReportPeriod };
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const period: ReportPeriod = searchParams?.period || "daily";
  const data = await fetchTunnelProgressOverview();

  console.log("===data===", data);
  return (
    <>
      {/* <DashboardBackground /> */}
      <div>
        <Tabs value={period} />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
