"use server";

import { ActionResult } from "@/lib/shared/contracts/action-result";
import { replaceTemplateParameters } from "../services/parameter-template.service";

export async function replaceTemplateParametersAction(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTemplateParametersAction===", input);

  const result = await replaceTemplateParameters(input);

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
