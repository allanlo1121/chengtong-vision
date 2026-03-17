import { buildTreeWithIndex } from "./build-tree";
import { TreeFlatNode } from "./types";

export function createTreeEngine<T extends TreeFlatNode>(rows: T[]) {
  const index = buildTreeWithIndex(rows);

  function findNode(id: string) {
    return index.nodeMap.get(id);
  }

  function findPath(id: string) {
    const path: any[] = [];
    let current: string | null = id;

    while (current) {
      const node = index.nodeMap.get(current);
      if (!node) break;
      path.unshift(node);
      current = index.parentMap.get(current) ?? null;
    }

    return path;
  }

  function getExpandedIds(id: string | null) {
    if (!id) return new Set<string>();
    const path = findPath(id);
    return new Set(path.map((n) => n.id));
  }

  function getChildren(id: string) {
    return index.nodeMap.get(id)?.children ?? [];
  }

  return {
    tree: index.tree,
    findNode,
    findPath,
    getChildren,
    getExpandedIds,
  };
}
