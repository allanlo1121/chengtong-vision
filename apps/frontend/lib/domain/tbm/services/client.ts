import { appErrors, PaginatedResult, Result } from "@/lib/shared/contracts";

import { Tbm, TbmPickerItem, TbmPickerQuery } from "../types";

import { tbmClientRepository } from "../repositories/client";
import { mapTbmPicker } from "../mappers";

export async function listTbmPicker(
  query: TbmPickerQuery
): Promise<PaginatedResult<TbmPickerItem>> {
  return await tbmClientRepository.searchTbmPicker(query);
}

export async function getTbmPickerItemById(id: string): Promise<TbmPickerItem | null> {
  try {
    const data = await tbmClientRepository.getPickerItemById(id);

    if (data) {
      return mapTbmPicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching TBM picker item by ID:", error);
    return null;
  }
}

export async function fetchTbmById(id: string): Promise<Tbm> {
  const tbm = await tbmClientRepository.findById(id);

  if (!tbm) {
    throw appErrors.notFound("未查询到TBM");
  }

  return tbm;
}
