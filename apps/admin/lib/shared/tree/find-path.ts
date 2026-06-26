import { TreeNode } from "./tree.types";

export function findPath<T>(tree: TreeNode<T>[], id: string): TreeNode<T>[] | null {
  const path: TreeNode<T>[] = [];

  function dfs(nodes: TreeNode<T>[]): boolean {
    for (const node of nodes) {
      path.push(node);

      if (node.id === id) {
        return true;
      }

      if (dfs(node.children)) {
        return true;
      }

      path.pop();
    }

    return false;
  }

  return dfs(tree) ? path : null;
}
