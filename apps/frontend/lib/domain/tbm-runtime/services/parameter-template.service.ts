import {
  PaginatedResult,
  ServiceResult,
  AppError,
  ERROR_CODES,
  ERROR_TYPES,
} from "@/lib/shared/contracts";

import {
  mapParameterTemplateRowToParameterTemplate,
  mapParameterTemplateInputToInsertRow,
  mapParameterTemplateNodeRowToNode,
  mapParameterListRowToParameterListItem,
} from "../mappers";

import { ParameterTemplateQueryType } from "../queries";

import {
  TbmParameterTemplate,
  TbmRuntimeParameterListItem,
  ParameterTemplateGroup,
  TemplateOption,
} from "../types";
import {
  CreateTbmParameterTemplateFormInput,
  UpdateTbmParameterTemplateFormInput,
} from "../schemas";
import {
  findParametersByTemplateId,
  searchTbmParameterTemplates,
  tptRepository,
} from "../repositories";
import { ParameterTemplateNode } from "../types/parameter-template.types";

export async function createTbmParameterTemplate(
  input: CreateTbmParameterTemplateFormInput
): Promise<ServiceResult<TbmParameterTemplate>> {
  try {
    const insert = mapParameterTemplateInputToInsertRow(input);
    const data = await tptRepository.insert(insert);
    if (!data) {
      return {
        success: false,
        message: "创建参数模板失败",
        errorCode: ERROR_CODES.INTERNAL_ERROR,
        errorType: ERROR_TYPES.SYSTEM,
      };
    }
    return {
      success: true,
      data: mapParameterTemplateRowToParameterTemplate(data),
      message: "创建参数模板成功",
    };
  } catch (error: unknown) {
    // AppError
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        errorCode: error.code,
        errorType: error.type,
      };
    }

    // 未知异常
    console.error("createTbmParameterTemplate error", error);

    return {
      success: false,
      message: "创建参数模板失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function updateTbmParameterTemplate(
  id: number,
  input: UpdateTbmParameterTemplateFormInput
): Promise<ServiceResult<TbmParameterTemplate>> {
  try {
    const update = mapParameterTemplateInputToInsertRow(input);
    const data = await tptRepository.update(id, update);
    if (!data) {
      return {
        success: false,
        message: "更新参数模板失败",
        errorCode: ERROR_CODES.INTERNAL_ERROR,
        errorType: ERROR_TYPES.SYSTEM,
      };
    }
    return {
      success: true,
      data: mapParameterTemplateRowToParameterTemplate(data),
      message: "更新参数模板成功",
    };
  } catch (error: unknown) {
    // AppError
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        errorCode: error.code,
        errorType: error.type,
      };
    }

    // 未知异常
    console.error("updateTbmParameterTemplate error", error);

    return {
      success: false,
      message: "更新参数模板失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function getTbmParameterTemplateById(
  id: number
): Promise<ServiceResult<TbmParameterTemplate>> {
  try {
    const data = await tptRepository.findById(id);
    if (!data) {
      return {
        success: false,
        message: "未找到TBM参数模板",
        errorCode: ERROR_CODES.NOT_FOUND,
        errorType: ERROR_TYPES.BUSINESS,
      };
    }
    return {
      success: true,
      data: mapParameterTemplateRowToParameterTemplate(data),
    };
  } catch (error: unknown) {
    // AppError
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        errorCode: error.code,
        errorType: error.type,
      };
    }

    // 未知异常
    console.error("getTbmParameterTemplateById error", error);

    return {
      success: false,
      message: "获取参数模板失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function listTbmParameterTemplates(): Promise<ServiceResult<ParameterTemplateNode[]>> {
  try {
    const data = await searchTbmParameterTemplates();
    return {
      success: true,
      data: data.map(mapParameterTemplateNodeRowToNode),
    };
  } catch (error: unknown) {
    // AppError
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        errorCode: error.code,
        errorType: error.type,
      };
    }

    // 未知异常
    console.error("listTbmParameterTemplates error", error);

    return {
      success: false,
      message: "查询参数模板列表失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function findTbmRuntimeParametersByTemplateId(
  query: ParameterTemplateQueryType
): Promise<ServiceResult<PaginatedResult<TbmRuntimeParameterListItem>>> {
  try {
    const data = await findParametersByTemplateId(query);

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
    // AppError
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        errorCode: error.code,
        errorType: error.type,
      };
    }

    // 未知异常
    console.error("findTbmRuntimeParametersByTemplateId error", error);

    return {
      success: false,
      message: "查询TBM运行时参数失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}

export async function addParametersToTemplate(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<ServiceResult<{ count: number }>> {
  try {
    if (!input.templateId) {
      return {
        success: false,
        message: "缺少参数模板ID",
        errorCode: ERROR_CODES.REQUIRED_FIELD_MISSING,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          templateId: ["请选择参数模板"],
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

    await tptRepository.addParametersToTemplate(input);

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

export async function replaceTemplateParametersBySubsystem(input: {
  templateId: number;
  subsystemId: number;
  parameterIds: number[];
}): Promise<ServiceResult<{ count: number }>> {
  try {
    if (!input.templateId) {
      return {
        success: false,
        message: "缺少参数模板ID",
        errorCode: ERROR_CODES.REQUIRED_FIELD_MISSING,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          templateId: ["请选择参数模板"],
        },
      };
    }

    if (!input.subsystemId) {
      return {
        success: false,
        message: "缺少子系统ID",
        errorCode: ERROR_CODES.REQUIRED_FIELD_MISSING,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          subsystemId: ["请选择子系统"],
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

    await tptRepository.addParametersToTemplate(input);

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

export async function getParameterTemplateGroups(
  templateId?: number
): Promise<ServiceResult<ParameterTemplateGroup[]>> {
  try {
    if (!templateId) {
      return {
        success: true,
        data: [],
        message: "请先选择参数模板",
      };
    }

    const data = await tptRepository.findParameterTemplateGroups(templateId);

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

export async function replaceTemplateParameters(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<ServiceResult<{ count: number }>> {
  try {
    if (!input.templateId) {
      return {
        success: false,
        message: "缺少参数模板ID",
        errorCode: ERROR_CODES.REQUIRED_FIELD_MISSING,
        errorType: ERROR_TYPES.VALIDATION,
        errors: {
          templateId: ["请选择参数模板"],
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

    await tptRepository.replaceTemplateParameters(input);

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

export async function findParameterTemplateOptions(): Promise<ServiceResult<TemplateOption[]>> {
  try {
    const data = await tptRepository.findParameterTemplateOptions();

    return {
      success: true,
      message: "查询参数模板选项成功",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "查询参数模板选项失败",
      errorCode: ERROR_CODES.INTERNAL_ERROR,
      errorType: ERROR_TYPES.SYSTEM,
    };
  }
}
