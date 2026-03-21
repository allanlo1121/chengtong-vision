import { TreeNode, TreeEntity, TreeNodeRow } from "./types";

export function buildTreeFromFlat(rows: TreeNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // ✅ 1️⃣ 初始化（关键！）
  rows.forEach((row) => {
    map.set(row.id, {
      ...row,
      children: [], // 👈 必须初始化
    });
  });

  // ✅ 2️⃣ 构建关系
  rows.forEach((row) => {
    const node = map.get(row.id)!;

    if (row.parentId && map.has(row.parentId)) {
      map.get(row.parentId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}
