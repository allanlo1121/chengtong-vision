'use client'

import { useTunnelProgress } from "@/hooks/useTunnelCompletionRates";
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { useProgressRefresh } from "@/contexts/ProgressRefreshProvider";

export default function TunnelProgressList() {
  const { tunnels } = useTunnelFilter();
  const { refreshCount } = useProgressRefresh();

  const { data, loading, error } = useTunnelProgress(tunnels, refreshCount, {
    sortBy: "completed",   
    filterZero: true
  });

  if (loading && data.length === 0) return <div className="text-sm text-gray-500">加载中...</div>;
  if (error) return <div className="text-sm text-red-500">加载失败：{error.message}</div>;

  return (
    <div className="space-y-2">
      {data.map((tunnel) => (
        <div key={tunnel.label} className="border rounded p-2">
          <div className="font-medium">{tunnel.label}</div>
          <div className="text-sm text-gray-500">
            已完成 {tunnel.completed} / {tunnel.total} 环 ({tunnel.percentage}%)
          </div>
          <div className="w-full bg-gray-200 h-2 rounded mt-1 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${tunnel.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
