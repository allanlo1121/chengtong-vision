"use server";

import { z } from "zod";

import { ActionResult, toActionError } from "@/lib/shared/contracts";

import {
  CreateTbmParameterTemplateInput,
  CreateTbmParameterTemplateSchema,
  CreateTbmRuntimeParameterInput,
} from "../schemas";
import { TbmParameterTemplate } from "../types";
import { createTbmParameterTemplate } from "../services/";

export type TbmRuntimeParameterFormState = ActionResult<CreateTbmRuntimeParameterInput>;

export async function createTbmParameterTemplateAction(
  data: CreateTbmParameterTemplateInput
): Promise<ActionResult<TbmParameterTemplate>> {
  console.log("===createTbmParameterTemplateAction===", data);

  const parsed = CreateTbmParameterTemplateSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTbmParameterTemplate(data);

    return {
      success: true,
      data: result,
      message: "创建参数模板成功",
    };
  } catch (error) {
    return toActionError(error);
  }
}
