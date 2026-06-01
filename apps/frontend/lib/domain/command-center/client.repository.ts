import { createClient } from "@/lib/infra/supabase/client";

import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { CommandCenterSummaryRow, CommandCenterTunnelRow } from "./types";

export async function getCommandCenterSummary(): Promise<CommandCenterSummaryRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase.from("v_command_center_summary").select("*").single();

  assertNoError(error);

  return data;
}

export async function getCommandCenterTunnel(): Promise<CommandCenterTunnelRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("v_command_center_tunnel")
    .select("*")
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return data;
}
