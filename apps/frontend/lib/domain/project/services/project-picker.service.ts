import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { ProjectPickerItem, ProjectPickerQuery } from "../types";

import { searchProjectPicker } from "../repositories/picker.repository";
import { mapProjectPicker } from "../mappers/picker.mapper";

export async function listProjectPicker(
  query: ProjectPickerQuery
): Promise<Result<PaginatedResult<ProjectPickerItem>>> {
  try {
    const data = await searchProjectPicker(query);

    console.log("project picker list data:", data);

    return {
      success: true,
      data: {
        items: data.data.map(mapProjectPicker),
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
