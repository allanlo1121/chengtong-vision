import { createClient } from "@/lib/infra/supabase/client";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { KpiCockpitGlobal, KpiTunnel, TbmRuntimeState, TunnelRuntime } from "./types";
import { mapKpiCockpitGlobal, mapKpiTunnel, mapTbmRuntimeState, mapTunnelRuntime } from "./mapper";
import { map } from "zod";

// export async function getCommandCenterSummary(): Promise<CommandCenterSummaryRow | null> {
//   const supabase = createClient();

//   const { data, error } = await supabase.from("v_command_center_summary").select("*").single();

//   assertNoError(error);

//   return data;
// }

// export async function getCommandCenterTunnel(): Promise<CommandCenterTunnelRow[]> {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from("v_command_center_tunnel")
//     .select("*")
//     .order("sort_order", { ascending: true });

//   assertNoError(error);

//   return data;
// }

export async function getTunnelRuntime(): Promise<TunnelRuntime[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("app")
    .from("v_tunnel_runtime")
    .select("*")
    .order("sort_order", { ascending: true });

  console.log("getTunnelRuntime - raw data:", data);
  console.log("getTunnelRuntime - error:", error);

  assertNoError(error);

  return (data ?? []).map(mapTunnelRuntime);
}

export async function getTbmRuntimeState(): Promise<TbmRuntimeState[]> {
  const supabase = createClient();

  const { data, error } = await supabase.schema("app").from("v_tbm_runtime_state").select("*");

  console.log("getTbmRuntimeState - raw data:", data);
  console.log("getTbmRuntimeState - error:", error);

  assertNoError(error);

  return (data ?? []).map(mapTbmRuntimeState);
}

export async function getKpiCockpitGlobal(): Promise<KpiCockpitGlobal> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("app")
    .from("v_kpi_cockpit_global")
    .select("*")
    .maybeSingle();

  assertNoError(error);

  if (!data) {
    throw new Error("v_kpi_cockpit_global returned empty result");
  }

  return mapKpiCockpitGlobal(data);
}

export async function getKpiTunnel(): Promise<KpiTunnel[]> {
  const supabase = createClient();

  const { data, error } = await supabase.schema("app").from("v_tunnel_kpi").select("*");

  console.log("getKpiTunnel - raw data:", data);
  console.log("getKpiTunnel - error:", error);

  assertNoError(error);

  return (data ?? []).map(mapKpiTunnel);
}
