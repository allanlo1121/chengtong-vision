import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import {
  getTunnelWorkspaceDetail,
  searchTunnelWorkspaceScopesByOrganizations,
  tunnelRepository,
} from "../repositories";
import { Tunnel, TunnelDetail, TunnelListItem } from "../types";
import { TunnelQueryType } from "../queries";
import { TunnelWorkspaceScope } from "@/providers/workspace/TunnelWorkspaceProvider";
import { expandOrganizationIds } from "../../organization/services";

export async function fetchTunnelById(id: string): Promise<Tunnel> {
  console.log("===fetchTunnelById===");

  const tunnel = await tunnelRepository.findById(id);

  if (!tunnel) {
    throw appErrors.notFound("未查询到隧道");
  }

  return tunnel;
}

export async function fetchTunnelDetailById(id: string): Promise<TunnelDetail> {
  console.log("===fetchTunnelDetailById===");
  const tunnelDetail = await tunnelRepository.getTunnelDetailById(id);

  if (!tunnelDetail) {
    throw appErrors.notFound("未查询到隧道详情");
  }

  return tunnelDetail;
}

export async function listTunnels(
  query: TunnelQueryType
): Promise<PaginatedResult<TunnelListItem>> {
  return await tunnelRepository.paginate(query);
}

export async function fetchTunnelWorkspaceDetail(tunnelId: string): Promise<TunnelWorkspaceScope> {
  const result = await getTunnelWorkspaceDetail(tunnelId);

  if (!result) {
    throw appErrors.notFound("未查询到隧道工作区详情");
  }

  return result;
}

export async function listTunnelWorkspaceScopesByOrganizations(
  organizationIds: string[]
): Promise<TunnelWorkspaceScope[]> {
  const tunnels = await searchTunnelWorkspaceScopesByOrganizations(organizationIds);

  return tunnels;
}

export async function listAccessibleTunnelScopes(
  organizationIds: string[]
): Promise<TunnelWorkspaceScope[]> {
  const expandedOrganizationIds = await expandOrganizationIds(organizationIds);

  return listTunnelWorkspaceScopesByOrganizations(expandedOrganizationIds);
}
