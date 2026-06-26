import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { Employee, EmployeeDetail, EmployeeListItem } from "../types";
import { employeeRepository } from "../repositories";
import { EmployeeQueryType } from "../queries";

export async function listEmployees(
  query: EmployeeQueryType
): Promise<PaginatedResult<EmployeeListItem>> {
  return await employeeRepository.paginate(query);
}

export async function fetchEmployeeDetailById(id: string): Promise<EmployeeDetail> {
  const employee = await employeeRepository.findDetailById(id);
  if (!employee) {
    throw appErrors.notFound("Employee not found");
  }
  return employee;
}

export async function getEmployeeById(id: string): Promise<Employee> {
  console.log("===getEmployeeById===");

  const row = await employeeRepository.findById(id);

  if (!row) {
    throw appErrors.notFound("未查询到员工");
  }

  return row;
}
