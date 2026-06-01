"use server";

import { z } from "zod";
import { UpdateEmployeeInput, UpdateEmployeeSchema } from "../schemas";
import { ActionState } from "@/modules/shared/types/action-state";
import { ActionResult } from "@/modules/shared/contracts/action-result";
import { updateEmployee } from "../services";

export type EmployeeFormState = ActionState<{
  name?: string[];
  code?: string[];
  fullName?: string[];
  parentId?: string[];
  description?: string[];
  orgTypeId?: string[];
  businessId?: string[];
  regionId?: string[];
  countryCode?: string[];
  provinceCode?: string[];
  cityCode?: string[];
  districtCode?: string[];
  address?: string[];
  latitude?: string[];
  longitude?: string[];
  isActive?: string[];
}>;

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
