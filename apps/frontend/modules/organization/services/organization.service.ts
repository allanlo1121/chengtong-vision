import { ActionResult, PageData, PaginatedResult, Result } from "@/modules/shared/contracts";
import { OrganizationListQueryType } from "../schemas/query.schema";

import { organizationRepository } from "@/lib/infra/repositories";
import { mapErrorToActionResult } from "@/modules/shared/application/action-error-handler";
import { UpdateOrganizationInput } from "../schemas";
import {
  getOrganizationRowById,
  findOrganizationDetailById,
} from "../repositories/organization.repository";
import { mapOrganizationRowToUpdateInput } from "./mapper";

// import { ServiceResult } from "@/modules/shared/types";
import { OrganizationListItem, mapOrganizationList } from "./mapper";
import { map } from "zod";

// export async function batchDeleteOrganizations(ids: string[]): Promise<number> {
//   if (!ids.length) {
//     throw new Error("未选择任何组织");
//   }

//   return organizationRepository.softDeleteMany(ids);
// }

export async function listOrganizations(
  query: OrganizationListQueryType
): Promise<Result<PaginatedResult<OrganizationListItem>>> {
  try {
    const data = await organizationRepository.paginate(query);
    return {
      success: true,
      data: {
        ...data,
        items: data.items.map(mapOrganizationList),
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

export async function getOrganizationById(id: string): Promise<Result<UpdateOrganizationInput>> {
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

// export async function getOrganizationDetailById(id: string): Promise<Result<OrganizationDetail>> {
//   try {
//     console.log("===getOrganizationDetailById===");

//     const row = await findOrganizationDetailById(id);

//     if (!row) return { success: false, message: "未查询到组织" };

//     return {
//       success: true,
//       data: mapOrganizationDetail(row),
//     };
//   } catch (error: unknown) {
//     return {
//       success: false,
//       message: (error as Error)?.message ?? "查询失败",
//     };
//   }
// }
