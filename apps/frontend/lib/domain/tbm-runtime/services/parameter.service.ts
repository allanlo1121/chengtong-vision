import {
  PaginatedResult,
  ServiceResult,
  AppError,
  ERROR_CODES,
  ERROR_TYPES,
} from "@/lib/shared/contracts";

import {
  mapParameterListRowToParameterListItem,
  mapParameterInputToParameterRow,
  mapParameterRowToTbmParameter,
} from "../mappers";

import { ParameterQueryType } from "../queries";
import { trpRepository } from "../repositories/parameter.repository";
import { TbmRuntimeParameter, TbmRuntimeParameterListItem } from "../types";
import { CreateTbmRuntimeParameterFormInput, UpdateTbmRuntimeParameterFormInput } from "../schemas";

export async function findTbmRuntimeParameters(
  query: ParameterQueryType
): Promise<ServiceResult<PaginatedResult<TbmRuntimeParameterListItem>>> {
  try {
    const data = await trpRepository.paginate(query);

    console.log("tbm runtime parameters list data:", data);

    return {
      success: true,
      data: {
        ...data,
        items: data.items.map(mapParameterListRowToParameterListItem),
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

export async function createTbmRuntimeParameter(
  input: CreateTbmRuntimeParameterFormInput
): Promise<ServiceResult<TbmRuntimeParameter>> {
  try {
    const insert = mapParameterInputToParameterRow(input);
    const data = await trpRepository.insert(insert);
    if (!data) {
      return {
        success: false,
        message: "创建失败",
      };
    }
    return {
      success: true,
      data: mapParameterRowToTbmParameter(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "创建失败",
    };
  }
}

export async function updateTbmRuntimeParameter(
  id: number,
  input: UpdateTbmRuntimeParameterFormInput
): Promise<ServiceResult<TbmRuntimeParameter>> {
  try {
    const update = mapParameterInputToParameterRow(input);
    const data = await trpRepository.update(id, update);
    if (!data) {
      return {
        success: false,
        message: "更新失败",
      };
    }
    return {
      success: true,
      data: mapParameterRowToTbmParameter(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "更新失败",
    };
  }
}

export async function getTbmRuntimeParameterById(
  id: number
): Promise<ServiceResult<TbmRuntimeParameter>> {
  try {
    const data = await trpRepository.findById(id);
    if (!data) {
      return {
        success: false,
        message: "未找到TBM运行参数",
      };
    }
    return {
      success: true,
      data: mapParameterRowToTbmParameter(data),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
