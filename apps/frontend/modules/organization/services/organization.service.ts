import { OrganizationListItem } from "../types/organization.types";
import { ActionResult, PageData, PaginatedResult } from "@/modules/shared/contracts";
import { OrganizationListQueryType } from "../schemas/query.schema";

import { organizationRepository } from "@/lib/infra/repositories";
import { mapErrorToActionResult } from "@/modules/shared/application/action-error-handler";
import { UpdateOrganizationInput } from "../schemas";
import { getOrganizationRowById } from "../repositories/organization-client.repository";
import { mapOrganizationRowToUpdateInput } from "../mapper/organization.mapper";

// export async function listAllOrganizations(): Promise<ActionResult<OrganizationListItem[]>> {
//   try {
//     const data = await organizationRepository.paginate({ page: 1, pageSize: 1000 });

//     return { success: true, data };
//   } catch (e: any) {
//     return mapErrorToActionResult(e);
//   }
// }

// export async function listOrganizations(
//   query: OrganizationListQueryType
// ): Promise<ActionResult<PaginatedResult<OrganizationListItem>>> {
//   try {
//     const data = await getOrganizationPage(query);
//     return { success: true, data };
//   } catch (e: any) {
//     return mapErrorToActionResult(e);
//   }
// }

// export async function listOrganizations(
//   query: OrganizationListQueryType
// ): Promise<ActionResult<PaginatedResult<OrganizationListItem>>> {
//   console.log("org list query", query);
//   return organizationRepository.paginate(query);
// }

export async function batchDeleteOrganizations(ids: string[]): Promise<number> {
  if (!ids.length) {
    throw new Error("未选择任何组织");
  }

  return organizationRepository.softDeleteMany(ids);
}

export async function listOrganizations(
  query: OrganizationListQueryType
): Promise<ActionResult<PaginatedResult<OrganizationListItem>>> {
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
      error: (error as Error)?.message ?? "查询失败",
    };
  }
}

export async function getOrganizationById(
  id: string
): Promise<ActionResult<UpdateOrganizationInput>> {
  try {
    const row = await getOrganizationRowById(id);

    if (!row) return { success: false, error: "Organization not found" };

    return {
      success: true,
      data: mapOrganizationRowToUpdateInput(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error)?.message ?? "查询失败",
    };
  }
}
