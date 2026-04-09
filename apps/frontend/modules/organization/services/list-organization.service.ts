import { PaginatedResult, Result } from "@/modules/shared/contracts";

import { mapOrganizationList } from "./mapper";

import { OrganizationListItem } from "../types";
import { listOrganizationsRepository } from "../repositories";
import { OrganizationQueryType } from "../queries";

export async function listOrganizations(
  query: OrganizationQueryType
): Promise<Result<PaginatedResult<OrganizationListItem>>> {
  try {
    const data = await listOrganizationsRepository(query);

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
