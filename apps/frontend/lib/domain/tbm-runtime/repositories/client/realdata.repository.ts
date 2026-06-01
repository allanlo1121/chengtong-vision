import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import {
  RealdataHistoryByRingRows,
  RealdataHistoryByTimeRows,
  TbmWorkTimelineRows,
} from "../../types";
import { RuntimeWorkMode } from "@/app/workspace/tunnels/[id]/_components/RuntimeQueryToolbar";

export async function getRealdataHistoryByTime(params: {
  tunnelId: string;
  from: string;
  to: string;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RealdataHistoryByTimeRows> {
  const supabase = createClient();

  console.log("getRealdataHistory params", params);

  const { data, error } = await supabase
    .schema("eqp")
    .rpc("fn_get_tunnel_tbm_param_history_by_time", {
      p_tunnel_id: params.tunnelId,
      p_from: params.from,
      p_to: params.to,
      p_fields: params.fields,
      p_work_mode: params.workMode,
    });

  assertNoError(error);

  return data as RealdataHistoryByTimeRows;
}

export async function getRealdataHistoryByRing(params: {
  tunnelId: string;
  from: number;
  to: number;
  fields: string[];
  workMode?: RuntimeWorkMode;
}): Promise<RealdataHistoryByRingRows> {
  const supabase = createClient();

  console.log("getRealdataHistoryByRing params", params);

  const { data, error } = await supabase
    .schema("eqp")
    .rpc("fn_get_tunnel_tbm_param_history_by_ring", {
      p_tunnel_id: params.tunnelId,
      p_from_ring: params.from,
      p_to_ring: params.to,
      p_fields: params.fields,
      p_work_mode: params.workMode,
    });

  assertNoError(error);

  console.log("getRealdataHistoryByRing result", { data, error });

  return data as RealdataHistoryByRingRows;
}

export async function getTunnelWorkTimeline(params: {
  tunnelId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<TbmWorkTimelineRows> {
  const supabase = createClient();

  console.log("getTunnelWorkTimeline params", params);

  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tunnel_work_timeline", {
    p_tunnel_id: params.tunnelId,
    p_start_at: params.startAt,
    p_end_at: params.endAt,
    p_offline_gap_minutes: params.offlineGapMinutes ?? 5,
  });

  assertNoError(error);

  console.log("getTunnelWorkTimeline result", { data, error });

  return (data ?? []) as TbmWorkTimelineRows;
}
