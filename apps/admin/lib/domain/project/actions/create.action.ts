"use server";

import { z } from "zod";
import { CreateProjectInput, CreateProjectSchema } from "../schemas";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { createProject } from "../services";
import { Project } from "../types";

export async function createProjectAction(
  data: CreateProjectInput
): Promise<ActionResult<Project>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create Project formData", data);

  const parsed = CreateProjectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createProject(parsed.data);

    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
