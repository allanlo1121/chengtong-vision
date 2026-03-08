import { TreeNode } from "./types";

export function flattenTree<T>(tree: TreeNode<T>[]): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];

  function walk(nodes: TreeNode<T>[]) {
    for (const node of nodes) {
      result.push(node);

      if (node.children.length > 0) {
        walk(node.children);
      }
    }
  }

  walk(tree);

  return result;
}
