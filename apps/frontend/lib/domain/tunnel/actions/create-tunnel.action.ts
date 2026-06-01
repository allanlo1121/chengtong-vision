"use server";

import { z } from "zod";
import { createTunnelFull } from "../services";
import { CreateTunnelFullSchema, CreateTunnelInput, TunnelFields } from "../schemas";
import { ActionState } from "@/lib/shared/actions/types";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { Tunnel } from "../types";

export type TunnelFormState = ActionState<TunnelFields>;

export async function createTunnelAction(data: CreateTunnelInput): Promise<ActionResult<Tunnel>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create tunnel formData", data);

  const parsed = CreateTunnelFullSchema.safeParse(data);

  console.log("Parsed form data", parsed);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await createTunnelFull(parsed.data);

    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
