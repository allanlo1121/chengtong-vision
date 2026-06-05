"use server";

import { z } from "zod";
import { OrganizationFields, UpdateOrganizationInput, UpdateOrganizationSchema } from "../schemas";
import { ActionState } from "@/lib/shared/actions/types";
import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { updateOrganization } from "../services";

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
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateOrganization(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
