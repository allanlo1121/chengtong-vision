import { PaginatedResult, Result, ServiceResult } from "@/lib/shared/contracts";
import { mapTbmList } from "../mappers";

import { TbmListItem } from "../types";

import { TbmQueryType } from "../queries";

import { tbmRepository } from "../repositories";
import { mapTbm } from "../mappers";
import { Tbm } from "../types";

export async function getTbmById(id: string): Promise<Result<Tbm>> {
  try {
    console.log("===getTbmById===");

    const row = await tbmRepository.findById(id);

    if (!row) return { success: false, message: "未查询到TBM" };

    return {
      success: true,
      data: mapTbm(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}

export async function listTbms(query: TbmQueryType): Promise<Result<PaginatedResult<TbmListItem>>> {
  try {
    const data = await tbmRepository.paginate(query);

    console.log("Mapped TBM list data:", data);

    return {
      success: true,
      data: {
        ...data,
        items: data.items.map(mapTbmList),
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

import { TbmPickerItem, TbmPickerQuery } from "../types";

import { mapTbmPicker } from "../mappers";

export async function listTbmPicker(
  query: TbmPickerQuery
): Promise<ServiceResult<PaginatedResult<TbmPickerItem>>> {
  try {
    const data = await tbmRepository.searchTbmPicker(query);

    console.log("tbm picker list data:", data);

    return {
      success: true,
      message: "查询成功",
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
      errors: (error as any)?.errors,
      errorCode: (error as any)?.code,
      errorType: (error as any)?.type,
    };
  }
}

// export async function getTbmPickerItemById(id: string): Promise<TbmPickerItem | null> {
//     try {
//         const data = await tbmRepository.getPickerItemById(id);

//         if (data) {
//             return mapTbmPicker(data);
//         }

//         return null;
//     } catch (error: unknown) {
//         console.error("Error fetching TBM picker item by ID:", error);
//         return null;
//     }
// }
