"use client";

import { useRouter } from "next/navigation";
import { ReportToolbar } from "./ReportToolbar";
import { ReportQueryType } from "@/lib/domain/command-center/queries";
import { DataTable } from "@/lib/domain/command-center/components/data-table";
import { columns } from "@/lib/domain/command-center/components/tunnel-progress-overview-columns";

export function ReportsClientPage({ query, data }: { query: ReportQueryType; data: any }) {
  const router = useRouter();

  const updateQuery = (patch: Partial<ReportQueryType>) => {
    const next = { ...query, ...patch };

    const qs = new URLSearchParams();

    Object.entries(next).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        qs.set(k, String(v));
      }
    });

    router.push(`/workspace/command-center/reports?${qs.toString()}`);
  };

  return (
    <>
      <ReportToolbar query={query} onChange={updateQuery} />

      <DataTable data={data} columns={columns} />
    </>
  );
}
