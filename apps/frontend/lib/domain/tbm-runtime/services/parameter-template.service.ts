import { PaginatedResult, appErrors } from "@/lib/shared/contracts";

import { ParameterTemplateQueryType } from "../queries";

import {
  TbmParameterTemplate,
  TbmRuntimeParameterListItem,
  ParameterTemplateGroup,
  TemplateOption,
} from "../types";
import { CreateTbmParameterTemplateInput, UpdateTbmParameterTemplateInput } from "../schemas";
import {
  findParametersByTemplateId,
  searchTbmParameterTemplates,
  tptRepository,
} from "../repositories";
import { ParameterTemplateNode } from "../types/parameter-template.types";

export async function createTbmParameterTemplate(
  input: CreateTbmParameterTemplateInput
): Promise<TbmParameterTemplate> {
  return await tptRepository.insert(input);
}

export async function updateTbmParameterTemplate(
  input: UpdateTbmParameterTemplateInput
): Promise<TbmParameterTemplate> {
  return await tptRepository.update(input);
}

export async function getTbmParameterTemplateById(id: number): Promise<TbmParameterTemplate> {
  const data = await tptRepository.findById(id);
  if (!data) {
    throw appErrors.notFound("未查询到参数模板");
  }
  return data;
}

export async function listTbmParameterTemplates(): Promise<ParameterTemplateNode[]> {
  return await searchTbmParameterTemplates();
}

export async function findTbmRuntimeParametersByTemplateId(
  query: ParameterTemplateQueryType
): Promise<PaginatedResult<TbmRuntimeParameterListItem>> {
  return await findParametersByTemplateId(query);
}

export async function addParametersToTemplate(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<number> {
  return await tptRepository.addParametersToTemplate(input);
}

export async function replaceTemplateParametersBySubsystem(input: {
  templateId: number;
  subsystemId: number;
  parameterIds: number[];
}): Promise<number> {
  return await tptRepository.replaceTemplateParameters(input);
}

export async function getParameterTemplateGroups(
  templateId: number
): Promise<ParameterTemplateGroup[]> {
  return await tptRepository.findParameterTemplateGroups(templateId);
}

export async function replaceTemplateParameters(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<number> {
  return await tptRepository.replaceTemplateParameters(input);
}

export async function findParameterTemplateOptions(): Promise<TemplateOption[]> {
  return await tptRepository.findParameterTemplateOptions();
}
