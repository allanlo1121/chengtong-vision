import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { TbmPickerItem, TbmPickerQuery } from "../../types";

import { getPickerItemById, searchTbmPicker } from "../../repositories/client";
import { mapTbmPicker } from "../../mappers";

export async function listTbmPicker(
  query: TbmPickerQuery
): Promise<Result<PaginatedResult<TbmPickerItem>>> {
  try {
    const data = await searchTbmPicker(query);

    console.log("tbm picker list data:", data);

    return {
      success: true,
      data: {
        items: data.data.map(mapTbmPicker),
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

export async function getTbmPickerItemById(id: string): Promise<TbmPickerItem | null> {
  try {
    const data = await getPickerItemById(id);

    if (data) {
      return mapTbmPicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching TBM picker item by ID:", error);
    return null;
  }
}
