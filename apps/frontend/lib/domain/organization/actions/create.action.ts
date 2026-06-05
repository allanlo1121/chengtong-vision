"use server";

import { z } from "zod";
import { createOrganization } from "../services";
import { CreateOrganizationInput, CreateOrganizationSchema } from "../schemas";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { Organization } from "../types";

// export type OrganizationFormState = ActionState<OrganizationFields>;

export async function createOrganizationAction(
  data: CreateOrganizationInput
): Promise<ActionResult<Organization>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create organization formData", data);

  const parsed = CreateOrganizationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createOrganization(parsed.data);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
