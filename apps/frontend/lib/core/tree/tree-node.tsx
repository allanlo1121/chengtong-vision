"use client";

import { TreeNode } from "./types";

interface TreeNodeItemProps {
  node: TreeNode;

  selectedId?: string;

  expandedIds?: Set<string>;

  onSelect?: (node: TreeNode) => void;

  onToggleExpand?: (node: TreeNode) => void;
}

export function TreeNodeItem({
  node,

  selectedId,

  expandedIds = new Set(),

  onSelect,

  onToggleExpand,
}: TreeNodeItemProps) {
  const isExpanded = expandedIds.has(node.id);

  const hasChildren = node.children && node.children.length > 0;

  // =====================================
  // select
  // =====================================

  function handleSelect() {
    onSelect?.(node);
  }

  // =====================================
  // expand
  // =====================================

  function handleToggleExpand(e: React.MouseEvent) {
    e.stopPropagation();

    onToggleExpand?.(node);
  }

  return (
    <div className="ml-1 text-sm">
      <div
        className={`
          flex items-center gap-1
          cursor-pointer
          py-1
          select-none
          ${selectedId === node.id ? "text-blue-500 font-bold" : ""}
        `}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            type="button"
            className="
              w-4
              text-xs
              shrink-0
            "
            onClick={handleToggleExpand}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        ) : (
          <span className="w-4" />
        )}

        <span>{node.name}</span>
      </div>

      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children &&
            node.children.map((child) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                selectedId={selectedId}
                expandedIds={expandedIds}
                onSelect={onSelect}
                onToggleExpand={onToggleExpand}
              />
            ))}
        </div>
      )}
    </div>
  );
}
