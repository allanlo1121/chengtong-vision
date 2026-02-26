import { CodeNameRef, IdNameRef, MasterRef } from "../shared/types";

export interface OrganizationDetailRow {
  id: string;
  name: string;
  full_name: string | null;
  description: string | null;
  parent_id: string | null;
  parent_name: string | null;
  is_active: boolean;

  org_type_id: string;
  org_type_code: string;
  org_type_name: string;

  business_id: string | null;
  business_code: string | null;
  business_name: string | null;

  region_id: string;
  region_code: string;
  region_name: string;

  country_code: string;
  country_name: string;
  admin_region_code: string | null;
  admin_region_name: string | null;

  address: string | null;
  latitude: number | null;
  longitude: number | null;

  created_at: string;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

// ================================
// Detail
// ================================
export interface OrganizationDetail {
  id: string;
  name: string;
  fullName?: string;
  description?: string;

  parentOrganization?: IdNameRef;
  isActive: boolean;

  orgType: MasterRef;
  business?: MasterRef;
  region: MasterRef;

  countryCode: CodeNameRef;
  adminRegionCode?: CodeNameRef;

  address?: string;
  latitude?: number;
  longitude?: number;

  createdAt: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface OrganizationListRow {
  id: string;
  name: string;
  parent_name: string | null;
  is_active: boolean;

  org_type_name: string;
  business_name: string | null;
  region_name: string;
  country_name: string;
  admin_region_name: string | null;

  created_at: string;
}

export interface OrganizationListItem {
  id: string;
  name: string;

  parentName?: string;
  isActive: boolean;

  orgTypeName: string;
  businessName?: string;
  regionName: string;

  countryName: string;
  adminRegionName?: string;

  createdAt: string;
}
