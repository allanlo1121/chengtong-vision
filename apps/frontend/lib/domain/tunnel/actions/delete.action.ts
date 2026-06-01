"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { deleteTunnel } from "../services";
import { Tunnel } from "../types";

export async function deleteTunnelAction(id: string): Promise<ActionResult<Tunnel>> {
  console.log("===deleteTunnel===", id);

  try {
    const result = await deleteTunnel(id);

    return {
      success: true,
      data: result,
      message: "删除成功",
    };
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return toActionError(error);
  }
}
