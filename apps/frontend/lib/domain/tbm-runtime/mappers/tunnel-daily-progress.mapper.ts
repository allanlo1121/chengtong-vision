import {
  TunnelDailyProgressView,
  TunnelDailyProgressRow,
  TunnelDailyProgressInsertRow,
  TunnelDailyProgressItem,
  TunnelDailyProgressUpdateRow,
} from "../types";

import {
  CreateTunnelDailyProgressInput,
  TunnelDailyProgressForm,
  UpdateTunnelDailyProgressInput,
} from "../schemas";

export function mapTunnelDailyProgressRowToEntity(
  row: TunnelDailyProgressRow
): TunnelDailyProgressForm {
  return {
    id: row.id,
    tunnelId: row.tunnel_id,
    tbmId: row.tbm_id,
    workDate: row.work_date,
    ringEnd: row.ring_end,
    chainageEnd: row.chainage_end,
    planRingCount: row.plan_ring_count,
  };
}

export function mapCreateTunnelDailyProgressInputToInsertRow(
  row: CreateTunnelDailyProgressInput
): TunnelDailyProgressInsertRow {
  return {
    tunnel_id: row.tunnelId,
    tbm_id: row.tbmId,
    work_date: row.workDate,
    ring_end: row.ringEnd,
    chainage_end: row.chainageEnd,
    plan_ring_count: row.planRingCount,
  };
}

export function mapUpdateTunnelDailyProgressInputToUpdateRow(
  row: UpdateTunnelDailyProgressInput
): TunnelDailyProgressUpdateRow {
  return {
    id: row.id,
    tunnel_id: row.tunnelId,
    tbm_id: row.tbmId,
    work_date: row.workDate,
    ring_end: row.ringEnd,
    chainage_end: row.chainageEnd,
    plan_ring_count: row.planRingCount,
  };
}

export function mapTunnelDailyProgressViewToItem(
  row: TunnelDailyProgressView
): TunnelDailyProgressItem {
  return {
    id: row.id!,
    tunnelId: row.tunnel_id!,
    tbmId: row.tbm_id,
    workDate: row.work_date!,
    ringStart: row.ring_start,
    ringEnd: row.ring_end,
    chainageStart: row.chainage_start,
    chainageEnd: row.chainage_end,
    planRingCount: row.plan_ring_count,
  };
}
