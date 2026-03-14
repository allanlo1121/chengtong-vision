export interface OrganizationTreeRow {
  id: string;
  parent_id: string | null;
  name: string;
  sort_order: number;
}

export interface OrganizationTreeItem {
  id: string;
  parentId: string | null;
  name: string;
  sortOrder: number;
}
