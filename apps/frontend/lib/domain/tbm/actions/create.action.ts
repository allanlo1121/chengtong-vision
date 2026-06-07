"use server";

import { z } from "zod";
import { createTbm } from "../services";
import { CreateTbmInput, CreateTbmSchema, TbmFields } from "../schemas";

import { Tbm } from "../types";
import { ActionResult, toActionError } from "@/lib/shared/contracts";

export async function createTbmAction(data: CreateTbmInput): Promise<ActionResult<Tbm>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create TBM formData", data);

  const parsed = CreateTbmSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  try {
    const result = await createTbm(parsed.data);

    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error) {
    console.error("Error creating TBM:", error);
    return toActionError(error);
  }
}
