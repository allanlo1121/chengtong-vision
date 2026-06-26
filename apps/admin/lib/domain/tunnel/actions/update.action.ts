"use server";

import { z } from "zod";
import {
  UpdateTunnelInput,
  UpdateTunnelScheduleVersionInput,
  UpdateTunnelStatusTimelineInput,
  UpdateTunnelSchema,
} from "../schemas";

import { ActionResult } from "@/lib/shared/contracts";
import { updateTunnel, updateTunnelScheduleVersion, updateTunnelStatusTimeline } from "../services";
import { Tunnel, TunnelScheduleVersion, TunnelStatusTimeline } from "../types";

import { toActionError } from "@/lib/shared/contracts/action-result";

export async function updateTunnelAction(data: UpdateTunnelInput): Promise<ActionResult<Tunnel>> {
  console.log("SERVER ACTION RUNNING");
  console.log("update tunnel formData", data);

  const parsed = UpdateTunnelSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "表单验证失败",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await updateTunnel(parsed.data);

    return {
      success: true,
      data: result,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}

export async function updateTunnelScheduleAction(
  data: UpdateTunnelScheduleVersionInput
): Promise<ActionResult<TunnelScheduleVersion>> {
  try {
    const result = await updateTunnelScheduleVersion(data);

    return {
      success: true,
      data: result,
      message: "计划日期已更新",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}

export async function updateTunnelStatusTimelineAction(
  data: UpdateTunnelStatusTimelineInput
): Promise<ActionResult<TunnelStatusTimeline>> {
  try {
    const result = await updateTunnelStatusTimeline(data);

    return {
      success: true,
      data: result,
      message: "隧道状态已更新",
    };
  } catch (error: unknown) {
    return toActionError(error);
  }
}
