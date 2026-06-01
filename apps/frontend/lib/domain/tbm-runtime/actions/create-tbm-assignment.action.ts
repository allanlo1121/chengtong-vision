"use server";

import { z } from "zod";
import { createTbmAssignment } from "../services";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";

import {
  CreateTbmAssignmentFormInput,
  CreateTbmAssignmentFormSchema,
} from "../schemas/tbm-assignment.schema";
import { TbmAssignment } from "../types/tbm-assignment.types";

export type TbmAssignmentFormState = ActionResult<CreateTbmAssignmentFormInput>;

export async function createTbmAssignmentAction(
  data: CreateTbmAssignmentFormInput
): Promise<ActionResult<TbmAssignment>> {
  console.log("===createTbmAssignmentAction===", data);

  const parsed = CreateTbmAssignmentFormSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTbmAssignment(data);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    console.error("Error creating TBM:", error);
    return toActionError(error);
  }
}
