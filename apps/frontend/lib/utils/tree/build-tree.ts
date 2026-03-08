import { TreeNode } from "./types";

export function buildTree<T extends { id: string; parentId: string | null; sortOrder?: number }>(
  items: T[]
): TreeNode<T>[] {
  const map = new Map<string, TreeNode<T>>();
  const roots: TreeNode<T>[] = [];

  // 初始化 node
  for (const item of items) {
    map.set(item.id, { ...item, children: [] });
  }

  // 构建树
  for (const item of items) {
    const node = map.get(item.id)!;

    if (item.parentId !== null) {
      const parent = map.get(item.parentId);

      if (parent) {
        parent.children.push(node);
        continue;
      }
    }

    roots.push(node);
  }

  // 递归排序
  const sortTree = (nodes: TreeNode<T>[]) => {
    nodes.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    for (const node of nodes) {
      if (node.children.length > 0) {
        sortTree(node.children);
      }
    }
  };

  sortTree(roots);

  return roots;
}
