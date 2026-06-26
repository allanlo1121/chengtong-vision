import { Database } from "@/lib/core/database/types";

export interface RuntimeQueryLimits {
  minTime?: string;
  maxTime?: string;
  minRing?: number | null;
  maxRing?: number | null;
}

export type RealdataLimitsRows =
  Database["eqp"]["Functions"]["fn_get_tbm_realdata_limits"]["Returns"];
export type RealdataHistoryByTimeRows =
  Database["eqp"]["Functions"]["fn_get_tbm_param_history_by_time"]["Returns"];
export type RealdataHistoryByRingRows =
  Database["eqp"]["Functions"]["fn_get_tbm_param_history_by_ring"]["Returns"];
export type RealdataLimitsRow = RealdataLimitsRows[number];

export type TbmWorkTimelineRows =
  Database["eqp"]["Functions"]["fn_get_tbm_work_timeline"]["Returns"];

export type TbmWorkTimelineRow = TbmWorkTimelineRows[number];

export type WorkPhaseType = "advance" | "assembly" | "stop" | "offline";
