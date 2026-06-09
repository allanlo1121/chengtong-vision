import { PaginatedResult, Result } from "@/lib/shared/contracts";

import { Organization, OrganizationPickerItem, OrganizationPickerQuery } from "../types";

import { organizationClientRepository } from "../repositories/client";
import { mapOrganizationPicker } from "../mappers";

export async function listPicker(
  query: OrganizationPickerQuery
): Promise<PaginatedResult<OrganizationPickerItem>> {
  return await organizationClientRepository.searchOrganizationPicker(query);
}

export async function getOrganizationPickerItemById(
  id: string
): Promise<OrganizationPickerItem | null> {
  try {
    const data = await organizationClientRepository.getPickerItemById(id);

    if (data) {
      return mapOrganizationPicker(data);
    }

    return null;
  } catch (error: unknown) {
    console.error("Error fetching organization picker item by ID:", error);
    return null;
  }
}

export async function fetchOrganizationById(id: string): Promise<Organization> {
  const organization = await organizationClientRepository.findById(id);

  if (!organization) {
    throw new Error("未找到组织");
  }

  return organization;
}
