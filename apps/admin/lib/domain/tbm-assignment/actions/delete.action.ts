"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { deleteTbmAssignment } from "../services";

export async function deleteTbmAssignmentAction(id: string): Promise<ActionResult<void>> {
  console.log("===deleteTbm===", id);

  try {
    const result = await deleteTbmAssignment(id);

    return {
      success: true,
      message: "删除成功",
      data: undefined,
    };
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return toActionError(error);
  }
}
