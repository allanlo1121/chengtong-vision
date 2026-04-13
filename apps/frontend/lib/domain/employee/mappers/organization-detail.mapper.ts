import { OrganizationDetail, OrganizationDetailRow } from "../types";

import { OrganizationListRow, OrganizationListItem } from "../types";

export function mapOrganizationDetail(row: OrganizationDetailRow): OrganizationDetail {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    fullName: row.full_name,
    description: row.description,
    parentOrgName: row.parent_org_name,

    provinceName: row.province_name,
    cityName: row.city_name,
    districtName: row.district_name,

    orgTypeName: row.org_type_name,
    businessName: row.business_name,
    countryName: row.country_name,

    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,

    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
