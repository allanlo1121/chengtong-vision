"use server";

import { z } from "zod";
import { EmployeeFields, UpdateEmployeeInput, UpdateEmployeeSchema } from "../schemas";
import { ActionState } from "@/lib/shared/actions/types";
import { ActionResult } from "@/lib/shared/contracts/action-result";
import { updateEmployee } from "../services";

// export type EmployeeFormState = ActionState<EmployeeFields>;

export async function updateEmployeeAction(data: UpdateEmployeeInput): Promise<ActionResult<any>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update employee formData", data);

  const parsed = UpdateEmployeeSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const { id } = parsed.data;
  const result = await updateEmployee(id, parsed.data);

  if (!result.success) {
    return {
      success: false,
      errors: {
        form: [result.message || "更新失败"],
      },
    };
  }

  return result;
}
