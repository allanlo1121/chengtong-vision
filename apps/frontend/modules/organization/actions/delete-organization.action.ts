"use server";

import { Result } from "@/modules/shared/contracts";
import { deleteOrganization } from "../services";

export async function deleteOrganizationAction(id: string): Promise<Result<number>> {
  console.log("===deleteOrganizationAction===", id);

  try {
    const result = await deleteOrganization(id);

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
