"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { addParametersToTemplate } from "../services/parameter-template.service";

export async function addParametersToTemplateAction(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<ActionResult<number>> {
  console.log("===addParametersToTemplateAction===", input);

  try {
    if (input.parameterIds.length === 0) {
      return {
        success: false,
        message: "请至少选择一个参数",
        errors: {
          parameterIds: ["请至少选择一个参数"],
        },
        errorLevel: "warning",
      };
    }

    const result = await addParametersToTemplate(input);

    return {
      success: true,
      data: result,
      message: `成功添加 ${result} 个参数到模板`,
    };
  } catch (error) {
    console.error("Error adding parameters to template:", error);
    return toActionError(error);
  }
}
