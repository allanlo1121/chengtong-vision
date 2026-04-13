import { Result } from "@/lib/shared/contracts/service-result";

import { UpdateOrganizationInput } from "../schemas";

import { organizationRepository } from "../repositories";
import { mapOrganization, mapUpdateOrganizationInputToRow } from "../mappers/organization.mapper";
import { Organization } from "../types";

export async function updateOrganization(
  id: string,
  input: UpdateOrganizationInput
): Promise<Result<Organization>> {
  try {
    const data = mapUpdateOrganizationInputToRow(input);

    const result = await organizationRepository.update(id, data);
    return {
      success: true,
      data: mapOrganization(result),
      message: "更新成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "更新失败",
    };
  }
}
