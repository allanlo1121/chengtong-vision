"use server";

import { z } from "zod";
import { createOrganization } from "../services";
import { CreateOrganizationInput, CreateOrganizationSchema } from "../schemas";
import { ActionState } from "@/modules/shared/types/action-state";

export type OrganizationFormState = ActionState<{
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

export async function createOrganizationAction(data: CreateOrganizationInput) {
  console.log("SERVER ACTION RUNNING");
  console.log("create organization formData", data);

  const parsed = CreateOrganizationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const result = await createOrganization(parsed.data);

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
