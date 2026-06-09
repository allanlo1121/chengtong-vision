"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import {
  createTbmParameterConfig,
  importTbmParameterConfigs,
  updateTbmParameterConfig,
  deleteTbmParameterConfig,
  syncTbmRealdataTable,
} from "../services";

import {
  CreateTbmParameterConfigInput,
  CreateTbmParameterConfigSchema,
  ImportTbmParameterConfigInput,
  ImportTbmParameterConfigRowSchema,
  UpdateTbmParameterConfigInput,
  UpdateTbmParameterConfigSchema,
} from "../schemas";
import { Tbm } from "../../tbm/types";
import { TbmParameterConfig } from "../types";

// export async function replaceTbmParametersAction(input: {
//   tbmId: string;
//   parameterIds: number[];
// }): Promise<ActionResult<{ count: number }>> {
//   console.log("===replaceTbmParametersAction===", input);

//   try {
//     const result = await replaceTbmConfigParameters(input);

//     return {
//       success: true,
//       data: result,
//       message: "替换参数成功",
//     };
//   } catch (error) {
//     console.error("Error replacing TBM parameters:", error);
//     return toActionError(error);
//   }
// }

export async function importTbmParameterConfigsAction(input: {
  tbmId: string;
  rows: ImportTbmParameterConfigInput[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===importTbmParameterConfigsAction===", input);
  try {
    const parsed = ImportTbmParameterConfigRowSchema.parse(input.rows);
    console.log("===parsed===", parsed);

    const count = await importTbmParameterConfigs(input.tbmId, input.rows);

    return {
      success: true,
      data: { count },
      message: "导入TBM参数配置成功",
    };
  } catch (error) {
    console.error("Error importing TBM parameter configurations:", error);
    return toActionError(error);
  }
}

export async function createTbmParameterConfigAction(
  input: CreateTbmParameterConfigInput
): Promise<ActionResult<TbmParameterConfig>> {
  console.log("===createTbmParameterConfigAction===", input);
  const parsed = CreateTbmParameterConfigSchema.parse(input);
  try {
    const result = await createTbmParameterConfig(parsed);

    return {
      success: true,
      data: result,
      message: "绑定参数成功",
    };
  } catch (error) {
    console.error("Error creating TBM parameter configuration:", error);
    return toActionError(error);
  }
}

export async function updateTbmParameterConfigAction(
  input: UpdateTbmParameterConfigInput
): Promise<ActionResult<TbmParameterConfig>> {
  console.log("===updateTbmParameterConfigAction===", input);
  const parsed = UpdateTbmParameterConfigSchema.parse(input);
  try {
    const result = await updateTbmParameterConfig(parsed);

    return {
      success: true,
      data: result,
      message: "更新参数成功",
    };
  } catch (error) {
    console.error("Error updating TBM parameter configuration:", error);
    return toActionError(error);
  }
}

export async function deleteTbmParameterConfigAction(id: number): Promise<ActionResult<null>> {
  console.log("===deleteTbmParameterConfigAction===", id);
  try {
    await deleteTbmParameterConfig(id);

    return {
      success: true,
      data: null,
      message: "删除参数绑定成功",
    };
  } catch (error) {
    console.error("Error deleting TBM parameter configuration:", error);
    return toActionError(error);
  }
}

export async function syncTbmRealdataTableAction(tbmId: string): Promise<ActionResult<null>> {
  console.log("===syncTbmRealdataTableAction===", tbmId);
  try {
    await syncTbmRealdataTable(tbmId);

    return {
      success: true,
      data: null,
      message: "生成实时数据表成功",
    };
  } catch (error) {
    console.error("Error generating real-time data table:", error);
    return toActionError(error);
  }
}
