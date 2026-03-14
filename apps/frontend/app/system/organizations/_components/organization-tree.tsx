"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { OrganizationTreeNode } from "../components/organization-tree-node";
import { OrganizationTreeSearch } from "../components/organization-tree-search";

import { findPath, filterTree, TreeNode } from "@/lib/utils/tree";
import { OrganizationTreeItem } from "../types";

interface Props {
  tree: TreeNode<OrganizationTreeItem>[];
}

export function OrganizationTree({ tree }: Props) {
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState("");

  const parentId = searchParams.get("parentId");

  const filteredTree = useMemo(() => {
    if (!keyword) return tree;

    return filterTree(tree, (node) => node.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [tree, keyword]);

  const expandedIds = useMemo(() => {
    if (!parentId) return new Set<string>();

    const path = findPath(tree, parentId);

    if (!path) return new Set<string>();

    return new Set<string>(path.map((n) => n.id));
  }, [tree, parentId]);

  return (
    <div className="h-full flex flex-col">
      <OrganizationTreeSearch value={keyword} onChange={setKeyword} />

      <div className="flex-1 overflow-auto">
        {filteredTree.map((node) => (
          <OrganizationTreeNode
            key={node.id}
            node={node}
            selectedId={parentId}
            expandedIds={expandedIds}
          />
        ))}
      </div>
    </div>
  );
}
