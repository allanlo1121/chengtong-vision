"use server";

import { Result } from "@/modules/shared/contracts";
import { deleteEmployee } from "../services";

export async function deleteEmployeeAction(id: string): Promise<Result<number>> {
  console.log("===deleteEmployee===", id);

  try {
    const result = await deleteEmployee(id);

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
