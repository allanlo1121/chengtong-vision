"use server";

import { z } from "zod";

import { TbmAssignment } from "../types";
import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { createTbmAssignment } from "../services";
import { CreateTbmAssignmentInput, CreateTbmAssignmentSchema } from "../schemas";

export async function createTbmAssignmentAction(
  data: CreateTbmAssignmentInput
): Promise<ActionResult<TbmAssignment>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create TBM assignment formData", data);

  const parsed = CreateTbmAssignmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTbmAssignment(data);

    return {
      success: true,
      data: result,
      message: "创建TBM分配成功",
    };
  } catch (error) {
    console.error("Error creating TBM assignment:", error);
    return toActionError(error);
  }
}
