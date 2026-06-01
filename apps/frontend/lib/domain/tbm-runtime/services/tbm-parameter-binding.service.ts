import {
  PaginatedResult,
  ServiceResult,
  AppError,
  ERROR_CODES,
  ERROR_TYPES,
  appErrors,
} from "@/lib/shared/contracts";

import {
  mapParameterBindingRowToParameterBinding,
  mapParameterBindingInputToInsertRow,
  buildParameterGroups,
} from "../mappers";

import { ParameterBindingQueryType } from "../queries";

import { ParameterGroup, TbmParameterBinding, TbmParameterBindingGroup } from "../types";
import { CreateTbmParameterBindingFormInput, UpdateTbmParameterBindingFormInput } from "../schemas";
import { tpbRepository } from "../repositories";
// import { ParameterBindingNode } from "../types/parameter-Binding.types";

export async function createTbmParameterBinding(
  input: CreateTbmParameterBindingFormInput
): Promise<TbmParameterBinding> {
  const insert = mapParameterBindingInputToInsertRow(input);
  const data = await tpbRepository.insert(insert);
  if (!data) {
    throw appErrors.internal("创建参数模板失败：数据库未返回数据");
  }

  return mapParameterBindingRowToParameterBinding(data);
}

export async function updateTbmParameterBinding(
  id: string,
  input: UpdateTbmParameterBindingFormInput
): Promise<TbmParameterBinding> {
  const update = mapParameterBindingInputToInsertRow(input);
  const data = await tpbRepository.update(Number(id), update);
  if (!data) {
    throw appErrors.internal("更新参数模板失败：数据库未返回数据");
  }
  return mapParameterBindingRowToParameterBinding(data);
}

export async function getTbmParameterBindingById(id: string): Promise<TbmParameterBinding> {
  const data = await tpbRepository.findById(Number(id));
  if (!data) {
    throw appErrors.notFound("未找到TBM参数绑定");
  }
  return mapParameterBindingRowToParameterBinding(data);
}

export async function getTbmParameterBindingGroups(
  tbmId: string
): Promise<ServiceResult<TbmParameterBindingGroup[]>> {
  try {
    const data = await tpbRepository.findParameterBindingGroups(tbmId);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "加载模板参数失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function replaceTbmBindingParameters(input: {
  tbmId: string;
  parameterIds: number[];
}): Promise<ServiceResult<{ count: number }>> {
  try {
    if (!input.tbmId) {
      return {
        success: false,
        message: "缺少Tbm ID",
        errorCode: ERROR_CODES.REQUIRED_FIELD_MISSING,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          tbmId: ["请选择Tbm"],
        },
      };
    }

    if (input.parameterIds.length === 0) {
      return {
        success: false,
        message: "请选择要添加的运行参数",
        errorCode: ERROR_CODES.VALIDATION_FAILED,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          parameterIds: ["请选择要添加的运行参数"],
        },
      };
    }

    await tpbRepository.replaceBindingParameters(input);

    const syncResult = await tpbRepository.syncTbmRealdataTable(input.tbmId);
    if (!syncResult.success) {
      return {
        success: false,
        message: syncResult.message,
        errorCode: ERROR_CODES.INTERNAL_ERROR,
        errorType: ERROR_TYPES.SYSTEM,
      };
    }

    return {
      success: true,
      data: {
        count: input.parameterIds.length,
      },
      message: "参数添加成功",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "参数添加失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function findTbmBoundParameterGroups(tbmId: string): Promise<ParameterGroup[]> {
  const data = await tpbRepository.getTbmBoundParameters(tbmId);

  return buildParameterGroups(data);
}
