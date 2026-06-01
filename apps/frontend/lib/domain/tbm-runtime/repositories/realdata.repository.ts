import { createClient } from "@/lib/infra/supabase/server";
import { RealdataLimitsRow, TbmWorkTimelineRows } from "../types/realdata.types";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function getRealdataLimits(tunnelId: string): Promise<RealdataLimitsRow> {
  // Implementation for fetching realdata limits
  const supabase = await createClient();
  const { data, error } = await supabase.schema("eqp").rpc("fn_get_tunnel_realdata_limits", {
    p_tunnel_id: tunnelId,
  });
  assertNoError(error);

  return data?.[0] as RealdataLimitsRow;
}

export async function getTunnelWorkTimeline(params: {
  tunnelId: string;
  startAt: string;
  endAt: string;
  offlineGapMinutes?: number;
}): Promise<TbmWorkTimelineRows> {
  const supabase = await createClient();

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
