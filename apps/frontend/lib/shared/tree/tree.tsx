"use client";

import { TreeNodeItem } from "./tree-node";

import { TreeProps } from "./types";

export function Tree({
  data,
  selectedId,
  expandedIds,
  loading,
  onSelect,
  onToggleExpand,
}: TreeProps) {
  // =====================================
  // loading
  // =====================================

  if (loading) {
    return (
      <div
        className="
          p-2
          text-sm
          text-muted-foreground
        "
      >
        Loading...
      </div>
    );
  }

  // =====================================
  // empty
  // =====================================

  if (data.length === 0) {
    return (
      <div
        className="
          p-2
          text-sm
          text-muted-foreground
        "
      >
        No data
      </div>
    );
  }

  // =====================================
  // tree
  // =====================================

  return (
    <div className="space-y-1">
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          expandedIds={expandedIds}
          onSelect={onSelect}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
}
