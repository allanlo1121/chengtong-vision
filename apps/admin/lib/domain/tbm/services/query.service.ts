import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
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

export async function fetchTbmDetailById(id: string): Promise<TbmDetail> {
  const tbm = await tbmRepository.getTbmDetailById(id);

  if (!tbm) {
    throw appErrors.notFound("未查询到TBM详情");
  }
  return tbm;
}
