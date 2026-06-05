"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { deleteTbm } from "../services";

export async function deleteTbmAction(id: string): Promise<ActionResult<void>> {
  console.log("===deleteTbm===", id);

  try {
    const result = await deleteTbm(id);

    return {
      success: true,
      message: "删除成功",
      data: result,
    };
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return toActionError(error);
  }
}
