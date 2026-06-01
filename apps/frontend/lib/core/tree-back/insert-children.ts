import { TreeNode } from "@/lib/core/tree/types";

export function insertChildren(
  tree: TreeNode[],
  parentId: string,
  children: TreeNode[]
): TreeNode[] {
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children,
        loaded: true, // 👈 标记已加载
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: insertChildren(node.children, parentId, children),
      };
    }

    return node;
  });
}
