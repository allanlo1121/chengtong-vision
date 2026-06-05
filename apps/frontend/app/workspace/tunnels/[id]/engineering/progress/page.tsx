import { format, subDays } from "date-fns";
import { ProgressToolbar } from "./_components/ProgressToolBar";
import { listTbmDailyProgressByTbmIdAndDateRange } from "@/lib/domain/tbm-runtime/services/";
import { parseDateString } from "@/lib/utils/date";
import { TunnelDailyProgressTable } from "@/components/domain/tbm-runtime/data-tables/tunnel-daily-progress-table";
import { TunnelDailyProgressChart } from "@/components/domain/tbm-runtime/charts/TunnelDailyProgressChart";
import { ErrorBlock } from "@/components/common/error-block";
import { fetchTbmAssignmentByTunnelId } from "@/lib/domain/tbm-assignment/services/query.service";

function getStringParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function TunnelDailyProgressPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id: tunnelId } = await params;

  const sp = await searchParams;

  // const query = resolveRingEfficiencyToolQuery(sp);

  if (!tunnelId) {
    throw new Error("Missing tunnel id");
  }
  const view = getStringParam(sp.view) || "table";
  const today = new Date();

  const to = parseDateString(getStringParam(sp.to) || format(today, "yyyy-MM-dd"));

  const from = parseDateString(getStringParam(sp.from) || format(subDays(today, 30), "yyyy-MM-dd"));

  let progress;
  let tbmAssignment;

  try {
    tbmAssignment = await fetchTbmAssignmentByTunnelId(tunnelId);
    progress = await listTbmDailyProgressByTbmIdAndDateRange(tbmAssignment.tbmId, from, to);
  } catch (error: unknown) {
    console.error("Failed to fetch TBM daily progress for tunnel", { tunnelId, error });
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  console.log("Tunnel Daily Progress:", progress);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProgressToolbar from={from} to={to} />
      <div className="min-h-0 flex-1 p-4">
        {view === "table" ? (
          <TunnelDailyProgressTable data={progress} />
        ) : (
          <TunnelDailyProgressChart data={progress} />
        )}
      </div>
    </div>
  );
}
