"use server";

import { ActionResult } from "@/lib/shared/contracts/action-result";
import { replaceTemplateParametersBySubsystem } from "../services/parameter-template.service";

export async function replaceTemplateParametersBySubsystemAction(input: {
  templateId: number;
  subsystemId: number;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTemplateParametersBySubsystemAction===", input);

  const result = await replaceTemplateParametersBySubsystem(input);

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
