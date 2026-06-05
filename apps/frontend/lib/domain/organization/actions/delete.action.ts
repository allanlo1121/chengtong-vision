"use server";

import { ActionResult } from "@/lib/shared/contracts";
import { deleteOrganization } from "../services";

export async function deleteOrganizationAction(id: string): Promise<ActionResult<void>> {
  console.log("===deleteOrganizationAction===", id);

  try {
    await deleteOrganization(id);

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
