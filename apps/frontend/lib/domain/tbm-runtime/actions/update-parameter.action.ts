"use server";

import { z } from "zod";
import { UpdateTbmRuntimeParameterFormInput, TbmRuntimeParameterFormSchema } from "../schemas";
import { ActionResult } from "@/lib/shared/contracts/action-result";
import { updateTbmRuntimeParameter } from "../services";
import { TbmRuntimeParameter } from "../types";

export async function updateTbmRuntimeParameterAction(
  data: UpdateTbmRuntimeParameterFormInput
): Promise<ActionResult<TbmRuntimeParameter>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update tbm formData", data);

  const parsed = TbmRuntimeParameterFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const { id } = parsed.data;
  if (!id) {
    return {
      success: false,
      message: "缺少参数ID",
      errors: {
        form: ["缺少参数ID"],
      },
    };
  }
  const result = await updateTbmRuntimeParameter(id, parsed.data);

  if (!result.success) {
    return {
      success: false,
      message: result.message || "更新失败",
      errors: {
        form: [result.message || "更新失败"],
      },
    };
  }

  return result;
}
