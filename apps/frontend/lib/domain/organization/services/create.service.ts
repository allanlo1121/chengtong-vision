import { CreateOrganizationInput } from "../schemas";
import { organizationRepository } from "../repositories";
import { Organization } from "../types";
import { mapOrganization, mapOrganizationToInsert } from "../mappers";
import { appErrors } from "@/lib/shared/contracts";

export async function createOrganization(input: CreateOrganizationInput): Promise<Organization> {
  const data = mapOrganizationToInsert(input);
  const result = await organizationRepository.insert(data);

  if (!result) {
    throw appErrors.internal("创建组织失败：数据库未返回数据");
  }
  return mapOrganization(result) as Organization;
}
