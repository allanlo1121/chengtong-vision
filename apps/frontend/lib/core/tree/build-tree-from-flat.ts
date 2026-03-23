import { TreeNode, TreeEntity, TreeNodeRow } from "./types";

export function buildTreeFromFlat(
  rows: TreeNode[],
  sortKey: keyof TreeNode = "sortOrder"
): TreeNode[] {
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
  // ✅ 3️⃣ 递归排序（核心）
  function sortTree(nodes: TreeNode[]) {
    nodes.sort((a, b) => {
      const va = (a[sortKey] ?? 0) as number;
      const vb = (b[sortKey] ?? 0) as number;
      // 👉 debug
      if (isNaN(va) || isNaN(vb)) {
        console.warn("排序字段异常", a, b);
      }

      return va - vb;
    });

    nodes.forEach((n) => {
      if (n.children?.length) {
        sortTree(n.children);
      }
    });
  }

  sortTree(roots);

  //   console.log("buildTreeFromFlat",JSON.stringify(roots, null, 2));

  return roots;
}
