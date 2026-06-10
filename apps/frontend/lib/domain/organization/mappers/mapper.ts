import {
  CreateOrganizationInput,
  ImportOrganizationInput,
  UpdateOrganizationInput,
} from "../schemas";
import {
  OrganizationListRow,
  OrganizationListItem,
  OrganizationDetail,
  OrganizationDetailRow,
  Organization,
  OrganizationRow,
  OrganizationInsertRow,
  OrganizationUpdateRow,
} from "../types";

export function mapOrganizationListItem(rows: OrganizationListRow): OrganizationListItem {
  return {
    id: rows.id ?? "",
    name: rows.name ?? "",
    parentId: rows.parent_id ?? "",
    parentOrgName: rows.parent_org_name ?? "",

    orgTypeName: rows.org_type_name ?? "",
    businessName: rows.business_name ?? "",
    countryName: rows.country_name ?? "",
    provinceName: rows.province_name ?? "",
    cityName: rows.city_name ?? "",
    districtName: rows.district_name ?? "",

    sortOrder: rows.sort_order ?? 0,
    createdAt: rows.created_at ?? "",
  };
}

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
    orgCategoryName: row.org_category_name,
    businessName: row.business_name,
    countryName: row.country_name,

    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,

    isDisabled: row.is_disabled,
    isDeleted: row.is_deleted,

    externalId: row.external_id,
    externalVersion: row.external_version,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapOrganization(row: OrganizationRow): Organization {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    fullName: row.full_name,
    description: row.description,
    parentId: row.parent_id,

    orgCategoryId: row.org_category_id,
    nodeKey: row.node_key,
    level: row.level,
    isLeaf: row.is_leaf,
    sortOrder: row.sort_order,
    path: row.path,

    isDisabled: row.is_disabled,

    provinceCode: row.province_code,
    cityCode: row.city_code,
    districtCode: row.district_code,

    orgTypeId: row.org_type_id,
    businessId: row.business_id,
    countryCode: row.country_code,

    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedAt: row.deleted_at,
    deletedBy: row.deleted_by,

    externalId: row.external_id,
    externalVersion: row.external_version,
  };
}

export function mapOrganizationToInsert(row: CreateOrganizationInput): OrganizationInsertRow {
  return {
    code: row.code,
    name: row.name,
    full_name: row.fullName ?? null,
    description: row.description ?? null,
    parent_id: row.parentId ?? null,

    org_category_id: row.orgCategoryId ?? null,
    sort_order: row.sortOrder,
    is_disabled: row.isDisabled,

    province_code: row.provinceCode ?? null,
    city_code: row.cityCode ?? null,
    district_code: row.districtCode ?? null,

    org_type_id: row.orgTypeId,
    business_id: row.businessId ?? null,
    country_code: row.countryCode ?? null,

    address: row.address ?? null,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,

    external_id: row.externalId ?? null,
    external_version: row.externalVersion ?? null,
  };
}

export function mapOrganizationInsertFromImport(
  row: ImportOrganizationInput
): OrganizationInsertRow {
  return {
    code: row.code,
    name: row.name,
    full_name: row.fullName ?? null,
    description: row.description ?? null,
    parent_id: row.parentId ?? null,

    org_category_id: row.orgCategoryId ?? null,
    sort_order: row.sortOrder,
    is_disabled: row.isDisabled,

    province_code: row.provinceCode ?? null,
    city_code: row.cityCode ?? null,
    district_code: row.districtCode ?? null,

    org_type_id: row.orgTypeId,
    business_id: row.businessId ?? null,
    country_code: row.countryCode ?? null,

    address: row.address ?? null,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,

    external_id: row.externalId ?? null,
    external_version: row.externalVersion ?? null,
  };
}

export function mapOrganizationToUpdate(
  input: Partial<UpdateOrganizationInput>
): Partial<OrganizationUpdateRow> {
  return {
    code: input.code,
    name: input.name,
    full_name: input.fullName,
    description: input.description,
    parent_id: input.parentId ?? null,

    org_category_id: input.orgCategoryId,
    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,

    province_code: input.provinceCode,
    city_code: input.cityCode,
    district_code: input.districtCode,

    org_type_id: input.orgTypeId,
    business_id: input.businessId,
    country_code: input.countryCode,

    address: input.address,
    latitude: input.latitude,
    longitude: input.longitude,

    external_id: input.externalId,
    external_version: input.externalVersion,
  };
}
