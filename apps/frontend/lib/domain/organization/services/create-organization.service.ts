import { CreateOrganizationInput } from "../schemas";
import { Result } from "@/lib/shared/contracts/service-result";
import { organizationRepository } from "../repositories";
import { Organization } from "../types";
import { mapOrganization, mapOrganizationToInsert } from "../mappers";

export async function createOrganization(
  input: CreateOrganizationInput
): Promise<Result<Organization>> {
  try {
    const data = mapOrganizationToInsert(input);
    const result = await organizationRepository.insert(data);
    return {
      success: true,
      data: mapOrganization(result) as Organization,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "创建失败",
    };
  }
}
