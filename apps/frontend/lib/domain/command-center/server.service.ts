import {
  getCommandCenterTunnel,
  getTunnelProgressByPeriod,
  getTunnelProgressOverview,
} from "./server.repository";

import { TunnelRuntime } from "./types";
import { appErrors } from "@/lib/shared/contracts/error-codes";
import { resolvePeriod } from "@/lib/shared/time/engine/resolvePeriod";
import { ReportQueryType } from "./queries";
import { getTunnelRuntime } from "./client.repository";

export async function fetchTunnelRuntime(): Promise<TunnelRuntime[]> {
  return await getTunnelRuntime();
}
