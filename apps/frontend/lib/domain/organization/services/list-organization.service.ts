import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { mapOrganizationList } from "../mappers";

import { OrganizationListItem } from "../types";
import { organizationRepository } from "../repositories";
import { OrganizationQueryType } from "../queries";

export async function listOrganizations(
  query: OrganizationQueryType
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
