"use client";

import { useEffect, useState } from "react";
import { OrganizationTreeNode } from "../../types";

export function TreeNodeItem({ node, selectedId, expandedIds, onSelect }: any) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<OrganizationTreeNode[]>([]);
  const [loaded, setLoaded] = useState(false);

  // ⭐ 是否应该展开（来自 URL path）
  const isExpanded = expandedIds.includes(node.id) || expanded;

  // ⭐ 自动加载 children
  useEffect(() => {
    if (isExpanded && !loaded && node.hasChildren) {
      loadChildren();
    }
  }, [isExpanded]);

  async function loadChildren() {
    const res = await fetch(`/api/tree?source=organization&parentId=${node.id}`);
    const json = await res.json();

    setChildren(json.data);
    setLoaded(true);
  }

  function handleClick() {
    onSelect(node.id);
    if (node.hasChildren) {
      setExpanded((prev) => !prev);
    }
  }

  return (
    <div className="ml-2">
      <div
        className={`cursor-pointer flex items-center ${
          selectedId === node.id ? "text-blue-600 font-bold" : ""
        }`}
        onClick={handleClick}
      >
        {node.hasChildren && (isExpanded ? "▼" : "▶")}
        {node.name}
      </div>

      {isExpanded && (
        <div className="ml-4">
          {children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
