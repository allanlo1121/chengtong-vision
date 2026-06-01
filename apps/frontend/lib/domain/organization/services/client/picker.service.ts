import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { OrganizationPickerItem, OrganizationPickerQuery } from "../../types";

import {
  getPickerItemById,
  searchOrganizationPicker,
} from "../../repositories/client/picker.repository";
import { mapOrganizationPicker } from "../../mappers";

export async function listPicker(
  query: OrganizationPickerQuery
): Promise<Result<PaginatedResult<OrganizationPickerItem>>> {
  try {
    const data = await searchOrganizationPicker(query);

    console.log("organization picker list data:", data);

    return {
      success: true,
      data: {
        items: data.data.map(mapOrganizationPicker),
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

export async function getOrganizationPickerItemById(
  id: string
): Promise<OrganizationPickerItem | null> {
  try {
    const data = await getPickerItemById(id);

    if (data) {
      return mapOrganizationPicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching organization picker item by ID:", error);
    return null;
  }
}
