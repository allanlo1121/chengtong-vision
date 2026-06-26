import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { Tbm, TbmPickerItem, TbmPickerQuery } from "../types";

import { tbmClientRepository } from "../repositories/client";

export async function listTbmPicker(
  query: TbmPickerQuery
): Promise<PaginatedResult<TbmPickerItem>> {
  return await tbmClientRepository.searchTbmPicker(query);
}

export async function fetchTbmPickerById(id: string): Promise<TbmPickerItem | null> {
  return await tbmClientRepository.getTbmPickerById(id);
}

export async function fetchTbmById(id: string): Promise<Tbm> {
  const tbm = await tbmClientRepository.findById(id);

  if (!tbm) {
    throw appErrors.notFound("未查询到TBM");
  }

  return tbm;
}
