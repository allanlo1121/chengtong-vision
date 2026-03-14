import { UpdateOrganizationInput } from "../schemas";
import {
  OrganizationDetail,
  OrganizationDetailRow,
  OrganizationListItem,
  OrganizationListRow,
  OrganizationTreeItem,
  OrganizationTreeRow,
  OrganizationRow,
} from "../types";

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

export function mapOrganizationTree(row: OrganizationTreeRow): OrganizationTreeItem {
  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    sortOrder: row.sort_order,
  };
}

export function mapOrganizationRowToUpdateInput(row: OrganizationRow): UpdateOrganizationInput {
  return {
    id: row.id,

    name: row.name,
    code: row.code,

    fullName: row.full_name ?? undefined,

    parentId: row.parent_id,

    orgTypeId: row.org_type_id,

    businessId: row.business_id ?? undefined,

    regionId: row.region_id,

    countryCode: row.country_code,

    provinceCode: row.province_code ?? undefined,
    cityCode: row.city_code ?? undefined,
    districtCode: row.district_code ?? undefined,

    address: row.address ?? undefined,

    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,

    isActive: row.is_active ?? true,
  };
}
