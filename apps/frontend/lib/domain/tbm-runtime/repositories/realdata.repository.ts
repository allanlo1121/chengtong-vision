import { createClient } from "@/lib/infra/supabase/server";
import {
  RuntimeQueryLimits,
  RuntimeSeriesValue,
  TbmWorkTimelineRows,
  RuntimeWorkMode,
} from "../types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { mapRuntimeQueryLimits, mapRuntimeSeriesPointHistory } from "../mappers/realdata.mapper";

export async function getRealdataLimits(tbmId: string): Promise<RuntimeQueryLimits | null> {
  // Implementation for fetching realdata limits
  const supabase = await createClient();
  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_realdata_limits", {
    p_tbm_id: tbmId,
  });
  assertNoError(error);

  return data?.[0] ? mapRuntimeQueryLimits(data?.[0]) : null;
}

export async function getTbmWorkTimeline(params: {
  tbmId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<TbmWorkTimelineRows> {
  const supabase = await createClient();

  console.log("getTbmWorkTimeline params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_work_timeline", {
    p_tbm_id: params.tbmId,
    p_start_at: params.startAt,
    p_end_at: params.endAt,
    p_offline_gap_minutes: params.offlineGapMinutes ?? 5,
  });

  assertNoError(error);

  console.log("getTbmWorkTimeline result", { data, error });

  return (data ?? []) as TbmWorkTimelineRows;
}

export async function getRealdataByTime(params: {
  tbmId: string;
  from: string;
  to: string;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const supabase = await createClient();

  console.log("getRealdataByTime params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tbm_param_history_by_time", {
    p_tbm_id: params.tbmId,
    p_from: params.from,
    p_to: params.to,
    p_fields: params.fields,
    p_work_mode: params.workMode,
  });

  assertNoError(error);

  return mapRuntimeSeriesPointHistory(data);
}

export async function getRealdataByRing(params: {
  tbmId: string;
  from: number;
  to: number;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RuntimeSeriesValue[]> {
  const supabase = await createClient();

  console.log("getRealdataByRing params", params);

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
