import { TbmAssignment, TbmAssignmentListItem } from "../types";
import { tbmAssignmentRepository } from "../repositories";
import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { TbmAssignmentQueryType } from "../queries";

export async function fetchTbmAssignmentByTunnelId(tunnelId: string): Promise<TbmAssignment> {
  const data = await tbmAssignmentRepository.findByTunnelId(tunnelId);
  if (!data) {
    throw appErrors.notFound("TBM assignment not found for tunnel ID: " + tunnelId);
  }
  return data;
}

export async function fetchTbmAssignmentByTbmId(tbmId: string): Promise<TbmAssignment> {
  const data = await tbmAssignmentRepository.findByTbmId(tbmId);
  if (!data) {
    throw appErrors.notFound("TBM assignment not found for TBM ID: " + tbmId);
  }
  return data;
}

export async function listTbmAssignments(
  query: TbmAssignmentQueryType
): Promise<PaginatedResult<TbmAssignmentListItem>> {
  return await tbmAssignmentRepository.paginate(query);
}
