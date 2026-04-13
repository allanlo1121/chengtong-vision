"use server";

import { z } from "zod";
import { UpdateOrganizationInput, UpdateOrganizationSchema } from "../schemas";
import { ActionState } from "@/modules/shared/types/action-state";
import { ActionResult } from "@/modules/shared/contracts/action-result";
import { updateOrganization } from "../services/update-organizations.service";

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

export async function updateOrganizationAction(
  data: UpdateOrganizationInput
): Promise<ActionResult<any>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update organization formData", data);

  const parsed = UpdateOrganizationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const { id } = parsed.data;
  const result = await updateOrganization(id, parsed.data);

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
