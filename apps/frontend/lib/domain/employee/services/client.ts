import { PaginatedResult } from "@/lib/shared/contracts";

import { EmployeePickerItem, EmployeePickerQuery } from "../types";

import { getPickerById, searchEmployeePicker } from "../repositories/client";
import { mapEmployeePicker } from "../mappers";

export async function listEmployeePicker(
  query: EmployeePickerQuery
): Promise<PaginatedResult<EmployeePickerItem>> {
  return await searchEmployeePicker(query);
}

export async function fetchEmployeePickerById(id: string): Promise<EmployeePickerItem | null> {
  return await getPickerById(id);
}
