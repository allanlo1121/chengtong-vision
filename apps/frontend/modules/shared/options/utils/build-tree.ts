import { TreeNodeRow, TreeOption } from "../types";

export function buildTree(rows: TreeNodeRow[]): TreeOption[] {
  const map = new Map<string, TreeOption & { parentId: string | null }>();

  for (const r of rows) {
    map.set(r.id, {
      value: r.id,
      label: r.name,
      parentId: r.parent_id,
      children: [],
    });
  }

  const tree: TreeOption[] = [];

  for (const node of map.values()) {
    if (node.parentId !== null) {
      const parent = map.get(node.parentId);

      if (parent) {
        parent.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}
