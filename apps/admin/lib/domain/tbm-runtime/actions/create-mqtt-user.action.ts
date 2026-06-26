"use server";

import { z } from "zod";
import { createMqttUser } from "../services";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";

import { CreateMqttUserInput, CreateMqttUserSchema } from "../schemas";
import { MqttUserWithAcl } from "../types";

export type MqttUserFormState = ActionResult<CreateMqttUserInput>;

export async function createMqttUserAction(
  data: CreateMqttUserInput
): Promise<ActionResult<MqttUserWithAcl>> {
  console.log("===createMqttUserAction===", data);

  const parsed = CreateMqttUserSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createMqttUser(data);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    console.error("Error creating TBM:", error);
    return toActionError(error);
  }
}
