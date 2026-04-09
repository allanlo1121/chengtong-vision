import { PaginatedResult, Result } from "@/modules/shared/contracts";

import { findOrganizationDetailById } from "../repositories/organization.repository";
import { mapOrganizationDetail } from "../mappers";
import { OrganizationDetail } from "../types";

export async function getOrganizationDetailById(id: string): Promise<Result<OrganizationDetail>> {
  try {
    console.log("===getOrganizationDetailById===");

    const row = await findOrganizationDetailById(id);

    if (!row) return { success: false, message: "未查询到组织" };

    return {
      success: true,
      data: mapOrganizationDetail(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
