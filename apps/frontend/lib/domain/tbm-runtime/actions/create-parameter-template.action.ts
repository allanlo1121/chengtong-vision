"use server";

import { createTbmRuntimeParameter } from "../services";

import { ActionResult } from "@/lib/shared/contracts/action-result";

import {
  CreateTbmParameterTemplateFormInput,
  CreateTbmRuntimeParameterFormInput,
} from "../schemas";
import { TbmParameterTemplate, TbmRuntimeParameter } from "../types";
import { createTbmParameterTemplate } from "../services/parameter-template.service";

export type TbmRuntimeParameterFormState = ActionResult<CreateTbmRuntimeParameterFormInput>;

export async function createTbmParameterTemplateAction(
  data: CreateTbmParameterTemplateFormInput
): Promise<ActionResult<TbmParameterTemplate>> {
  console.log("===createTbmParameterTemplateAction===", data);

  const result = await createTbmParameterTemplate(data);

  if (!result.success) {
    return {
      ...result,
      errors: {
        ...result.errors,
        form: result.errors?.form ?? [result.message || "创建失败"],
      },
      errorLevel: "error",
    };
  }

  return {
    ...result,
    nextAction: {
      type: "redirect",
      label: "返回参数模板列表",
      href: "/system/tbm/parameter-templates",
    },
  };
}
