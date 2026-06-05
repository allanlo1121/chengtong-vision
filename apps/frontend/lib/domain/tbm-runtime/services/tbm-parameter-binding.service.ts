import {
  PaginatedResult,
  ServiceResult,
  AppError,
  ERROR_CODES,
  ERROR_TYPES,
  appErrors,
} from "@/lib/shared/contracts";

import { buildParameterGroups } from "../mappers";

import { ParameterBindingQueryType } from "../queries";

import { ParameterGroup, TbmParameterBinding, TbmParameterBindingGroup } from "../types";
import { CreateTbmParameterBindingInput, UpdateTbmParameterBindingInput } from "../schemas";
import { tpbRepository } from "../repositories";

export async function createTbmParameterBinding(
  input: CreateTbmParameterBindingInput
): Promise<TbmParameterBinding> {
  return await tpbRepository.insert(input);
}

export async function updateTbmParameterBinding(
  input: UpdateTbmParameterBindingInput
): Promise<TbmParameterBinding> {
  return await tpbRepository.update(input);
}

export async function getTbmParameterBindingById(id: number): Promise<TbmParameterBinding> {
  const data = await tpbRepository.findById(id);
  if (!data) {
    throw appErrors.notFound("未找到TBM参数绑定");
  }
  return data;
}

export async function getTbmParameterBindingGroups(
  tbmId: string
): Promise<TbmParameterBindingGroup[]> {
  return await tpbRepository.findParameterBindingGroups(tbmId);
}

export async function replaceTbmBindingParameters(input: {
  tbmId: string;
  parameterIds: number[];
}): Promise<{ count: number }> {
  const bindingCount = await tpbRepository.replaceBindingParameters(input);

  await tpbRepository.syncTbmRealdataTable(input.tbmId);

  return {
    count: bindingCount,
  };
}

export async function findTbmBoundParameterGroups(tbmId: string): Promise<ParameterGroup[]> {
  const data = await tpbRepository.getTbmBoundParameters(tbmId);

  return buildParameterGroups(data);
}
