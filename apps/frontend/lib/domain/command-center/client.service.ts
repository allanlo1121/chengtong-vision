import { getTbmRuntimeState, getTunnelRuntime } from "./client.repository";

import { TbmRuntimeState, TunnelRuntime } from "./types";

export async function fetchTunnelRuntime(): Promise<TunnelRuntime[]> {
  return await getTunnelRuntime();
}

export async function fetchTbmRuntimeState(): Promise<TbmRuntimeState[]> {
  return await getTbmRuntimeState();
}
