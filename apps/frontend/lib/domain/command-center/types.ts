import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/utils/case-converter";

export type TunnelRuntimeRow = Database["app"]["Views"]["v_tunnel_runtime"]["Row"];

export type TbmRuntimeStateRow = Database["app"]["Views"]["v_tbm_runtime_state"]["Row"];

export type TbmProgressOverviewRow = Database["app"]["Views"]["v_tbm_progress_overview"]["Row"];

export type KpiCockpitGlobalRow = Database["app"]["Views"]["v_kpi_cockpit_global"]["Row"];

export type KpiTunnelRow = Database["app"]["Views"]["v_tunnel_kpi"]["Row"];
// export type CommandCenterSummaryRow =
//   Database["public"]["Views"]["v_command_center_summary"]["Row"];
// export type CommandCenterTunnelRow = Database["public"]["Views"]["v_command_center_tunnel"]["Row"];
// export type TunnelProgressOverviewRow =
//   Database["app"]["Views"]["v_tunnel_progress_overview"]["Row"];

// export type TunnelProgressByPeriodRows =
//   Database["public"]["Functions"]["get_tunnel_progress_report"]["Returns"];

// export type TbmRow = Database["eqp"]["Tables"]["tbms"]["Row"];
// export type TbmInsertRow = Database["eqp"]["Tables"]["tbms"]["Insert"];
// export type TbmUpdateRow = Database["eqp"]["Tables"]["tbms"]["Update"];

// export type TbmPickerRow = Database["eqp"]["Views"]["v_tbm_picker"]["Row"];

// export type tbmTypeCounts = Database["eqp"]["Views"]["v_tbm_type_counts"]["Row"];

// export type TbmManufacturerCounts = Database["eqp"]["Views"]["v_tbm_manufacturer_counts"]["Row"];

export type TunnelProgressReportItem = {
  completedLength: number;
  completedRingCount: number;
  planRingCount: number;
  projectName: string;
  tbmName: string;
  tunnelId: string;
  tunnelName: string;
};

export type CommandCenterSummary = {
  advancingCount: number;
  assemblyCount: number;
  faultCount: number;
  offlineCount: number;
  projectCount: number;
  refreshedAt: string;
  stoppedCount: number;
  tbmCount: number;
  tunnelCount: number;
};

export type TbmPhaseType = "advance" | "assembly" | "stop" | "fault" | "offline";

export interface TunnelRuntimeCardData {
  // 项目
  projectId: string;
  projectName: string;

  // 区间
  tunnelId: string;
  tunnelName: string;

  // TBM
  tbmId?: string;
  tbmName?: string;
  tbmCode?: string;

  // 状态
  phaseType: TbmPhaseType;
  heartbeatIsOnline: boolean;
  heartbeatLastSeenAt?: string;
  realdataIsOnline?: boolean;
  realdataLastSeenAt?: string;

  // 环号
  currentRing: number;
  totalRing: number;

  // 今日完成
  // todayRing: number;
  // todayPlanRing: number;

  // // 进度
  // progressPercent: number;

  sortOrder: number;
  // 时间
  recordedAt: string;

  // 跳转
  href?: string;
}

export const phaseLabelMap: Record<TbmPhaseType, string> = {
  advance: "掘进中",
  assembly: "拼装中",
  stop: "停机中",
  fault: "故障中",
  offline: "离线",
};

export const statusClassMap: Record<TbmPhaseType, string> = {
  advance: "rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600",

  assembly: "rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600",

  stop: "rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600",

  fault: "rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-600",

  offline: "rounded-full bg-slate-500/10 px-2 py-1 text-xs font-medium text-slate-600",
};

// export type TunnelProgressOverview = Camelize<TunnelProgressOverviewRow>;

export type TunnelRuntime = {
  tunnelId: string;
  tunnelName: string;
  tunnelFullName: string;

  projectId: string;
  projectName: string;

  regionId: string;
  regionName: string;

  tbmId: string | null;
  tbmName: string | null;
  tbmCode: string | null;

  scheduleStartDate: string | null;
  scheduleEndDate: string | null;
  actualStartDate: string | null;
  actualEndDate: string | null;

  startRing: number;
  endRing: number;
  startChainage: number | null;
  endChainage: number | null;

  tunnelStatusId: string;
  tunnelStatusName: string;

  sortOrder: number;
};

export type TbmRuntimeState = {
  tbmId: string;
  chainage: number | null;
  heartbeatIsOnline: boolean | null;
  heartbeatLastSeenAt: string | null;
  phaseStartAt: string | null;
  phaseType: string | null;
  realdataIsOnline: boolean | null;
  realdataLastSeenAt: string | null;
  ringNo: number | null;
};

export type TbmProgressOverview = {
  tbmId: string;
  currentWorkDate: string | null;
  monthAdvanceMeter: number | null;
  monthRingCount: number | null;
  monthStartWorkDate: string | null;
  refreshedAt: string | null;
  todayAdvanceMeter: number | null;
  todayRingCount: number | null;
  totalAdvanceMeter: number | null;
  totalRingEnd: number | null;
  weekAdvanceMeter: number | null;
  weekRingCount: number | null;
  weekStartWorkDate: string | null;
};

export type KpiCockpitGlobal = {
  advancingCount: number | null;
  assemblyCount: number | null;
  faultCount: number | null;
  monthMeter: number | null;
  monthPlanRing: number | null;
  monthProgressRate: number | null;
  monthRing: number | null;
  offlineCount: number | null;
  projectCount: number | null;
  refreshedAt: string | null;
  stoppedCount: number | null;
  tbmCount: number | null;
  todayMeter: number | null;
  todayPlanRing: number | null;
  todayRing: number | null;
  totalMeter: number | null;
  totalRing: number | null;
  tunnelCount: number | null;
  weekMeter: number | null;
  weekPlanRing: number | null;
  weekProgressRate: number | null;
  weekRing: number | null;
};

export type KpiTunnel = {
  tunnelId: string | null;
  tunnelName: string | null;
  regionName: string | null;
  projectName: string | null;

  tbmName: string | null;
  tbmCode: string | null;

  tunnelStatusName: string | null;

  latitude: number | null;
  longitude: number | null;

  scheduleEndDate: string | null;
  scheduleStartDate: string | null;
  actualEndDate: string | null;
  actualStartDate: string | null;

  tunnelLength: number | null;
  tunnelRingCount: number | null;

  chainage: number | null;
  ringNo: number | null;
  phaseType: TbmPhaseType;
  heartbeatIsOnline: boolean | null;
  realdataIsOnline: boolean | null;

  todayRingCount: number | null;
  todayAdvanceMeter: number | null;
  todayPlanRing: number | null;

  weekAdvanceMeter: number | null;
  weekPlanRing: number | null;
  weekRingCount: number | null;

  monthAdvanceMeter: number | null;
  monthPlanRing: number | null;
  monthRingCount: number | null;

  refreshedAt: string | null;
};
