import { OrganizationListItem } from "../types/organization.types";
import { ActionResult, PageData, PaginatedResult } from "@/modules/shared/contracts";
import { OrganizationListQueryType } from "../schemas/query.schema";

import { organizationRepository } from "@/lib/infra/repositories";
import { mapErrorToActionResult } from "@/modules/shared/application/action-error-handler";
import { UpdateOrganizationInput } from "../schemas";
import { getOrganizationRowById } from "../repositories/organization.repository";
import { mapOrganizationRowToUpdateInput } from "../mapper/organization.mapper";

import { ServiceResult } from "@/modules/shared/types";

export async function batchDeleteOrganizations(ids: string[]): Promise<number> {
  if (!ids.length) {
    throw new Error("未选择任何组织");
  }

  return organizationRepository.softDeleteMany(ids);
}

export async function listOrganizations(
  query: OrganizationListQueryType
): Promise<ServiceResult<PaginatedResult<OrganizationListItem>>> {
  try {
    const data = await organizationRepository.paginate(query);
    return {
      success: true,
      data: {
        ...data,
        page: query.page,
        pageSize: query.pageSize,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}

export async function getOrganizationById(
  id: string
): Promise<ServiceResult<UpdateOrganizationInput>> {
  try {
    console.log("===getOrganizationById===");

    const row = await getOrganizationRowById(id);

    if (!row) return { success: false, message: "未查询到组织" };

    return {
      success: true,
      data: mapOrganizationRowToUpdateInput(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
