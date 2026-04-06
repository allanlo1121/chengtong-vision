import { useState, useEffect } from "react";

export function useTreeSelect(value?: string) {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  /** 回显：根据 value 获取 path */
  useEffect(() => {
    if (!value) return;

    fetch(`/api/tree/node?id=${value}`)
      .then((res) => res.json())
      .then((node) => {
        setSelectedNode(node);

        if (node?.path) {
          setExpandedIds(node.path.split("."));
        }
      });
  }, [value]);

  return {
    selectedNode,
    expandedIds,
    setSelectedNode,
  };
}
