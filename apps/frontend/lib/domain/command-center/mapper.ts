import {
  CommandCenterSummary,
  CommandCenterSummaryRow,
  CommandCenterTunnelRow,
  TunnelProgressOverviewRow,
  TunnelProgressOverview,
  TunnelRuntimeCardData,
} from "./types";

export function mapCommandCenterSummaryRowToEntity(
  row: CommandCenterSummaryRow
): CommandCenterSummary {
  return {
    advancingCount: row.advancing_count!,
    assemblyCount: row.assembly_count!,
    faultCount: row.fault_count!,
    offlineCount: row.offline_count!,
    projectCount: row.project_count!,
    refreshedAt: row.refreshed_at!,
    stoppedCount: row.stopped_count!,
    tbmCount: row.tbm_count!,
    tunnelCount: row.tunnel_count!,
  };
}

export function mapCommandCenterTunnelRowToEntity(
  row: CommandCenterTunnelRow
): TunnelRuntimeCardData {
  return {
    projectId: row.project_id!,
    projectName: row.project_name!,
    tunnelId: row.tunnel_id!,
    tunnelName: row.tunnel_name!,
    tbmId: row.tbm_id!,
    tbmName: row.tbm_name!,
    tbmCode: row.tbm_code!,
    phaseType: row.phase_type! as any,
    isOnline: row.is_online!,
    currentRing: row.current_ring!,
    totalRing: row.total_ring_count!,
    sortOrder: row.sort_order!,
    recordedAt: row.phase_start_at!,
  };
}

export function mapTunnelProgressOverviewRowToEntity(
  row: TunnelProgressOverviewRow
): TunnelProgressOverview {
  return {
    projectId: row.project_id!,
    projectName: row.project_name!,
    tunnelId: row.tunnel_id!,
    tunnelName: row.tunnel_name!,

    tbmId: row.tbm_id!,
    tbmName: row.tbm_name!,
    tbmCode: row.tbm_code!,
    totalRingCount: row.total_ring_count!,
    totalLengthMeter: row.total_length_meter!,
    todayRingCount: row.today_ring_count!,
    weekRingCount: row.week_ring_count!,
    monthRingCount: row.month_ring_count!,
    todayAdvanceMeter: row.today_advance_meter!,
    weekAdvanceMeter: row.week_advance_meter!,
    monthAdvanceMeter: row.month_advance_meter!,
    totalAdvanceRingCount: row.total_advance_ring_count!,
    totalAdvanceMeter: row.total_advance_meter!,
    currentWorkDate: row.current_work_date!,
    weekStartWorkDate: row.week_start_work_date!,
    monthStartWorkDate: row.month_start_work_date!,
    sortOrder: row.sort_order!,
    refreshedAt: row.refreshed_at!,
  };
}
