import { PaginatedResult } from "@/lib/shared/contracts";

import { Organization, OrganizationPickerItem, OrganizationPickerQuery } from "../types";

import { organizationClientRepository } from "../repositories/client";

export async function listOrganizationPicker(
  query: OrganizationPickerQuery
): Promise<PaginatedResult<OrganizationPickerItem>> {
  return await organizationClientRepository.searchOrganizationPicker(query);
}

export async function fetchOrganizationPickerById(
  id: string
): Promise<OrganizationPickerItem | null> {
  return await organizationClientRepository.getOrganizationPickerById(id);
}

export async function fetchOrganizationById(id: string): Promise<Organization> {
  const organization = await organizationClientRepository.findById(id);

  if (!organization) {
    throw new Error("未找到组织");
  }

  return organization;
}
