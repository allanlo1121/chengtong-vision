import { TreeFlatNode, TreeNode, TreeIndex } from "./types";

export function buildTreeWithIndex<T extends TreeFlatNode>(rows: T[]): TreeIndex<T> {
  const nodeMap = new Map<string, TreeNode<T>>();
  const parentMap = new Map<string, string | null>();

  for (const r of rows) {
    nodeMap.set(r.id, {
      id: r.id,
      name: r.name,
      data: r,
      children: [],
    });

    parentMap.set(r.id, r.parentId);
  }

  const tree: TreeNode<T>[] = [];

  for (const r of rows) {
    const node = nodeMap.get(r.id)!;

    if (r.parentId) {
      const parent = nodeMap.get(r.parentId);

      if (parent) {
        parent.children.push(node);
      } else {
        tree.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return {
    tree,
    nodeMap,
    parentMap,
  };
}
