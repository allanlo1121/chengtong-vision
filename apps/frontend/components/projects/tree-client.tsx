"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tree } from "./tree";
import { TreeNode } from "@/lib/master-data/master-data-tree.types";

export default function TreeClient({ nodes }: { nodes: TreeNode[] }) {
  //console.log("TreeClient", nodes);

  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  //console.log("pathname", pathname);

  useEffect(() => {
    const segs = pathname.split("/").filter(Boolean);
    const last = segs[segs.length - 1];

    // 简单判断：如果是 uuid，就当成选中节点
    if (last && /^[0-9a-fA-F-]{32,36}$/.test(last)) {
      setSelected(last);
    } else {
      setSelected(null);
    }
  }, [pathname]);

  // 固定 basePath
  const segments = pathname.split("/").filter(Boolean);

  // 固定保留 3 段路径
  const basePath = "/" + segments.slice(0, 3).join("/");

  //console.log("basePath", basePath);

  return (
    <Tree
      nodes={nodes}
      searchable
      includeChildrenOnSearch={false}
      selectedId={selected}
      onSelect={(node) => {
        setSelected(node.id); // ← 保留 Tree 的高亮状态
        // 🍀 叶子节点：跳到详情页
        if (!node.hasChildren) {
          router.push(`${basePath}/${node.id}`);
          return;
        }

        // 🍀 非叶子节点：跳到自身 path
        router.push(node.path?.startsWith("/") ? node.path : `/${node.path}`);
      }}
    />
  );
}
