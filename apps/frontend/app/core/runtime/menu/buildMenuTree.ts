import type { MenuNode, MenuRow } from "./types";

export function buildMenuTree(rows: MenuRow[]): MenuNode[] {
  const map = new Map<string, MenuNode>();
  const roots: MenuNode[] = [];

  rows.forEach((row) => {
    map.set(row.id, { ...row, children: [] });
  });

  map.forEach((node) => {
    if (node.parent_id) {
      const parent = map.get(node.parent_id);
      if (parent) {
        parent.children!.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}
