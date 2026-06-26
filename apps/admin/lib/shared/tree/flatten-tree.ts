import { TreeNode } from "./tree.types";

export function flattenTree<T>(nodes: TreeNode<T>[]): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];

  function walk(list: TreeNode<T>[]) {
    for (const n of list) {
      result.push(n);
      walk(n.children);
    }
  }

  walk(nodes);

  return result;
}
