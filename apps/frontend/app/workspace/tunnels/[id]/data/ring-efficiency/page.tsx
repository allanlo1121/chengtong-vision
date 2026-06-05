import { resolveRingEfficiencyToolQuery } from "./_components/tool-query";
import { fetchTbmWorkTimeline } from "@/lib/domain/tbm-runtime/services";

import TimelineVis from "@/components/domain/tbm-runtime/timeline/TimelineVis";
import { RingEfficiencyToolbar } from "./_components/RingEfficiencyToolbar";
import { PhaseEfficiencyPieChart } from "@/components/domain/tbm-runtime/charts/PhaseEfficiencyPieChart";
import TbmStatsCards from "./_components/TbmStatsCardGroup";

import { fetchTbmAssignmentByTunnelId } from "@/lib/domain/tbm-assignment/services/query.service";
import { ErrorBlock } from "@/components/common/error-block";

export default async function RingEfficiencyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id: tunnelId } = await params;

  const sp = await searchParams;

  const query = resolveRingEfficiencyToolQuery(sp);

  if (!tunnelId) {
    throw new Error("Missing tunnel id");
  }
  let tbmAssignment;
  try {
    tbmAssignment = await fetchTbmAssignmentByTunnelId(tunnelId);
  } catch (error: unknown) {
    console.error("Failed to fetch TBM assignment for tunnel", { tunnelId, error: error });
    return <ErrorBlock message={error instanceof Error ? error.message : "匹配Tbm失败"} />;
  }

  const { phases, rings, durations } = await fetchTbmWorkTimeline({
    tbmId: tbmAssignment.tbmId,
    startAt: query.startAt,
    endAt: query.endAt,
  });

  const totalDurationMs = phases
    .filter((phase) => phase.type === "advance" || phase.type === "assembly")
    .reduce((sum, phase) => {
      const start = new Date(phase.start).getTime();
      const end = new Date(phase.end).getTime();

      return sum + (end - start);
    }, 0);
  const totalRings = rings.length - 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <RingEfficiencyToolbar date={query.date} />
      <div className="w-full row-span-4 grid grid-cols-2 gap-4 overflow-hidden">
        <div className="col-span-1 w-full  border-2 border-gray-300 bg-white p-4">
          {durations && durations.length > 0 ? (
            <PhaseEfficiencyPieChart data={durations} />
          ) : (
            <div className="text-center text-gray-500 mt-4">暂无阶段数据</div>
          )}
        </div>
        <div className="col-span-1 w-full  border-2 border-gray-300 bg-white p-4">
          <TbmStatsCards distance={0} rings={totalRings} hours={totalDurationMs / 3600000} />
        </div>
      </div>

      <div className="min-h-0 flex-1 py-4">
        <TimelineVis
          start={query.viewStartAt}
          end={query.viewEndAt}
          phases={phases}
          rings={rings}
        />
      </div>
    </div>
  );
}
