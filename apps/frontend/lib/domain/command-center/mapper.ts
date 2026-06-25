import {
  TunnelRuntimeRow,
  TunnelRuntime,
  TbmRuntimeState,
  TbmRuntimeStateRow,
  KpiCockpitGlobal,
  KpiCockpitGlobalRow,
  KpiTunnel,
  KpiTunnelRow,
  TbmPhaseType,
} from "./types";

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
    phaseType: row.phase_type as TbmPhaseType,
    phaseStartAt: row.phase_start_at,
    heartbeatIsOnline: row.heartbeat_is_online!,
    heartbeatLastSeenAt: row.heartbeat_last_seen_at!,
    realdataIsOnline: row.realdata_is_online!,
    realdataLastSeenAt: row.realdata_last_seen_at!,
  };
}

export function mapKpiCockpitGlobal(row: KpiCockpitGlobalRow): KpiCockpitGlobal {
  return {
    projectCount: row.project_count!,
    tunnelCount: row.tunnel_count!,
    tbmCount: row.tbm_count!,
    advancingCount: row.advancing_count!,
    assemblyCount: row.assembly_count!,
    faultCount: row.fault_count!,
    offlineCount: row.offline_count!,
    stoppedCount: row.stopped_count!,

    monthMeter: row.month_meter!,
    monthRing: row.month_ring!,
    monthPlanRing: row.month_plan_ring!,
    monthProgressRate: row.month_progress_rate!,

    weekMeter: row.week_meter!,
    weekRing: row.week_ring!,
    weekPlanRing: row.week_plan_ring!,
    weekProgressRate: row.week_progress_rate!,

    todayMeter: row.today_meter!,
    todayRing: row.today_ring!,
    todayPlanRing: row.today_plan_ring!,

    totalMeter: row.total_meter!,
    totalRing: row.total_ring!,

    refreshedAt: row.refreshed_at!,
  };
}

export function mapKpiTunnel(row: KpiTunnelRow): KpiTunnel {
  return {
    tunnelId: row.tunnel_id,
    tunnelName: row.tunnel_name,
    projectName: row.project_name,
    regionName: row.region_name,
    tbmName: row.tbm_name,
    tbmCode: row.tbm_code,

    tunnelStatusName: row.tunnel_status_name,
    scheduleEndDate: row.schedule_end_date,
    scheduleStartDate: row.schedule_start_date,
    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,

    tunnelLength: row.tunnel_length,
    tunnelRingCount: row.tunnel_ring_count,

    latitude: row.latitude,
    longitude: row.longitude,

    phaseType: row.phase_type as TbmPhaseType,
    chainage: row.chainage,
    ringNo: row.ring_no,
    heartbeatIsOnline: row.heartbeat_is_online,
    realdataIsOnline: row.realdata_is_online,

    todayRingCount: row.today_ring_count,
    todayAdvanceMeter: row.today_advance_meter,
    todayPlanRing: row.today_plan_ring,

    weekAdvanceMeter: row.week_advance_meter,
    weekPlanRing: row.week_plan_ring,
    weekRingCount: row.week_ring_count,

    monthAdvanceMeter: row.month_advance_meter,
    monthPlanRing: row.month_plan_ring,
    monthRingCount: row.month_ring_count,

    refreshedAt: row.refreshed_at,
  };
}
