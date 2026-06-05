import { PaginatedResult } from "@/lib/shared/contracts";

import { EmployeeListItem } from "../types";
import { employeeRepository } from "../repositories";
import { EmployeeQueryType } from "../queries";

export async function listEmployees(
  query: EmployeeQueryType
): Promise<PaginatedResult<EmployeeListItem>> {
  return await employeeRepository.paginate(query);
}
