import { Database } from "@/lib/core/database/types";

export type CommandCenterSummaryRow =
  Database["public"]["Views"]["v_command_center_summary"]["Row"];
export type CommandCenterTunnelRow = Database["public"]["Views"]["v_command_center_tunnel"]["Row"];
export type TunnelProgressOverviewRow =
  Database["public"]["Views"]["v_tunnel_progress_overview"]["Row"];

// export type TbmRow = Database["eqp"]["Tables"]["tbms"]["Row"];
// export type TbmInsertRow = Database["eqp"]["Tables"]["tbms"]["Insert"];
// export type TbmUpdateRow = Database["eqp"]["Tables"]["tbms"]["Update"];

// export type TbmPickerRow = Database["eqp"]["Views"]["v_tbm_picker"]["Row"];

// export type tbmTypeCounts = Database["eqp"]["Views"]["v_tbm_type_counts"]["Row"];

// export type TbmManufacturerCounts = Database["eqp"]["Views"]["v_tbm_manufacturer_counts"]["Row"];

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
  isOnline: boolean;

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

export type TunnelProgressOverview = {
  projectId: string;
  projectName: string;
  tunnelId: string;
  tunnelName: string;
  tunnelStatusId: string;
  tunnelStatusCode: string;
  tunnelStatusName: string;
  tbmId: string;
  tbmName: string;
  tbmCode: string;
  totalLengthMeter: number | null;
  totalRingCount: number;
  todayRingCount: number;
  weekRingCount: number;
  monthRingCount: number;
  todayAdvanceMeter: number;
  weekAdvanceMeter: number;
  monthAdvanceMeter: number;
  totalAdvanceRingCount: number;
  totalAdvanceMeter: number | null;
  currentWorkDate: string;
  weekStartWorkDate: string;
  monthStartWorkDate: string;
  sortOrder: number;
  refreshedAt: string;
};
