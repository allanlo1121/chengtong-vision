"use client";

import { useCallback, useEffect, useState } from "react";

import { TreeKey } from "./types";

import { TreeNode } from "./types";

import { treeService } from "./tree.service";

interface UseTreeRuntimeOptions {
  treeKey: TreeKey;

  selectedId?: string;
}

export function useTreeRuntime({ treeKey }: UseTreeRuntimeOptions) {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(false);

  // =====================================
  // bootstrap
  // =====================================

  useEffect(() => {
    bootstrap();
  }, [treeKey]);

  async function bootstrap() {
    setLoading(true);

    try {
      const res = await treeService.getTreeNodes(treeKey);

      if (!res.success) {
        return;
      }

      setTreeData(res.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  // =====================================
  // expand
  // =====================================

  const toggleExpand = useCallback((node: TreeNode) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      if (next.has(node.id)) {
        next.delete(node.id);
      } else {
        next.add(node.id);
      }

      return next;
    });
  }, []);

  return {
    treeData,

    loading,

    expandedIds,

    setExpandedIds,

    toggleExpand,

    setTreeData,
  };
}
