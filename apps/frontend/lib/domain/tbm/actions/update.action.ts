"use server";

import { z } from "zod";
import { UpdateTbmInput, UpdateTbmSchema } from "../schemas";
import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { updateTbm } from "../services";
import { Tbm } from "../types";

export async function updateTbmAction(data: UpdateTbmInput): Promise<ActionResult<Tbm>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update tbm formData", data);

  const parsed = UpdateTbmSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateTbm(parsed.data);

    if (!result) {
      return {
        success: false,
        message: "更新失败",
        errors: {
          form: ["更新失败"],
        },
      };
    }
    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error) {
    console.error("Error creating TBM:", error);
    return toActionError(error);
  }
}
