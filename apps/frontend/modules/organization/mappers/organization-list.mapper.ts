import { OrganizationListRow, OrganizationListItem } from "../types";

export function mapOrganizationList(rows: OrganizationListRow): OrganizationListItem {
  return {
    id: rows.id,
    name: rows.name,
    parentId: rows.parent_id,
    parentOrgName: rows.parent_org_name,

    orgTypeName: rows.org_type_name,
    businessName: rows.business_name,
    countryName: rows.country_name,
    provinceName: rows.province_name,
    cityName: rows.city_name,
    districtName: rows.district_name,

    sortOrder: rows.sort_order,
    createdAt: rows.created_at,
  };
}
