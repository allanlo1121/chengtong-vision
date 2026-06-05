import {
  TbmDailyProgress,
  TbmDailyProgressListRow,
  TbmDailyProgressRow,
  TbmDailyProgressInsertRow,
  TbmDailyProgressUpdateRow,
  TbmDailyProgressListItem,
} from "../types";

import { CreateTbmDailyProgressInput, UpdateTbmDailyProgressInput } from "../schemas";

export function mapTbmDailyProgress(row: TbmDailyProgressRow): TbmDailyProgress {
  return {
    id: row.id,

    tbmId: row.tbm_id,
    workDate: row.work_date,
    ringEnd: row.ring_end,
    chainageEnd: row.chainage_end,
    planRingCount: row.plan_ring_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}

export function mapCreateTbmDailyProgressInsert(
  row: CreateTbmDailyProgressInput
): TbmDailyProgressInsertRow {
  return {
    tbm_id: row.tbmId!,
    work_date: row.workDate,
    ring_end: row.ringEnd,
    chainage_end: row.chainageEnd,
    plan_ring_count: row.planRingCount,
  };
}

export function mapUpdateTbmDailyProgressUpdate(
  row: UpdateTbmDailyProgressInput
): TbmDailyProgressUpdateRow {
  return {
    id: row.id,
    tbm_id: row.tbmId!,
    work_date: row.workDate,
    ring_end: row.ringEnd,
    chainage_end: row.chainageEnd,
    plan_ring_count: row.planRingCount,
  };
}

export function mapTbmDailyProgressListItem(
  row: TbmDailyProgressListRow
): TbmDailyProgressListItem {
  return {
    id: row.id!,
    tbmId: row.tbm_id,
    workDate: row.work_date!,
    ringStart: row.ring_start,
    ringEnd: row.ring_end,
    chainageStart: row.chainage_start,
    chainageEnd: row.chainage_end,
    planRingCount: row.plan_ring_count,
  };
}
