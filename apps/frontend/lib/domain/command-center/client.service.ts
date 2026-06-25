import {
  getKpiCockpitGlobal,
  getKpiTunnel,
  getTbmRuntimeState,
  getTunnelRuntime,
} from "./client.repository";

import { KpiCockpitGlobal, KpiTunnel, TbmRuntimeState, TunnelRuntime } from "./types";

export async function fetchTunnelRuntime(): Promise<TunnelRuntime[]> {
  return await getTunnelRuntime();
}

export async function fetchTbmRuntimeState(): Promise<TbmRuntimeState[]> {
  return await getTbmRuntimeState();
}

export async function fetchKpiCockpitGlobal(): Promise<KpiCockpitGlobal> {
  return await getKpiCockpitGlobal();
}

export async function fetchKpiTunnel(): Promise<KpiTunnel[]> {
  // For now, we can reuse the getTunnelRuntime function since the underlying data is similar.
  // In the future, if the data source or structure changes, we can implement a separate repository function.
  return (await getKpiTunnel()) as unknown as KpiTunnel[];
}
