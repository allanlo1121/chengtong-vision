import { TreeNode, TreeRow } from "./types";

export function buildTree(rows: TreeRow[]): TreeNode[] {
  const map = new Map<string, TreeNode>();

  const roots: TreeNode[] = [];

  // =====================================
  // create nodes
  // =====================================

  for (const row of rows) {
    if (!row.id) {
      throw new Error("Tree row id is null");
    }

    map.set(row.id, {
      id: row.id,

      parentId: row.parent_id,

      nodeKey: row.node_key ?? "",

      path: row.path ?? "",

      level: row.level ?? 0,

      sortOrder: row.sort_order ?? 0,

      isLeaf: row.is_leaf ?? false,

      hasChildren: row.has_children ?? false,

      isEnabled: row.is_enabled ?? false,

      code: row.code ?? "",

      name: row.name,

      label: row.label,

      children: [],
    });
  }

  // =====================================
  // attach
  // =====================================

  for (const node of map.values()) {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  // =====================================
  // sort
  // =====================================

  function sortTree(nodes: TreeNode[]) {
    nodes.sort((a, b) => a.sortOrder - b.sortOrder);

    for (const node of nodes) {
      if (node.children?.length) {
        sortTree(node.children);
      }
    }
  }

  sortTree(roots);

  return roots;
}
