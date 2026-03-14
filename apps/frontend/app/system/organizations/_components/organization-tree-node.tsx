"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Building2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { TreeNode } from "@/lib/utils/tree";

import type { OrganizationTreeItem } from "../types";

interface Props {
  node: TreeNode<OrganizationTreeItem>;
  level?: number;
  selectedId?: string | null;
  expandedIds?: Set<string>;
  onSelect?: (id: string) => void;
}

export function OrganizationTreeNode({
  node,
  level = 0,
  selectedId,
  expandedIds,
  onSelect,
}: Props) {
  const [expanded, setExpanded] = useState(expandedIds?.has(node.id) ?? level === 0); // 根节点默认展开
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasChildren = node.children.length > 0;

  //Tree 自动滚动到选中节点
  const nodeRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  const handleSelect = () => {
    onSelect?.(node.id);
    const params = new URLSearchParams(searchParams.toString());

    params.set("parentId", node.id);
    params.set("page", "1");

    router.replace(`/system/organizations?${params.toString()}`);
  };

  useEffect(() => {
    if (selectedId === node.id && nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId, node.id]);

  return (
    <div ref={nodeRef}>
      {/* 当前节点 */}
      <div
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-muted rounded ${
          Boolean(selectedId) && selectedId === node.id ? "bg-muted" : ""
        }`}
        style={{ paddingLeft: level * 20 }}
        onClick={handleSelect}
      >
        {/* 展开按钮 */}
        {hasChildren ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        ) : (
          <span className="w-4" />
        )}

        <Building2 className="h-4 w-4 text-muted-foreground" />

        <span className="text-sm">{node.name}</span>
      </div>

      {/* 子节点 */}
      {expanded &&
        node.children.map((child) => (
          <OrganizationTreeNode
            key={child.id}
            node={child}
            level={level + 1}
            selectedId={selectedId}
            expandedIds={expandedIds}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}
