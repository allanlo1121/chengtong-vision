import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { OrganizationListItem, Organization, OrganizationDetail } from "../types";
import { organizationRepository } from "../repositories";
import { OrganizationQueryType } from "../queries";

export async function listOrganizations(
  query: OrganizationQueryType
): Promise<PaginatedResult<OrganizationListItem>> {
  return await organizationRepository.paginate(query);
}

export async function fetchOrganizationDetailById(id: string): Promise<OrganizationDetail> {
  const organization = await organizationRepository.findDetailById(id);

  if (!organization) {
    throw appErrors.notFound("未查询到组织");
  }
  return organization;
}

export async function getOrganizationById(id: string): Promise<Organization> {
  const organization = await organizationRepository.findById(id);

  if (!organization) {
    throw appErrors.notFound("未查询到组织");
  }
  return organization;
}

export async function fetchOrganizationById(id: string): Promise<Organization> {
  const organization = await organizationRepository.findById(id);

  if (!organization) {
    throw appErrors.notFound("未查询到组织");
  }
  return organization;
}

export async function expandOrganizationIds(grantedOrganizationIds: string[]): Promise<string[]> {
  const organizations = await organizationRepository.list();

  const childrenMap = new Map<string, string[]>();

  for (const org of organizations) {
    if (!org.parentId) continue;

    const children = childrenMap.get(org.parentId) ?? [];

    children.push(org.id);

    childrenMap.set(org.parentId, children);
  }

  const result = new Set<string>();

  function walk(id: string) {
    if (result.has(id)) {
      return;
    }

    result.add(id);

    const children = childrenMap.get(id) ?? [];

    for (const childId of children) {
      walk(childId);
    }
  }

  for (const organizationId of grantedOrganizationIds) {
    walk(organizationId);
  }

  return [...result];
}
