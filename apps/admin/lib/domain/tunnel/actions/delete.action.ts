"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { deleteTunnel } from "../services";
import { Tunnel } from "../types";

export async function deleteTunnelAction(id: string): Promise<ActionResult<void>> {
  console.log("===deleteTunnel===", id);

  try {
    await deleteTunnel(id);

    return {
      success: true,
      data: undefined,
      message: "删除成功",
    };
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return toActionError(error);
  }
}
