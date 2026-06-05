import { appErrors, PaginatedResult, ServiceResult } from "@/lib/shared/contracts";
import { Tbm, TbmDetail, TbmListItem } from "../types";
import { TbmQueryType } from "../queries";
import { tbmRepository } from "../repositories";

export async function fetchTbmById(id: string): Promise<Tbm> {
  const tbm = await tbmRepository.findById(id);

  if (!tbm) {
    throw appErrors.notFound("未查询到TBM");
  }
  return tbm;
}

export async function listTbms(query: TbmQueryType): Promise<PaginatedResult<TbmListItem>> {
  return await tbmRepository.paginate(query);
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

export async function getTbmDetailById(id: string): Promise<TbmDetail> {
  const tbm = await tbmRepository.getTbmDetailById(id);

  if (!tbm) {
    throw appErrors.notFound("未查询到TBM详情");
  }
  return tbm;
}
