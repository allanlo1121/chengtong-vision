import { PaginatedResult, Result } from "@/modules/shared/contracts";

import { mapEmployeeList } from "../mappers";

import { EmployeeListItem } from "../types";
import { listEmployeesRepository } from "../repositories";
import { EmployeeQueryType } from "../queries";

export async function listEmployees(
  query: EmployeeQueryType
): Promise<Result<PaginatedResult<EmployeeListItem>>> {
  try {
    const data = await listEmployeesRepository(query);

    return {
      success: true,
      data: {
        ...data,
        items: data.items.map(mapEmployeeList),
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
