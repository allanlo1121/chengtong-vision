import { TreeNode, TreeFlatNode } from "./tree.types";

export function buildTree<T extends TreeFlatNode>(rows: T[]): TreeNode<T>[] {
  const map = new Map<string, TreeNode<T> & { parentId: string | null }>();

  for (const r of rows) {
    map.set(r.id, {
      id: r.id,
      name: r.name,
      data: r,
      parentId: r.parentId,
      children: [],
    });
  }

  const tree: TreeNode<T>[] = [];

  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId);

      if (parent) {
        parent.children.push(node);
      } else {
        tree.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}
