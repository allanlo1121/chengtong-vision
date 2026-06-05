import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import {
  RealdataHistoryByRingRows,
  RealdataHistoryByTimeRows,
  RuntimeSeriesValue,
  TbmWorkTimelineRows,
  WorkPhaseSegment,
  RuntimeWorkMode,
} from "../../types";

import { mapRuntimeSeriesPointHistory, mapWorkPhaseSegments } from "../../mappers";

export async function getRealdataHistoryByTime(params: {
  tbmId: string;
  from: string;
  to: string;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const supabase = createClient();

  console.log("getRealdataHistory params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_param_history_by_time", {
    p_tbm_id: params.tbmId,
    p_from: params.from,
    p_to: params.to,
    p_fields: params.fields,
    p_work_mode: params.workMode,
  });

  assertNoError(error);

  console.log("getRealdataHistoryByTime result", { data, error });

  return mapRuntimeSeriesPointHistory(data);
}

export async function getRealdataHistoryByRing(params: {
  tbmId: string;
  from: number;
  to: number;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const supabase = createClient();

  console.log("getRealdataHistoryByRing params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_param_history_by_ring", {
    p_tbm_id: params.tbmId,
    p_from_ring: params.from,
    p_to_ring: params.to,
    p_fields: params.fields,
    p_work_mode: params.workMode,
  });

  assertNoError(error);

  console.log("getRealdataHistoryByRing result", { data, error });

  return mapRuntimeSeriesPointHistory(data);
}

export async function getTbmWorkTimeline(params: {
  tbmId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<WorkPhaseSegment[]> {
  const supabase = createClient();

  console.log("getTbmWorkTimeline params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_work_timeline", {
    p_tbm_id: params.tbmId,
    p_start_at: params.startAt,
    p_end_at: params.endAt,
    p_offline_gap_minutes: params.offlineGapMinutes ?? 5,
  });

  assertNoError(error);

  console.log("getTbmWorkTimeline result", { data, error });

  return mapWorkPhaseSegments(data ?? []);
}
