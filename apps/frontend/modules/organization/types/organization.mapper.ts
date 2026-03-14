import { OrganizationListItem, OrganizationListRow } from "./organization.types";

export function mapOrganizationList(rows: OrganizationListRow): OrganizationListItem {
  return {
    id: rows.id,
    name: rows.name,
    parentId: rows.parent_id,
    parentName: rows.parent_name ?? undefined,
    isActive: rows.is_active,

    orgTypeName: rows.org_type_name,
    businessName: rows.business_name ?? undefined,
    regionName: rows.region_name,
    countryName: rows.country_name,
    adminRegionName: rows.admin_region_name ?? undefined,

    createdAt: rows.created_at,
  };
}
