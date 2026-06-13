import { PaginatedResult, appErrors } from "@/lib/shared/contracts";

import {
  TbmParameterConfig,
  TbmParameterConfigInsertRow,
  TbmParameterConfigListItem,
  ParameterGroup,
} from "../types";
import {
  CreateTbmParameterConfigInput,
  UpdateTbmParameterConfigInput,
  ImportTbmParameterConfigInput,
} from "../schemas";
import { buildParameterGroups } from "../mappers";
import { tbmParameterConfigRepository, trpRepository } from "../repositories";
import { TbmParameterConfigQueryType } from "../queries";

export async function createTbmParameterConfig(
  input: CreateTbmParameterConfigInput
): Promise<TbmParameterConfig> {
  return await tbmParameterConfigRepository.insert(input);
}

export async function updateTbmParameterConfig(
  input: UpdateTbmParameterConfigInput
): Promise<TbmParameterConfig> {
  return await tbmParameterConfigRepository.update(input);
}

export async function deleteTbmParameterConfig(id: number): Promise<void> {
  await tbmParameterConfigRepository.deleteById(id);
}

export async function getTbmParameterConfigById(id: number): Promise<TbmParameterConfig> {
  const data = await tbmParameterConfigRepository.findById(id);
  if (!data) {
    throw appErrors.notFound("未找到TBM参数绑定");
  }
  return data;
}

// export async function getTbmParameterBindingGroups(
//   tbmId: string
// ): Promise<TbmParameterBindingGroup[]> {
//   return await tbmParameterConfigRepository.findParameterBindingGroups(tbmId);
// }

// export async function replaceTbmBindingParameters(input: {
//   tbmId: string;
//   parameterIds: number[];
// }): Promise<{ count: number }> {
//   const bindingCount = await tbmParameterConfigRepository.replaceBindingParameters(input);

//   await tbmParameterConfigRepository.syncTbmRealdataTable(input.tbmId);

//   return {
//     count: bindingCount,
//   };
// }

export async function findTbmBoundParameterGroups(tbmId: string): Promise<ParameterGroup[]> {
  const data = await tbmParameterConfigRepository.getTbmParameterConfigs(tbmId);

  console.log("findTbmBoundParameterGroups data", data);

  return buildParameterGroups(data);
}

export async function importTbmParameterConfigs(
  tbmId: string,
  rows: ImportTbmParameterConfigInput[]
) {
  const configs: TbmParameterConfigInsertRow[] = rows.map((row) => ({
    tbm_id: tbmId,
    parameter_id: row.parameterId!,
    plc_tag_id: row.plcTagId ?? undefined,
    scale: row.scale ?? 1,
    value_offset: row.valueOffset ?? 0,
    custom_name: row.customName ?? undefined,
    custom_unit: row.customUnit ?? undefined,
    is_disabled: row.isDisabled ?? false,
  }));

  await tbmParameterConfigRepository.deleteByTbmId(tbmId);

  return tbmParameterConfigRepository.insertMany(configs);
}

export async function listTbmParameterConfigsByTbmId(
  tbmId: string,
  query: TbmParameterConfigQueryType
): Promise<PaginatedResult<TbmParameterConfigListItem>> {
  return tbmParameterConfigRepository.paginateByTbmId(tbmId, query);
}

export async function syncTbmRealdataTable(tbmId: string): Promise<void> {
  await tbmParameterConfigRepository.syncTbmRealdataTable(tbmId);
}
