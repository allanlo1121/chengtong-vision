"use client";

import {
  Bell,
  Cloud,
  Home,
  Users,
  FileText,
  HardHat,
  Mail,
  LogOut,
  TrainTrack,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/core/utils";

import { Button } from "@/components/ui/button";

import type { TunnelRuntimeCardData } from "@/lib/domain/command-center/types";
import { useCommandCenterTunnel } from "@/lib/domain/command-center/useCommandCenterTunnel";
import { TunnelRuntimeCard } from "@/components/command-center/Tunnel/TunnelRuntimeCard";

interface TunnelCenterDashboardProps {
  initialTunnelsRuntimeData: TunnelRuntimeCardData[];
}

export function TunnelCenterDashboard({ initialTunnelsRuntimeData }: TunnelCenterDashboardProps) {
  const { data, loading, refreshing, error } = useCommandCenterTunnel(initialTunnelsRuntimeData);

  const tunnels = data ?? initialTunnelsRuntimeData;

  if (loading) {
    return <div className="p-6 text-sm text-muted-foreground">加载中...</div>;
  }

  if (error || !data) {
    return <div className="p-6 text-sm text-red-500">{error ?? "暂无数据"}</div>;
  }

  return (
    <main className="relative h-[calc(100vh-8rem)]  overflow-hidden ">
      <section className="relative z-10 p-6">
        <div
          className={cn(
            "grid gap-5",

            tunnels.length === 1 && "grid-cols-4",

            tunnels.length === 2 && "grid-cols-2",

            tunnels.length >= 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          )}
        >
          {tunnels.map((tunnel) => (
            <TunnelRuntimeCard key={tunnel.tunnelId} data={tunnel} />
          ))}
        </div>
      </section>
    </main>
  );
}

const tunnelProgressData = [
  { id: "1", name: "中湖左线", completed: 955, remaining: 128 },
  { id: "2", name: "新基左线", completed: 160, remaining: 1837 },
  { id: "3", name: "五五左线", completed: 1264, remaining: 844 },
];

const warnings = [
  { id: "1", title: "CT-06 液压油温过高", level: "high" as const, time: "09:48:12" },
  { id: "2", title: "CT-04 推进速度偏低", level: "medium" as const, time: "09:46:10" },
  { id: "3", title: "CT-02 刀盘扭矩偏高", level: "low" as const, time: "09:42:01" },
];
