"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { TreeNode as Node } from "@/lib/master-data/master-data-tree.types";

export function TreeNodeComponent({
  node,
  level,
  selectedId,
  onSelect,
  forceOpen = false, //搜索自动展开
}: {
  node: Node;
  level: number;
  selectedId?: string | null;
  onSelect?: (node: Node) => void;
  forceOpen?: boolean;
}) {
  const hasChildren = node.children && node.children.length > 0;

  // 🌟 每个节点自己的展开状态
  const [open, setOpen] = useState(false);

  const realOpen = forceOpen || open;

  return (
    <div>
      <div
        className={cn(
          "flex items-center px-2 py-1 cursor-pointer rounded-md select-none",
          selectedId === node.id ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => onSelect?.(node)} // ★ 所有节点可跳转
      >
        {/* 展开箭头 */}
        {hasChildren ? (
          <button
            type="button"
            aria-label={realOpen ? "Collapse" : "Expand"}
            className="mr-1"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!realOpen);
              onSelect?.(node);
            }}
          >
            <ChevronRight className={cn("transition-transform", realOpen && "rotate-90")} />
          </button>
        ) : (
          <span className="w-4 mr-1" />
        )}

        {/* 文本 */}
        <span className="text-xs">{node.name}</span>

        {/* 数量 badge */}
        {node.count !== undefined && (
          <span className="ml-auto text-xs text-gray-400">{node.count}</span>
        )}
      </div>

      {/* 子节点 */}
      {hasChildren && realOpen && (
        <div>
          {node.children?.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              forceOpen={forceOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
