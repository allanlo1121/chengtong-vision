"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TreeNodeItem } from "./tree-node-item";
import { OrganizationTreeNode } from "../../types";

export function OrganizationTree() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = params.id as string | undefined;

  const [nodes, setNodes] = useState<OrganizationTreeNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // ⭐ 1. 初始化 root
  useEffect(() => {
    loadRoot();
  }, []);

  async function loadRoot() {
    const res = await fetch(`/api/tree?source=organization&parentId=`);
    const json = await res.json();
    setNodes(json.data);
  }

  // ⭐ 2. 根据 orgId 自动展开 path
  useEffect(() => {
    if (!id) return;

    fetch(`/api/tree/node?id=${id}`)
      .then((res) => res.json())
      .then((node) => {
        if (node?.path) {
          setExpandedIds(node.path.split("."));
        }
      });
  }, [id]);

  // ⭐ 3. 点击节点 → 改 URL
  function handleSelect(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("parentId", id);
    router.push(`/system/organizations?${params}`);
  }

  return (
    <div className="p-2">
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedId={id}
          expandedIds={expandedIds}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
