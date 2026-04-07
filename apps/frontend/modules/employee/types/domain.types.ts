import { Camelize } from "@/modules/shared/utils/case-converter";
// import { OrganizationDetailRow } from "./db.types";

// export type OrganizationDetail = Camelize<OrganizationDetailRow>;

export type EmployeeListItem = {
  id: string;
  name: string;
  code: string | null;
  organizationId: string | null;
  organizationName: string | null;
  statusName: string | null;

  sortOrder: number;
  createdAt: string;
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
