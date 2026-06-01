"use server";

import { createTbmRuntimeParameter } from "../services";

import { ActionResult } from "@/lib/shared/contracts/action-result";

import { CreateTbmRuntimeParameterFormInput } from "../schemas";
import { TbmRuntimeParameter } from "../types";

export type TbmRuntimeParameterFormState = ActionResult<CreateTbmRuntimeParameterFormInput>;

export async function createTbmRuntimeParameterAction(
  data: CreateTbmRuntimeParameterFormInput
): Promise<ActionResult<TbmRuntimeParameter>> {
  console.log("===createTbmRuntimeParameterAction===", data);

  const result = await createTbmRuntimeParameter(data);

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: {
        form: [result.message || "创建失败"],
      },
    };
  }

  return result;
}
