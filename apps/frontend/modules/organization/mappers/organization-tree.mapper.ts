// modules/organization/mappers/organization-tree.mapper.ts

import { OrganizationTreeNode } from "../types";

export interface OrganizationTreeRow {
  id: string;
  parent_id: string | null;
  name: string;
  sort_order: number;
  has_children: boolean;
}

export function mapOrganizationTree(row: OrganizationTreeRow): OrganizationTreeNode {
  return {
    id: row.id,
    parentId: row.parent_id,
    name: row.name,
    sortOrder: row.sort_order,
    hasChildren: row.has_children,
    children: [],
    isLoaded: false,
  };
}
