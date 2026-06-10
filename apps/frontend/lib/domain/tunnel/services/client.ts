import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { Tunnel, TunnelPickerItem, TunnelPickerQuery } from "../types";

import { tunnelClientRepository } from "../repositories/client";

export async function listTunnelPicker(
  query: TunnelPickerQuery
): Promise<PaginatedResult<TunnelPickerItem>> {
  return await tunnelClientRepository.searchTunnelPicker(query);
}

export async function fetchTunnelPickerById(id: string): Promise<TunnelPickerItem | null> {
  return await tunnelClientRepository.getTunnelPickerById(id);
}

export async function fetchTunnelById(id: string): Promise<Tunnel> {
  const tunnel = await tunnelClientRepository.findById(id);

  if (!tunnel) {
    throw appErrors.notFound("未找到隧道");
  }

  return tunnel;
}
