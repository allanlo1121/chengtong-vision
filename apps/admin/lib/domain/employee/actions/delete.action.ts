"use server";

import { ActionResult } from "@/lib/shared/contracts";
import { deleteEmployee } from "../services";

export async function deleteEmployeeAction(id: string): Promise<ActionResult<void>> {
  console.log("===deleteEmployeeAction===", id);

  try {
    await deleteEmployee(id);

    return {
      success: true,
      data: undefined,
      message: "删除成功",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
