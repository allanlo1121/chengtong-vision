import { format, subDays } from "date-fns";
import { ProgressToolbar } from "./_components/ProgressToolBar";
import { listTunnelDailyProgressByTunnelIdAndDateRange } from "@/lib/domain/tbm-runtime/services/tunnel-daily-progress.service";
import { parseDateString, toDateString } from "@/lib/utils/date";
import { TunnelDailyProgressTable } from "@/components/domain/tbm-runtime/data-tables/tunnel-daily-progress-table";
import { TunnelDailyProgressChart } from "@/components/domain/tbm-runtime/charts/TunnelDailyProgressChart";

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

  const result = await listTunnelDailyProgressByTunnelIdAndDateRange(tunnelId, from, to);

  console.log("Tunnel Daily Progress:", result);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProgressToolbar from={from} to={to} />
      <div className="min-h-0 flex-1 p-4">
        {view === "table" ? (
          <TunnelDailyProgressTable data={result} />
        ) : (
          <TunnelDailyProgressChart data={result} />
        )}
      </div>
    </div>
  );
}
