"use server";

import { Result } from "@/modules/shared/contracts";
import { deleteOrganizations } from "../repositories/organization-delete.repository";

export async function deleteOrganizationAction(id: string): Promise<Result<number>> {
  console.log("===deleteOrganizationAction===", id);

  try {
    const count = await deleteOrganizations([id]);

    return {
      success: true,
      data: count,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
