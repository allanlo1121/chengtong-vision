"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { TreeNodeComponent } from "./tree-node";
import { filterTree, getPaths } from "./utils";
import { TreeProps } from "@/lib/master-data/master-data-tree.types";

export function Tree({
  nodes,
  searchable = true,
  includeChildrenOnSearch = true,
  selectedId,
  onSelect,
}: TreeProps) {
  const [keyword, setKeyword] = useState("");

  // 搜索
  const filteredNodes = useMemo(
    () => filterTree(nodes, keyword, includeChildrenOnSearch),
    [nodes, keyword, includeChildrenOnSearch]
  );

  // 搜索自动展开路径
  const forceOpen = keyword.trim().length > 0;

  return (
    <div className="space-y-2">
      {searchable && (
        <Input placeholder="搜索..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      )}

      <div className="space-y-1">
        {filteredNodes.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
            forceOpen={forceOpen}
          />
        ))}
      </div>
    </div>
  );
}
