"use server";

import { z } from "zod";
import {
  createTunnelDailyProgress,
  deleteTunnelDailyProgress,
  updateTunnelDailyProgress,
} from "../services";
import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import {
  CreateTunnelDailyProgressInput,
  CreateTunnelDailyProgressSchema,
  UpdateTunnelDailyProgressSchema,
  UpdateTunnelDailyProgressInput,
  TunnelDailyProgressForm,
} from "../schemas";

export type TunnelDailyProgressFormState = ActionResult<CreateTunnelDailyProgressInput>;

export async function createTunnelDailyProgressAction(
  data: CreateTunnelDailyProgressInput
): Promise<ActionResult<TunnelDailyProgressForm>> {
  console.log("===createTunnelDailyProgressAction===", data);

  const parsed = CreateTunnelDailyProgressSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTunnelDailyProgress(data);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    console.error("Error creating TunnelDailyProgress:", error);
    return toActionError(error);
  }
}

export async function updateTunnelDailyProgressAction(
  data: UpdateTunnelDailyProgressInput
): Promise<ActionResult<TunnelDailyProgressForm>> {
  console.log("===updateTunnelDailyProgressAction===", data);

  const parsed = UpdateTunnelDailyProgressSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateTunnelDailyProgress(data);
    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    console.error("Error updating TunnelDailyProgress:", error);
    return toActionError(error);
  }
}

export async function deleteTunnelDailyProgressAction(id: string): Promise<ActionResult<number>> {
  console.log("===deleteTunnelDailyProgressAction id===", id);
  try {
    const result = await deleteTunnelDailyProgress(id);
    return {
      success: true,
      data: 1,
      message: "删除成功",
    };
  } catch (error: unknown) {
    console.error("Error deleting TunnelDailyProgress:", error);
    return toActionError(error);
  }
}
