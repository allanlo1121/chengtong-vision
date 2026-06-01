"use server";

import { ActionResult } from "@/lib/shared/contracts/action-result";
import { replaceTbmBindingParameters } from "../services";

export async function replaceTbmParametersAction(input: {
  tbmId: string;
  parameterIds: number[];
}): Promise<ActionResult<{ count: number }>> {
  console.log("===replaceTbmParametersAction===", input);

  const result = await replaceTbmBindingParameters(input);

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
