import { CreateOrganizationInput, UpdateOrganizationInput } from "../schemas";
import { organizationRepository } from "../repositories";
import { Organization } from "../types";
import { appErrors } from "@/lib/shared/contracts";

export async function createOrganization(input: CreateOrganizationInput): Promise<Organization> {
  const exists = await organizationRepository.findByCode(input.code);

  if (exists) {
    throw appErrors.conflict("组织编码已存在");
  }

  return organizationRepository.insert(input);
}

export async function updateOrganization(input: UpdateOrganizationInput): Promise<Organization> {
  const exists = await organizationRepository.findById(input.id);

  if (!exists) {
    throw appErrors.notFound("未找到组织");
  }

  return organizationRepository.update(input);
}

export async function deleteOrganization(id: string): Promise<void> {
  await organizationRepository.deleteById(id);
}
