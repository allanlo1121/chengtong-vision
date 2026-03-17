import { ImportConfig } from "@/modules/import/types";
import { OrganizationSchema } from "../schemas";
import { UpdateOrganizationInput } from "../schemas";
import { OrganizationDetail, OrganizationDetailRow } from "../types";
import { Camelize } from "@/modules/shared/utils/case-converter";
import { OrganizationListRow, OrganizationRow, OrganizationTreeRow } from "../repositories";

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

export type OrganizationListItem = Camelize<OrganizationListRow>;

export function mapOrganizationList(rows: OrganizationListRow): OrganizationListItem {
  return {
    id: rows.id,
    name: rows.name,
    parentId: rows.parent_id,
    parentOrgName: rows.parent_org_name,
    isActive: rows.is_active,
    level: rows.level,

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

export type OrganizationTreeItem = Camelize<OrganizationTreeRow>;

export type OrganizationTreeFlatNode = {
  id: string;
  name: string;
  parentId: string | null;
};

export function mapOrganizationTree(row: OrganizationTreeRow): OrganizationTreeFlatNode {
  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
  };
}

export type OrganizationItem = Camelize<OrganizationRow>;

export function mapOrganizationRowToUpdateInput(row: OrganizationRow): UpdateOrganizationInput {
  return {
    id: row.id,

    name: row.name,
    code: row.code,

    fullName: row.full_name ?? undefined,

    parentId: row.parent_id,

    orgTypeId: row.org_type_id,

    businessId: row.business_id ?? undefined,

    countryCode: row.country_code,

    provinceCode: row.province_code ?? undefined,
    cityCode: row.city_code ?? undefined,
    districtCode: row.district_code ?? undefined,

    address: row.address ?? undefined,

    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,

    isActive: row.is_active ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}
