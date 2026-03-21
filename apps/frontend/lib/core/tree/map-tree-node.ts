import { TreeNode, TreeEntity } from "./types";

function toEntityType(v: string): TreeEntity {
  if (v === "organization" || v === "project" || v === "tbm") {
    return v;
  }
  throw new Error(`Invalid entity: ${v}`);
}

export function mapTreeNode(row: any): TreeNode {
  return {
    id: row.id,
    parentId: row.parent_id,
    name: row.name,

    entity: toEntityType(row.entity),

    level: row.level,
    path: row.path,

    hasChildren: row.has_children,
    sortOrder: row.sort_order,

    children: [],
  };
}
