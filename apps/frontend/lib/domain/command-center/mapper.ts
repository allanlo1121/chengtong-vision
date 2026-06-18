import {
  // CommandCenterSummary,
  // CommandCenterSummaryRow,
  // CommandCenterTunnelRow,
  // TunnelProgressOverviewRow,
  // TunnelProgressOverview,
  // TunnelRuntimeCardData,
  // TunnelProgressReportItem,
  // TunnelProgressByPeriodRows,
  TunnelRuntimeRow,
  TunnelRuntime,
  TbmRuntimeState,
  TbmRuntimeStateRow,
} from "./types";

// export function mapCommandCenterSummaryRowToEntity(
//   row: CommandCenterSummaryRow
// ): CommandCenterSummary {
//   return {
//     advancingCount: row.advancing_count!,
//     assemblyCount: row.assembly_count!,
//     faultCount: row.fault_count!,
//     offlineCount: row.offline_count!,
//     projectCount: row.project_count!,
//     refreshedAt: row.refreshed_at!,
//     stoppedCount: row.stopped_count!,
//     tbmCount: row.tbm_count!,
//     tunnelCount: row.tunnel_count!,
//   };
// }

// export function mapCommandCenterTunnelRowToEntity(
//   row: CommandCenterTunnelRow
// ): TunnelRuntimeCardData {
//   return {
//     projectId: row.project_id!,
//     projectName: row.project_name!,
//     tunnelId: row.tunnel_id!,
//     tunnelName: row.tunnel_name!,
//     tbmId: row.tbm_id!,
//     tbmName: row.tbm_name!,
//     tbmCode: row.tbm_code!,
//     phaseType: row.phase_type! as any,
//     heartbeatIsOnline: row.heartbeat_is_online!,
//     heartbeatLastSeenAt: row.heartbeat_last_seen_at!,
//     realdataIsOnline: row.realdata_is_online!,
//     realdataLastSeenAt: row.realdata_last_seen_at!,
//     currentRing: row.current_ring!,
//     totalRing: row.total_ring_count!,
//     sortOrder: row.sort_order!,
//     recordedAt: row.phase_start_at!,
//   };
// }

// export function mapTunnelProgressOverviewRowToEntity(
//   row: TunnelProgressOverviewRow
// ): TunnelProgressOverview {
//   return {
//     projectId: row.project_id!,
//     projectName: row.project_name!,
//     tunnelId: row.tunnel_id!,
//     tunnelName: row.tunnel_name!,

//     tbmId: row.tbm_id!,
//     tbmName: row.tbm_name!,
//     tbmCode: row.tbm_code!,
//     totalRingCount: row.total_ring_count!,
//     totalLengthMeter: row.total_length_meter!,
//     todayRingCount: row.today_ring_count!,
//     weekRingCount: row.week_ring_count!,
//     monthRingCount: row.month_ring_count!,
//     todayAdvanceMeter: row.today_advance_meter!,
//     weekAdvanceMeter: row.week_advance_meter!,
//     monthAdvanceMeter: row.month_advance_meter!,
//     totalAdvanceRingCount: row.total_advance_ring_count!,
//     totalAdvanceMeter: row.total_advance_meter!,
//     currentWorkDate: row.current_work_date!,
//     weekStartWorkDate: row.week_start_work_date!,
//     monthStartWorkDate: row.month_start_work_date!,
//     sortOrder: row.sort_order!,
//     refreshedAt: row.refreshed_at!,
//   };
// }

// export function mapTunnelProgressReport(
//   rows: TunnelProgressByPeriodRows
// ): TunnelProgressReportItem[] {
//   return rows.map((row) => ({
//     completedLength: row.completed_length!,
//     completedRingCount: row.completed_ring_count!,
//     planRingCount: row.plan_ring_count!,
//     projectName: row.project_name!,
//     tbmName: row.tbm_name!,
//     tunnelId: row.tunnel_id!,
//     tunnelName: row.tunnel_name!,
//   }));
// }

export function mapTunnelRuntime(row: TunnelRuntimeRow): TunnelRuntime {
  return {
    tunnelId: row.tunnel_id!,
    tunnelName: row.tunnel_name!,
    tunnelFullName: row.tunnel_full_name!,
    projectId: row.project_id!,
    projectName: row.project_name!,
    regionId: row.region_id!,
    regionName: row.region_name!,
    tbmId: row.tbm_id,
    tbmName: row.tbm_name,
    tbmCode: row.tbm_code,
    scheduleStartDate: row.schedule_start_date,
    scheduleEndDate: row.schedule_end_date,
    actualStartDate: row.actual_start_date,
    actualEndDate: row.actual_end_date,
    startRing: row.start_ring!,
    endRing: row.end_ring!,
    startChainage: row.start_chainage,
    endChainage: row.end_chainage,
    tunnelStatusId: row.tunnel_status_id!,
    tunnelStatusName: row.tunnel_status_name!,
    sortOrder: row.sort_order ?? 0,
  };
}

export function mapTbmRuntimeState(row: TbmRuntimeStateRow): TbmRuntimeState {
  return {
    tbmId: row.tbm_id!,
    chainage: row.chainage,
    ringNo: row.ring_no,
    phaseType: row.phase_type as any,
    phaseStartAt: row.phase_start_at,
    heartbeatIsOnline: row.heartbeat_is_online!,
    heartbeatLastSeenAt: row.heartbeat_last_seen_at!,
    realdataIsOnline: row.realdata_is_online!,
    realdataLastSeenAt: row.realdata_last_seen_at!,
  };
}
