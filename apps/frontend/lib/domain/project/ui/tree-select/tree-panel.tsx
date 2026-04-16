"use client";

import { useState } from "react";
import { TreeNodeItem } from "./tree-node-item";

export function TreePanel({ expandedIds, onSelect }: any) {
  const [nodes, setNodes] = useState([]);

  async function loadRoot() {
    const res = await fetch(`/api/tree?parentId=`);
    const json = await res.json();
    setNodes(json.data);
  }

  return (
    <div>
      {nodes.map((node) => (
        <TreeNodeItem key={node.id} node={node} expandedIds={expandedIds} onSelect={onSelect} />
      ))}
    </div>
  );
}
