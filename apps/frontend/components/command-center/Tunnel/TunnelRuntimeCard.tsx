import { KpiTunnel } from "@/lib/domain/command-center/types";
import Link from "next/link";

import { ConnectionIndicator } from "@/components/equip/connection-indicator";

import TbmRuntimeRenderer from "./TbmRuntimeRenderer";
import { RiskInfo } from "./RiskInfo";
import { TunnelProgressRing } from "./TunnelProgressRing";

export type TunnelDisplayState = "offline" | "advance" | "assembly" | "stop";

export function TunnelRuntimeCard({ data }: { data: KpiTunnel }) {
  return (
    <Link href={`/workspace/tunnels/${data.tunnelId}`} className="block">
      <div className="@container aspect-[16/9] overflow-hidden h-full grid grid-rows-[56px_1fr_64px] rounded-2xl bg-white/80 shadow-xl backdrop-blur-[2px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="truncate text-lg font-bold text-slate-900">
            {data.projectName} · {data.tunnelName} · {data.tbmName}
          </div>

          <ConnectionIndicator
            status={data.heartbeatIsOnline ?? false}
            lastSeen={data.refreshedAt ?? ""}
            size={12}
          />
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 items-center gap-4 px-4 py-3 ">
          {/* 左：Progress */}
          <TunnelProgressRing value={data.ringNo ?? 0} total={data.tunnelRingCount ?? 0} />

          {/* 右：状态 */}
          <div className="relative grid place-items-center text-muted-foreground font-mono text-xs border border-dashed border-slate-400 p-2 rounded-md bg-[url('/soil.svg')] bg-repeat bg-center bg-contain">
            {/* 暗层（增强HUD效果） */}
            <div className="absolute inset-0 bg-stone-300/30" />
            <TbmRuntimeRenderer status={data.phaseType} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-4 flex items-center">
          <RiskInfo />
        </div>
      </div>
    </Link>
  );
}
