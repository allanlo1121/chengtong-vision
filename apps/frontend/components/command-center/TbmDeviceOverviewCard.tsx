// components/command-center/tbm-device-overview-card.tsx

import { Gauge, Pickaxe, Wrench, PauseCircle, AlertTriangle } from "lucide-react";
import { Panel } from "./panel";
import { TbmStatusKpi } from "./TbmStatusKpi";
import { TbmDeviceOverviewChart } from "./TbmDeviceOverviewChart";

interface TbmDeviceOverviewCardProps {
  total?: number;
  advancing?: number;
  assembly?: number;
  stopped?: number;
  fault?: number;
}

export function TbmDeviceOverviewCard({
  total = 18,
  advancing = 8,
  assembly = 6,
  stopped = 3,
  fault = 1,
}: TbmDeviceOverviewCardProps) {
  return (
    <Panel title="盾构设备运行状态" icon={Gauge}>
      <div className="grid grid-cols-4 divide-x divide-border py-6">
        <TbmStatusKpi
          label="掘进中"
          value={advancing}
          unit="台"
          icon={Pickaxe}
          className="text-emerald-500"
        />

        <TbmStatusKpi
          label="拼装中"
          value={assembly}
          unit="台"
          icon={Wrench}
          className="text-blue-500"
        />

        <TbmStatusKpi
          label="停机中"
          value={stopped}
          unit="台"
          icon={PauseCircle}
          className="text-amber-500"
        />

        <TbmStatusKpi
          label="故障中"
          value={fault}
          unit="台"
          icon={AlertTriangle}
          className="text-red-500"
        />
      </div>
    </Panel>
  );
}
