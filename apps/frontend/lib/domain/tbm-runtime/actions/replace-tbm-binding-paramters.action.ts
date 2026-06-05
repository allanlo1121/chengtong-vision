"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { replaceTbmBindingParameters } from "../services";

export async function replaceTbmParametersAction(input: {
  tbmId: string;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTbmParametersAction===", input);

  try {
    const result = await replaceTbmBindingParameters(input);

    return {
      success: true,
      data: result,
      message: "替换参数成功",
    };
  } catch (error) {
    console.error("Error replacing TBM parameters:", error);
    return toActionError(error);
  }
}
