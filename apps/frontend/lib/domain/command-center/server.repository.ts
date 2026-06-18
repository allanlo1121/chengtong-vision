import { createClient } from "@/lib/infra/supabase/server";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  CommandCenterSummaryRow,
  CommandCenterTunnelRow,
  TunnelProgressOverviewRow,
  TunnelProgressReportItem,
} from "./types";
import { DateString } from "@/lib/utils/types/date.types";
import { mapTunnelProgressReport } from "./mapper";

export async function getCommandCenterSummary(): Promise<CommandCenterSummaryRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_command_center_summary").select("*").single();

  assertNoError(error);

  return data;
}

export async function getCommandCenterTunnel(): Promise<CommandCenterTunnelRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_command_center_tunnel")
    .select("*")
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return data;
}

export async function getTunnelProgressOverview(): Promise<TunnelProgressOverviewRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_tunnel_progress_overview")
    .select("*")
    .order("sort_order", { ascending: true });

  console.log("===getTunnelProgressOverview data===", data);

  assertNoError(error);

  return data;
}

export async function getTunnelProgressByPeriod(
  from: DateString,
  to: DateString
): Promise<TunnelProgressReportItem[]> {
  console.log("Querying tunnel progress by period with query:", { from, to });
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("public")
    .rpc("get_tunnel_progress_report", { p_from: from, p_to: to })
    .select("*");

  console.log("Query result for tunnel progress ", data, error);

  assertNoError(error);

  return mapTunnelProgressReport(data);
}
