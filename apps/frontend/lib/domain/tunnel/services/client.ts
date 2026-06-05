import { appErrors, PaginatedResult, Result } from "@/lib/shared/contracts";

import { Tunnel, TunnelPickerItem, TunnelPickerQuery } from "../types";

import { tunnelClientRepository } from "../repositories/client";

import { mapTunnelPicker } from "../mappers/picker.mapper";

export async function listTunnelPicker(
  query: TunnelPickerQuery
): Promise<Result<PaginatedResult<TunnelPickerItem>>> {
  try {
    const data = await tunnelClientRepository.searchTunnelPicker(query);

    console.log("tunnel picker list data:", data);

    return {
      success: true,
      data: {
        items: data.data.map(mapTunnelPicker),
        total: data.count,
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 10,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}

export async function getTunnelPickerItemById(id: string): Promise<TunnelPickerItem | null> {
  try {
    const data = await tunnelClientRepository.getPickerItemById(id);

    if (data) {
      return mapTunnelPicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching TBM picker item by ID:", error);
    return null;
  }
}

export async function fetchTunnelById(id: string): Promise<Tunnel> {
  const tunnel = await tunnelClientRepository.findById(id);

  if (!tunnel) {
    throw appErrors.notFound("未找到隧道");
  }

  return tunnel;
}
