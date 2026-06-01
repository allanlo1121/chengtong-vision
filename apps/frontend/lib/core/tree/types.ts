import { Database } from "@/lib/core/database/types";

export type TreeViewRow = Database["system"]["Views"]["v_tree_nodes"]["Row"];

export type TreeRow = Omit<TreeViewRow, "tree_key" | "entity_type">;

// export const TREE_KEYS = {
//   organizations: "organizations",

//   project_catalog_std:
//     "project_catalog_std",
// } as const;

// export type TreeKey =
//   keyof typeof TREE_KEYS;

export interface TreeNode {
  id: string;

  parentId: string | null;

  nodeKey: string;

  path: string;

  level: number;

  sortOrder: number;

  isLeaf: boolean;

  hasChildren: boolean;

  isEnabled: boolean;

  isLoaded?: boolean;

  code?: string | null;

  name?: string | null;

  label?: string | null;

  children?: TreeNode[];
}

export const TREE_QUERY_KEYS = {
  organizations: "organizationId",
  project_catalog_std: "projectCatalogStdId",
} as const;

export type TreeKey = keyof typeof TREE_QUERY_KEYS;

export interface TreeProps {
  data: TreeNode[];

  selectedId?: string;

  expandedIds?: Set<string>;

  loading?: boolean;

  onSelect?: (node: TreeNode) => void;

  onToggleExpand?: (node: TreeNode) => void;
}

export interface TreeNodeItemProps {
  node: TreeNode;

  selectedId?: string;

  expandedIds?: Set<string>;

  loading?: boolean;

  onSelect?: (node: TreeNode) => void;

  onToggleExpand?: (node: TreeNode) => void;
}
