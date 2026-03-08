import { TreeNode } from "./types";

export function findPath<T>(tree: TreeNode<T>[], id: string): TreeNode<T>[] | null {
  for (const node of tree) {
    if ((node as any).id === id) {
      return [node];
    }

    const path = findPath(node.children, id);

    if (path) {
      return [node, ...path];
    }
  }

  return null;
}
