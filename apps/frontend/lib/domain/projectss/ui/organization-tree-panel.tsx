"use client";

import { useState, useEffect } from "react";
import { Tree } from "@/components/tree/tree";
import { TreeNode } from "@/lib/core/tree/types";
import { useRouter } from "next/navigation";
import { getTreeChildren } from "@/lib/core/tree/tree.client";
import { insertChildren } from "@/lib/core/tree/insert-children";

interface Props {
  data: TreeNode[];
  selectedId?: string | null;
}

export function OrganizationTreePanel({ data, selectedId }: Props) {
  const [tree, setTree] = useState<TreeNode[]>(data ?? []);
  const [currentId, setCurrentId] = useState(selectedId);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const router = useRouter();

  useEffect(() => {
    setTree(data ?? []);
  }, [data]);

  async function loadChildren(node: TreeNode) {
    try {
      const res = await getTreeChildren(node.id, node.entity);

      // ❗ 1. 请求失败
      if (!res || !res.success) {
        console.error("loadChildren failed", res?.message);

        // 👉 可选：提示
        // toast.error(res?.message ?? "加载失败");

        return; // ❗ 直接退出，不更新 tree
      }

      // ❗ 2. 成功
      const children = res.data ?? [];

      setTree((prev) => insertChildren(prev, node.id, children));
    } catch (err) {
      console.error("loadChildren error", err);
    }
  }

  // 🎯 点击节点（核心）
  function handleSelect(node: TreeNode) {
    if (node.id === currentId) {
      // 👉 点击的是当前节点 → 不做任何事
      return;
    }

    setCurrentId(node.id);

    // 👉 改 URL（驱动 Server 重新查询）
    router.push(`?parentId=${node.id}`);
  }

  // 🌳 展开（如果你后面做懒加载）
  async function handleExpand(node: TreeNode) {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      if (next.has(node.id)) {
        // 👉 收起
        next.delete(node.id);
        return next;
      } else {
        // 👉 展开
        next.add(node.id);

        // 如果还没 children，可以触发加载
        if (!node.children?.length) {
          loadChildren?.(node); // 可选
        }
      }

      return next;
    });
  }

  return (
    <Tree
      data={tree}
      selectedId={currentId ?? undefined}
      expandedIds={expandedIds}
      onSelect={handleSelect}
      onExpand={handleExpand}
    />
  );
}
