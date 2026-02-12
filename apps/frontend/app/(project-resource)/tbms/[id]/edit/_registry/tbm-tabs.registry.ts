// app/tbms/[id]/_registry/tbm-tabs.registry.ts
import OverviewTab from "../_components/OverviewTab";
import CustodyTab from "../_components/CustodyTab";
import MaintenanceTab from "../_components/MaintenanceTab";
import RemouldTab from "../_components/RemouldTab";

export const TBM_TABS = [
  { key: "overview", label: "基本信息", Component: OverviewTab },
  { key: "custody", label: "使用记录", Component: CustodyTab },
  { key: "maintenance", label: "修理记录", Component: MaintenanceTab },
  { key: "remould", label: "改造记录", Component: RemouldTab },
] as const;
