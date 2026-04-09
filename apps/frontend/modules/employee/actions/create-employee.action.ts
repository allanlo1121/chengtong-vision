"use server";

import { z } from "zod";
import { createEmloyee } from "../services";
import { CreateEmployeeInput, CreateEmployeeSchema } from "../schemas";
import { ActionState } from "@/modules/shared/types/action-state";

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

export async function createEmployeeAction(data: CreateEmployeeInput) {
  console.log("SERVER ACTION RUNNING");
  console.log("create employee formData", data);

  const parsed = CreateEmployeeSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const result = await createEmployee(parsed.data);

  if (!result.success) {
    return {
      success: false,
      errors: {
        form: [result.message || "创建失败"],
      },
    };
  }

  return result;
}
