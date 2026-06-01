"use server";

import { Result } from "@/modules/shared/contracts";
import { batchDeleteOrganizations } from "@/lib/domain/organization";

export async function batchDeleteOrganizationsAction(ids: string[]): Promise<Result<number>> {
  try {
    const affected = await batchDeleteOrganizations(ids);

    if (affected === 0) {
      throw new Error("未删除任何数据");
    }

    return {
      success: true,
      data: affected,
      message: `成功删除 ${affected} 个组织`,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
