import { Camelize } from "@/lib/shared/utils/case-converter";
import { OrganizationDetailRow, OrganizationRow } from "./db.types";

export type OrganizationDetail = Camelize<OrganizationDetailRow>;

export type OrganizationListItem = {
  id: string;
  name: string;
  parentId: string | null;
  parentOrgName: string | null;
  orgTypeName: string;
  businessName: string | null;
  countryName: string | null;
  provinceName: string | null;
  cityName: string | null;
  districtName: string | null;
  createdAt: string;

  sortOrder: number;
};

export type TreeNode = {
  id: string;
  parentId: string | null;
  name: string;

  path: string; // ltree
  level: number;
  sortOrder: number;

  hasChildren: boolean;

  entity: "organization" | "project" | "tbm";
};

export type Organization = Camelize<OrganizationRow>;

export type OrganizationFormModel = {
  id: string;
  name: string;
  code: string;
  fullName?: string;
  parent?: {
    id: string;
    name: string;
  };

  orgCategoryId?: string;
  orgTypeId: string;
  businessId?: string;

  countryCode?: string;
  provinceCode?: string;
  cityCode?: string;
  districtCode?: string;
  address?: string;

  description?: string;
  isDisabled: boolean;
  latitude?: number;
  longitude?: number;
};
