"use server";

import { z } from "zod";
import {
  UpdateEmployeeAssignmentInput,
  UpdateEmployeeAssignmentSchema,
  UpdateEmployeeInput,
  UpdateEmployeeSchema,
} from "../schemas";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { updateEmployee, updateEmployeeAssignment } from "../services";
import { Employee, EmployeeAssignment } from "../types";

// export type EmployeeFormState = ActionState<EmployeeFields>;

export async function updateEmployeeAction(
  data: UpdateEmployeeInput
): Promise<ActionResult<Employee>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update employee formData", data);

  const parsed = UpdateEmployeeSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  try {
    const result = await updateEmployee(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}

export async function updateEmployeeAssignmentAction(
  data: UpdateEmployeeAssignmentInput
): Promise<ActionResult<EmployeeAssignment>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update employee assignment formData", data);

  const parsed = UpdateEmployeeAssignmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  try {
    const result = await updateEmployeeAssignment(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
