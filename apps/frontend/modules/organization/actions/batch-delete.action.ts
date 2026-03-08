"use server";

import { ActionResult } from "@/lib/shared/contracts";
import { batchDeleteOrganizations } from "@/lib/domain/organization";

export async function batchDeleteOrganizationsAction(ids: string[]): Promise<ActionResult<number>> {
  try {
    const affected = await batchDeleteOrganizations(ids);

    if (affected === 0) {
      throw new Error("未删除任何数据");
    }

    return {
      success: true,
      data: affected,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "删除失败",
    };
  }
}
