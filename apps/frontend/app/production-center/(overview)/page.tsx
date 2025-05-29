// app/production-center/dashboard/page.tsx
"use client"

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { useProgressRefresh } from "@/contexts/ProgressRefreshProvider";
import { useTotalTunnelProgress, useTunnelCompletionRates, use7DayTunnelProgress } from "@/hooks";
import ProgressSectionWrapper from "@/components/dashboard/ProgressSectionWrapper";
import TotalTunnelProgressCards from "@/components/dashboard/TotalTunnelProgressCards";
import ProgressTrendChart from "@/components/dashboard/ProgressTrendChart";
import TunnelProgressRatioChart from "@/components/dashboard/TunnelProgressRatioChart";
import Tunnel7DayBarChart from "@/components/dashboard/Tunnel7DayBarChart";
import TunnelCountCards from "@/components/dashboard/TunnelCountCards";
export default function Page() {
  const { tunnelIds, tunnels } = useTunnelFilter();           // 所有组件共享
  const { refreshCount } = useProgressRefresh();   // 自动刷新机制


  const { data: cards } = useTotalTunnelProgress(tunnels, refreshCount);
  // const { data: trends } = useProgressTrend(tunnels, refreshCount);
  const { data: ratio, loading } = useTunnelCompletionRates(tunnels, refreshCount);

  const { data: weekly } = use7DayTunnelProgress(tunnels, refreshCount);


  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 第一部分：完成总览 */}
      <ProgressSectionWrapper title="完成总览">
        <div className="flex flex-row gap-4 h-32 border-4 border-green-200">
          {/* 左侧卡片 */}
          <Suspense fallback={<Skeleton className="h-full w-1/5 rounded-md" />}>
            <TunnelCountCards tunnels={tunnels} />
          </Suspense>

          {/* 右侧卡片 */}
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-full w-full rounded-md" />
                ))}
              </div>
            }
          >
            <TotalTunnelProgressCards cards={cards ?? {}} />
          </Suspense>
        </div>
      </ProgressSectionWrapper>

      {/* 第二部分：图表区域 */}
      <div className="w-full flex flex-row gap-4 h-[calc(100vh-200px)]">
        {/* 左侧：两个图表垂直排布 */}
        <div className="flex flex-col flex-[4] min-w-0 gap-4">
          <ProgressSectionWrapper title="趋势图">
            <ProgressTrendChart tunnelIds={tunnelIds} refreshCount={refreshCount} />
          </ProgressSectionWrapper>

          <ProgressSectionWrapper title="完成比例">
            <TunnelProgressRatioChart data={ratio ?? []} loading={loading} />
          </ProgressSectionWrapper>
        </div>

        {/* 右侧：7日条形图 */}
        <div className="flex-[1] min-w-0 border-2 border-amber-500">
          <Tunnel7DayBarChart data={weekly} />
        </div>
      </div>
    </div>

  );
}
