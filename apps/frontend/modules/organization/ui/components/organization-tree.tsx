"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { OrganizationTreeNode } from "../components/organization-tree-node";
import { OrganizationTreeSearch } from "../components/organization-tree-search";

import { createTreeEngine, filterTree } from "@/lib/utils/tree";

import type { OrganizationTreeFlatNode } from "../../services";

interface Props {
  nodes: OrganizationTreeFlatNode[];
}

export function OrganizationTree({ nodes }: Props) {
  // console.log("organization-tree",nodes)

  const searchParams = useSearchParams();

  const parentId = searchParams.get("parentId");

  const [keyword, setKeyword] = useState("");

  /** TreeEngine */
  const treeEngine = useMemo(() => {
    return createTreeEngine(nodes);
  }, [nodes]);

  /** tree */
  const tree = treeEngine.tree;

  /** 搜索 */
  const filteredTree = useMemo(() => {
    if (!keyword) return tree;

    return filterTree(tree, (node) => node.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [tree, keyword]);

  /** 自动展开 */
  const expandedIds = useMemo(() => {
    return treeEngine.getExpandedIds(parentId);
  }, [treeEngine, parentId]);

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
