import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { EmployeePickerItem, EmployeePickerQuery } from "../../types";

import {
  getPickerItemById,
  searchEmployeePicker,
} from "../../repositories/client/picker.repository";
import { mapEmployeePicker } from "../../mappers";

export async function listPicker(
  query: EmployeePickerQuery
): Promise<Result<PaginatedResult<EmployeePickerItem>>> {
  try {
    const data = await searchEmployeePicker(query);

    console.log("employee picker list data:", data);

    return {
      success: true,
      data: {
        items: data.data.map(mapEmployeePicker),
        total: data.count,
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 10,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
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
