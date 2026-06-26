"use server";

import { z } from "zod";
import { createEmployeeWithAssignment } from "../services";
import { CreateEmployeeWithAssignmentSchema, CreateEmployeeWithAssignmentInput } from "../schemas";
import { ActionResult, toActionError } from "@/lib/shared/contracts";

import { Employee } from "../types";

export async function createEmployeeAction(
  data: CreateEmployeeWithAssignmentInput
): Promise<ActionResult<Employee>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create employee formData", data);

  const parsed = CreateEmployeeWithAssignmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createEmployeeWithAssignment(parsed.data);

    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error) {
    return toActionError(error);
  }
}
