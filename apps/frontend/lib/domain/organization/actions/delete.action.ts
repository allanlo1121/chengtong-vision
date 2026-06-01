"use server";

import { ActionResult } from "@/lib/shared/contracts";
import { deleteOrganization } from "../services";

export async function deleteOrganizationAction(id: string): Promise<ActionResult<number>> {
  console.log("===deleteOrganizationAction===", id);

  try {
    const result = await deleteOrganization(id);

    return {
      success: true,
      data: 1,
      message: "删除成功",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
