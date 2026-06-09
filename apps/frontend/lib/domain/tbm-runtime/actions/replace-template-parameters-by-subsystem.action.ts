"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { replaceTemplateParametersBySubsystem } from "../services/parameter-template.service";

export async function replaceTemplateParametersBySubsystemAction(input: {
  templateId: number;
  subsystemId: number;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTemplateParametersBySubsystemAction===", input);

  try {
    const result = await replaceTemplateParametersBySubsystem(input);
    return {
      success: true,
      data: { count: result },
      message: "替换参数成功",
    };
  } catch (error) {
    console.error("Error creating TBM:", error);
    return toActionError(error);
  }
}
