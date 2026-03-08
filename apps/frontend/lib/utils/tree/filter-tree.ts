import { TreeNode } from "./types";

export function filterTree<T>(
  tree: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];

  for (const node of tree) {
    const children = filterTree(node.children, predicate);

    if (predicate(node) || children.length > 0) {
      result.push({
        ...node,
        children,
      });
    }
  }

  return result;
}
