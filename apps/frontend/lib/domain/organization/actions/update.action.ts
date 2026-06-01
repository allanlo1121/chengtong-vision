"use server";

import { z } from "zod";
import { OrganizationFields, UpdateOrganizationInput, UpdateOrganizationSchema } from "../schemas";
import { ActionState } from "@/lib/shared/actions/types";
import { ActionResult } from "@/lib/shared/contracts/action-result";
import { updateOrganization } from "../services/update.service";

export type OrganizationFormState = ActionState<OrganizationFields>;

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
