"use client";

import { TreeNode } from "@/lib/core/tree/types";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Props {
  node: TreeNode;
  selectedId?: string;
  loadingIds?: Set<string>;
  expandedIds?: Set<string>;

  onSelect?: (node: TreeNode) => void;
  onExpand?: (node: TreeNode) => void;
}

export function TreeNodeItem({
  node,
  selectedId,
  loadingIds,
  expandedIds,
  onSelect,
  onExpand,
}: Props) {
  const isSelected = node.id === selectedId;
  const isLoading = loadingIds?.has(node.id);
  const isExpanded = expandedIds?.has(node.id);

  return (
    <div>
      {/* 🔹 行 */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer
          ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}`}
        onClick={() => onSelect?.(node)}
      >
        {/* ▶ 展开按钮 */}
        {node.hasChildren ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.(node);
            }}
            className="w-4 h-4 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="text-xs">...</span>
            ) : isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        ) : (
          <span className="w-4" />
        )}

        {/* 🏷 名称 */}
        <span>{node.name}</span>
      </div>

      {/* 🔽 children */}
      {isExpanded && node.children && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              loadingIds={loadingIds}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onExpand={onExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}
