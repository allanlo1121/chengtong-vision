import { PaginatedResult, appErrors } from "@/lib/shared/contracts";

import { ParameterQueryType } from "../queries";
import { trpRepository } from "../repositories/parameter.repository";
import { TbmRuntimeParameter, TbmRuntimeParameterListItem } from "../types";
import { CreateTbmRuntimeParameterInput, UpdateTbmRuntimeParameterInput } from "../schemas";

export async function findTbmRuntimeParameters(
  query: ParameterQueryType
): Promise<PaginatedResult<TbmRuntimeParameterListItem>> {
  return await trpRepository.paginate(query);
}

export async function createTbmRuntimeParameter(
  input: CreateTbmRuntimeParameterInput
): Promise<TbmRuntimeParameter> {
  const exits = await trpRepository.findByCode(input.code);

  if (exits) {
    throw appErrors.conflict("参数编码已存在");
  }

  return await trpRepository.insert(input);
}

export async function updateTbmRuntimeParameter(
  input: UpdateTbmRuntimeParameterInput
): Promise<TbmRuntimeParameter> {
  const exits = await trpRepository.findByCode(input.code);

  if (!exits) {
    throw appErrors.notFound("参数编码不存在");
  }

  return await trpRepository.update(input);
}

export async function getTbmRuntimeParameterById(id: number): Promise<TbmRuntimeParameter> {
  const data = await trpRepository.findById(id);
  if (!data) {
    throw appErrors.notFound("未找到运行时参数");
  }
  return data;
}
