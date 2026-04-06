import { Camelize } from "@/modules/shared/utils/case-converter";
import { OrganizationDetailRow } from "./db.types";

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
  isActive: boolean;
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
