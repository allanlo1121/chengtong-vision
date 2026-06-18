import { createClient } from "@/lib/infra/supabase/client";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { TbmRuntimeState, TunnelRuntime } from "./types";
import { mapTbmRuntimeState, mapTunnelRuntime } from "./mapper";

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
