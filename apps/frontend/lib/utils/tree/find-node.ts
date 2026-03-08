import { TreeNode } from "./types";

export function findNode<T>(tree: TreeNode<T>[], id: string): TreeNode<T> | null {
  for (const node of tree) {
    if ((node as any).id === id) {
      return node;
    }

    const found = findNode(node.children, id);

    if (found) {
      return found;
    }
  }

  return null;
}
