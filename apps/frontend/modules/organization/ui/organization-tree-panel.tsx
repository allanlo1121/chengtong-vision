"use client";

import { useMemo, useState } from "react";
import { Tree } from "@/components/tree/tree";
import { TreeNode } from "@/lib/core/tree/types";
import { useRouter } from "next/navigation";
import { buildTreeFromFlat } from "@/lib/core/tree/build-tree-from-flat";

interface Props {
  data: TreeNode[];
  selectedId?: string | null;
}

export function OrganizationTreePanel({ data, selectedId }: Props) {


  const [tree, SetTree] = useState(data)
  const [currentId, setCurrentId] = useState(selectedId);

  const router = useRouter();

  // 🎯 点击节点（核心）
  function handleSelect(node: TreeNode) {
    setCurrentId(node.id);

    // 👉 改 URL（驱动 Server 重新查询）
    router.push(`?parentId=${node.id}`);
  }

  // 🌳 展开（如果你后面做懒加载）
  async function handleExpand(node: TreeNode) {
    // 这里可以接 expandNode
  }

  return (
    <Tree
      data={tree}
      selectedId={currentId ?? undefined}
      onSelect={handleSelect}
      onExpand={handleExpand}
    />
  );
}
