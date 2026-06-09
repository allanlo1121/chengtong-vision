import { PaginatedResult } from "@/lib/shared/contracts";

import { EmployeePickerItem, EmployeePickerQuery } from "../types";

import { getPickerItemById, searchEmployeePicker } from "../repositories/client";
import { mapEmployeePicker } from "../mappers";

export async function listPicker(
  query: EmployeePickerQuery
): Promise<PaginatedResult<EmployeePickerItem>> {
  return await searchEmployeePicker(query);
}

export async function getEmployeePickerItemById(id: string): Promise<EmployeePickerItem | null> {
  try {
    const data = await getPickerItemById(id);

    if (data) {
      return mapEmployeePicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching employee picker item by ID:", error);
    return null;
  }
}
