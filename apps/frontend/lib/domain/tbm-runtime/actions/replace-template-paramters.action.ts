"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { replaceTemplateParameters } from "../services/parameter-template.service";

export async function replaceTemplateParametersAction(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTemplateParametersAction===", input);

  try {
    const result = await replaceTemplateParameters(input);
    return {
      success: true,
      data: { count: result },
      message: "替换参数成功",
    };
  } catch (error) {
    console.error("Error replacing template parameters:", error);
    return toActionError(error);
  }
}
