"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Building2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { TreeNode } from "@/lib/utils/tree";

import type { OrganizationTreeItem } from "../../services";

interface Props {
  node: TreeNode;
  level?: number;
  selectedId?: string | null;
  expandedIds: Set<string>;
}

export function OrganizationTreeNode({ node, level = 0, selectedId, expandedIds }: Props) {
  // console.log("organization-tree node",node)

  const router = useRouter();
  const searchParams = useSearchParams();

  const hasChildren = node.children.length > 0;

  const expanded = expandedIds.has(node.id);

  const [open, setOpen] = useState(expanded);

  const toggle = () => {
    setOpen(!open);
  };

  const handleSelect = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("parentId", node.id);
    params.set("page", "1");

    router.replace(`/system/organizations?${params.toString()}`);
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-muted rounded ${
          selectedId === node.id ? "bg-muted" : ""
        }`}
        style={{ paddingLeft: level * 18 }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        ) : (
          <span className="w-4" />
        )}

        <Building2 className="h-4 w-4 text-muted-foreground" />

        <span className="text-sm">{node.name}</span>
      </div>

      {open &&
        node.children.map((child) => (
          <OrganizationTreeNode
            key={child.id}
            node={child}
            level={level + 1}
            selectedId={selectedId}
            expandedIds={expandedIds}
          />
        ))}
    </div>
  );
}
