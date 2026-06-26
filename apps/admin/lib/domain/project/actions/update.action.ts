"use server";

import { z } from "zod";
import { UpdateProjectInput, UpdateProjectSchema } from "../schemas";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { updateProject } from "../services";

export async function updateProjectAction(data: UpdateProjectInput): Promise<ActionResult<any>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update Project formData", data);

  const parsed = UpdateProjectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateProject(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
