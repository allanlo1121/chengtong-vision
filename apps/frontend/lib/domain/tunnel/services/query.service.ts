import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { getTunnelWorkspaceDetail, tunnelRepository } from "../repositories";
import { Tunnel, TunnelListItem } from "../types";
import { TunnelQueryType } from "../queries";
import { mapTunnel, mapTunnelList } from "../mappers/mapper";
import { mapTunnelWorkspaceDetailRowToTunnelWorkspaceTunnel } from "../mappers/workspace.mapper";
import { TunnelWorkspaceTunnel } from "@/providers/workspace/TunnelWorkspaceProvider";

export async function getTunnelById(id: string): Promise<Tunnel> {
  console.log("===getTunnelById===");

  const row = await tunnelRepository.findById(id);

  if (!row) {
    throw appErrors.notFound("未查询到隧道");
  }

  return mapTunnel(row);
}

export async function listTunnels(
  query: TunnelQueryType
): Promise<PaginatedResult<TunnelListItem>> {
  const data = await tunnelRepository.paginate(query);

  console.log("Mapped Tunnel list data:", data);

  return {
    ...data,
    items: data.items.map(mapTunnelList),
    page: query.page,
    pageSize: query.pageSize,
  };
}

export async function fetchTunnelWorkspaceDetail(tunnelId: string): Promise<TunnelWorkspaceTunnel> {
  const row = await getTunnelWorkspaceDetail(tunnelId);

  if (!row) {
    throw appErrors.notFound("未查询到隧道工作区详情");
  }

  return mapTunnelWorkspaceDetailRowToTunnelWorkspaceTunnel(row);
}
