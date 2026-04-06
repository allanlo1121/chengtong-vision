"use client";

import { useState, useEffect } from "react";

export function TreeNodeItem({ node, expandedIds, onSelect }: any) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const isExpanded = expandedIds.includes(node.id) || expanded;

  useEffect(() => {
    if (isExpanded && !loaded && node.hasChildren) {
      loadChildren();
    }
  }, [isExpanded]);

  async function loadChildren() {
    const res = await fetch(`/api/tree?parentId=${node.id}`);
    const json = await res.json();
    setChildren(json.data);
    setLoaded(true);
  }

  return (
    <div className="ml-2">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => {
          if (node.hasChildren) setExpanded(!expanded);
          onSelect(node);
        }}
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
              expandedIds={expandedIds}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
