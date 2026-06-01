import { Result } from "@/lib/shared/contracts";

import { organizationRepository } from "../repositories";
import { mapOrganization, mapOrganizationDetail } from "../mappers";
import { Organization, OrganizationDetail } from "../types";

export async function getOrganizationDetailById(id: string): Promise<Result<OrganizationDetail>> {
  try {
    console.log("===getOrganizationDetailById===");

    const row = await organizationRepository.findDetailById(id);

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

export async function getOrganizationById(id: string): Promise<Result<Organization>> {
  try {
    console.log("===getOrganizationById===");

    const row = await organizationRepository.findById(id);

    if (!row) return { success: false, message: "未查询到组织" };

    return {
      success: true,
      data: mapOrganization(row),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
