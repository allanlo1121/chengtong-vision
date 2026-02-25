import { OrganizationDetail, OrganizationDetailRow } from "./types";

export function mapOrganizationDetail(row: OrganizationDetailRow): OrganizationDetail {
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name ?? undefined,
    description: row.description ?? undefined,
    parentOrganization: row.parent_id
      ? {
          id: row.parent_id,
          name: row.parent_name!,
        }
      : undefined,
    isActive: row.is_active,

    orgType: {
      id: row.org_type_id,
      code: row.org_type_code,
      name: row.org_type_name,
    },

    business: row.business_id
      ? {
          id: row.business_id,
          code: row.business_code!,
          name: row.business_name!,
        }
      : undefined,

    region: {
      id: row.region_id,
      code: row.region_code,
      name: row.region_name,
    },

    countryCode: {
      code: row.country_code,
      name: row.country_name,
    },
    adminRegionCode: row.admin_region_code
      ? {
          code: row.admin_region_code,
          name: row.admin_region_name!,
        }
      : undefined,

    address: row.address ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,

    createdAt: row.created_at,
    createdBy: row.created_by ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    updatedBy: row.updated_by ?? undefined,
  };
}
