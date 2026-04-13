export interface TreeFlatNode {
  id: string;
  name: string;
  parentId: string | null;
}

export interface TreeNode<T = any> {
  id: string;
  name: string;
  data?: T;
  children: TreeNode<T>[];
}

export interface TreeIndex<T = any> {
  tree: TreeNode<T>[];
  nodeMap: Map<string, TreeNode<T>>;
  parentMap: Map<string, string | null>;
}

export type TreeOption = {
  value: string;
  label: string;
  children: TreeOption[];
};

export type TreeOptionConfig = { source: "organization_tree"; parentId?: string };
