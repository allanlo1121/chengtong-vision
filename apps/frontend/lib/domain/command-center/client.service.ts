import { mapCommandCenterSummaryRowToEntity, mapCommandCenterTunnelRowToEntity } from "./mapper";
import { getCommandCenterSummary, getCommandCenterTunnel } from "./client.repository";

import { CommandCenterSummary, TunnelRuntimeCardData } from "./types";
import { appErrors } from "@/lib/shared/contracts/error-codes";

export async function fetchCommandCenterSummary(): Promise<CommandCenterSummary> {
  const summary = await getCommandCenterSummary();

  if (!summary) {
    throw appErrors.notFound("Command Center summary not found or already deleted");
  }

  return mapCommandCenterSummaryRowToEntity(summary);
}

export async function fetchCommandCenterTunnel(): Promise<TunnelRuntimeCardData[]> {
  const result = await getCommandCenterTunnel();
  if (!result) {
    throw appErrors.notFound("Command Center tunnel overview not found or already deleted");
  }

  const tunnels = result.map((item) => mapCommandCenterTunnelRowToEntity(item));

  return tunnels;
}
