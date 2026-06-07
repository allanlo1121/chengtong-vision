import { TreeNode } from "@/lib/shared/tree/types";

export interface TreeProps {
  data: TreeNode[];

  selectedId?: string;
  expandedIds?: Set<string>;
  loadingIds?: Set<string>;

  onSelect?: (node: TreeNode) => void;
  onExpand?: (node: TreeNode) => void;
}
