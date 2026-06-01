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

import { Button } from "@/components/ui/button";
import { DashboardMap } from "@/components/command-center/DashboardMap";
import { TbmStatusSummary } from "@/components/command-center/TbmStatusSummary";
import { AdvanceMetricSummary } from "@/components/command-center/AdvanceMetricSummary";
import { ProjectSummary } from "@/components/command-center/ProjectSummary";
import { WarningSummary } from "@/components/command-center/WarningSummary";
import { TunnelProgressPanel } from "@/components/command-center/TunnelProgressPanel";
import { WarningPanel } from "@/components/command-center/WarningPanel";

import type { CommandCenterSummary } from "@/lib/domain/command-center/types";
import { useCommandCenterSummary } from "@/lib/domain/command-center/useCommandCenterSummary";

interface CommandCenterDashboardProps {
  initialSummary: CommandCenterSummary;
}

export function CommandCenterDashboard({ initialSummary }: CommandCenterDashboardProps) {
  const { data, loading, refreshing, error } = useCommandCenterSummary(initialSummary);

  const summary = data ?? initialSummary;

  if (loading) {
    return <div className="p-6 text-sm text-muted-foreground">加载中...</div>;
  }

  if (error || !data) {
    return <div className="p-6 text-sm text-red-500">{error ?? "暂无数据"}</div>;
  }

  const points = [
    { id: "1", name: "CT-01号盾构", left: 18, top: 28 },
    { id: "2", name: "CT-02号盾构", left: 32, top: 46 },
    { id: "3", name: "CT-03号盾构", left: 46, top: 64 },
    { id: "4", name: "CT-04号盾构", left: 60, top: 34 },
    { id: "5", name: "CT-05号盾构", left: 74, top: 52 },
  ];

  return (
    <main className="relative h-[calc(100vh-8rem)]  overflow-hidden ">
      {/* 地图全屏底层 */}
      <div className="absolute inset-0 z-0 ">
        <DashboardMap points={points} />
      </div>

      <section className="relative z-10 p-6">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 grid grid-cols-4 gap-5">
            <TbmStatusSummary
              advancing={summary.advancingCount}
              assembly={summary.assemblyCount}
              stopped={summary.stoppedCount}
              fault={summary.faultCount}
              offline={summary.offlineCount}
              refreshing={refreshing}
            />

            <AdvanceMetricSummary rings={100} distance={1025.6} avgRings={11} avgDistance={34.2} />

            <ProjectSummary
              projects={initialSummary.projectCount}
              tunnels={initialSummary.tunnelCount}
              tbms={initialSummary.tbmCount}
            />

            <WarningSummary high={5} medium={3} low={2} />
          </div>

          <div className="col-span-12 space-y-5 xl:col-span-3">
            <TunnelProgressPanel data={tunnelProgressData} />
          </div>

          <div className="col-span-12 space-y-5 xl:col-span-6" />

          <div className="col-span-12 space-y-5 xl:col-span-3">
            <WarningPanel warnings={warnings} />
          </div>
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
