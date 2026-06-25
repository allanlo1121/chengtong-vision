"use client";

import { TunnelRuntimeCard } from "@/components/command-center/Tunnel/TunnelRuntimeCard";
import { useKpiTunnel } from "@/hooks/use-kpi-tunnel";

export function TunnelCenterDashboard() {
  const { data: tunnels, loading, isLoading, error } = useKpiTunnel();

  if (loading) {
    return <div className="p-6 text-sm text-muted-foreground">加载中...</div>;
  }

  if (error || !tunnels) {
    return <div className="p-6 text-sm text-red-500">{error ?? "暂无数据"}</div>;
  }

  return (
    <main className="relative h-[calc(100vh-8rem)]  overflow-hidden ">
      <section className="relative z-10 p-6">
        <div className="grid grid-cols-4 gap-5">
          {tunnels.map((tunnel) => (
            <TunnelRuntimeCard key={tunnel.tunnelId} data={tunnel} />
          ))}
        </div>
      </section>
    </main>
  );
}
