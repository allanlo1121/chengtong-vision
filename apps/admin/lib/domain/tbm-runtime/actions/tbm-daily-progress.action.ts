"use server";

import { z } from "zod";
import {
  createTbmDailyProgress,
  deleteTbmDailyProgress,
  updateTbmDailyProgress,
} from "../services";
import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import {
  CreateTbmDailyProgressInput,
  CreateTbmDailyProgressSchema,
  UpdateTbmDailyProgressSchema,
  UpdateTbmDailyProgressInput,
  TbmDailyProgressForm,
} from "../schemas";

export type TbmDailyProgressFormState = ActionResult<CreateTbmDailyProgressInput>;

export async function createTbmDailyProgressAction(
  data: CreateTbmDailyProgressInput
): Promise<ActionResult<TbmDailyProgressForm>> {
  console.log("===createTbmDailyProgressAction===", data);

  const parsed = CreateTbmDailyProgressSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTbmDailyProgress(data);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    console.error("Error creating TbmDailyProgress:", error);
    return toActionError(error);
  }
}

export async function updateTbmDailyProgressAction(
  data: UpdateTbmDailyProgressInput
): Promise<ActionResult<TbmDailyProgressForm>> {
  console.log("===updateTunnelDailyProgressAction===", data);

  const parsed = UpdateTbmDailyProgressSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateTbmDailyProgress(data);
    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    console.error("Error updating TbmDailyProgress:", error);
    return toActionError(error);
  }
}

export async function deleteTbmDailyProgressAction(id: string): Promise<ActionResult<number>> {
  console.log("===deleteTbmDailyProgressAction id===", id);
  try {
    const result = await deleteTbmDailyProgress(id);
    return {
      success: true,
      data: 1,
      message: "删除成功",
    };
  } catch (error: unknown) {
    console.error("Error deleting TbmDailyProgress:", error);
    return toActionError(error);
  }
}
