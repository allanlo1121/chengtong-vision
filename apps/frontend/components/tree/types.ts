import { TreeNode } from "@/lib/core/tree/types";

export interface TreeProps {
  data: TreeNode[];

  selectedId?: string;

  loadingIds?: Set<string>;

  onSelect?: (node: TreeNode) => void;
  onExpand?: (node: TreeNode) => void;
}
