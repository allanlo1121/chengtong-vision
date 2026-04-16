export type OrganizationTreeItem = {
  id: string;
  name: string;
  parentId: string | null;
};

export interface OrganizationTreeNode {
  id: string;
  parentId: string | null;
  name: string;
  sortOrder: number;

  hasChildren: boolean; // 👈关键
  children?: OrganizationTreeNode[];

  isLoaded?: boolean; // 👈前端控制
}
