"use server";

import { z } from "zod";
import { UpdateTbmAssignmentInput, UpdateTbmAssignmentSchema } from "../schemas";
import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";

import { TbmAssignment } from "../types";
import { updateTbmAssignment } from "../services";

export async function updateTbmAssignmentAction(
  data: UpdateTbmAssignmentInput
): Promise<ActionResult<TbmAssignment>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update tbm assignment formData", data);

  const parsed = UpdateTbmAssignmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateTbmAssignment(parsed.data);

    if (!result) {
      return {
        success: false,
        message: "更新失败",
        errors: {
          form: ["更新失败"],
        },
      };
    }
    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error) {
    console.error("Error updating TBM assignment:", error);
    return toActionError(error);
  }
}
