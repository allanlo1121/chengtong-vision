import type { MenuNode } from "./types";

export function buildTree(items: MenuNode[]): MenuNode[] {
  const map = new Map<string, MenuNode>();
  const roots: MenuNode[] = [];

  items.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  items.forEach((item) => {
    if (item.parent_id) {
      map.get(item.parent_id)?.children?.push(map.get(item.id)!);
    } else {
      roots.push(map.get(item.id)!);
    }
  });

  return roots;
}
