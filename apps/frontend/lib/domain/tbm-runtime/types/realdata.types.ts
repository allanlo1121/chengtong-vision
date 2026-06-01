import { Database } from "@/lib/core/database/types";

export interface RuntimeQueryLimits {
  minTime?: string;
  maxTime?: string;
  minRing?: number | null;
  maxRing?: number | null;
}

export type RealdataLimitsRows =
  Database["eqp"]["Functions"]["fn_get_tunnel_realdata_limits"]["Returns"];
export type RealdataHistoryByTimeRows =
  Database["eqp"]["Functions"]["fn_get_tunnel_tbm_param_history_by_time"]["Returns"];
export type RealdataHistoryByRingRows =
  Database["eqp"]["Functions"]["fn_get_tunnel_tbm_param_history_by_ring"]["Returns"];
export type RealdataLimitsRow = RealdataLimitsRows[number];

export type TbmWorkTimelineRows =
  Database["eqp"]["Functions"]["fn_get_tunnel_work_timeline"]["Returns"];

export type TbmWorkTimelineRow = TbmWorkTimelineRows[number];

export interface RuntimeSeriesValue {
  ts: string;
  ring: number | null;
  values: Record<string, number | null>;
}

export type WorkPhaseType = "advance" | "assembly" | "stop" | "offline";

export interface WorkPhaseSegment {
  id: string;
  type: WorkPhaseType;
  start: string;
  end: string;
}

export interface RingSegment {
  id: string | number;
  ringNo: number | string;
  start: string | Date;
  end: string | Date;
}

interface RealdataRow {
  recorded_at: string;
  b00000001: number | boolean | null;
  b00000002: number | boolean | null;
}

export type PhaseDuration = {
  phase: WorkPhaseType;
  seconds: number;
};
