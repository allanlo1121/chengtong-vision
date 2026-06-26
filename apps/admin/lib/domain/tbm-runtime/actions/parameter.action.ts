"use server";

import { z } from "zod";
import {
  CreateTbmRuntimeParameterInput,
  CreateTbmRuntimeParameterSchema,
  UpdateTbmRuntimeParameterInput,
  UpdateTbmRuntimeParameterSchema,
} from "../schemas";
import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { createTbmRuntimeParameter, updateTbmRuntimeParameter } from "../services";
import { TbmRuntimeParameter } from "../types";

export async function createTbmRuntimeParameterAction(
  data: CreateTbmRuntimeParameterInput
): Promise<ActionResult<TbmRuntimeParameter>> {
  console.log("===createTbmRuntimeParameterAction===", data);

  const parsed = CreateTbmRuntimeParameterSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTbmRuntimeParameter(data);

    return {
      success: true,
      data: result,
      message: "创建运行时参数成功",
    };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateTbmRuntimeParameterAction(
  data: UpdateTbmRuntimeParameterInput
): Promise<ActionResult<TbmRuntimeParameter>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update tbm formData", data);

  const parsed = UpdateTbmRuntimeParameterSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  try {
    const result = await updateTbmRuntimeParameter(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error) {
    console.error("Error updating parameter:", error);
    return toActionError(error);
  }
}
