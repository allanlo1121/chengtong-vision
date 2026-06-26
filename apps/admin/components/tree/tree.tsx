"use client";

import { TreeProps } from "./types";
import { TreeNodeItem } from "./tree-node";

export function Tree({ data, selectedId, expandedIds, loadingIds, onSelect, onExpand }: TreeProps) {
  // console.log("Tree", data);

  return (
    <div className="space-y-1">
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          expandedIds={expandedIds}
          loadingIds={loadingIds}
          onSelect={onSelect}
          onExpand={onExpand}
        />
      ))}
    </div>
  );
}
