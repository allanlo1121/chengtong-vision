//tree-container.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tree } from "./tree";
import { useTreeRuntime } from "./use-tree-runtime";
import { TreeNode, TreeKey, TREE_QUERY_KEYS } from "./types";

export function TreeContainer({ treeKey }: { treeKey: TreeKey }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const queryKey = TREE_QUERY_KEYS[treeKey];

  const selectedId = searchParams.get(queryKey) ?? undefined;

  const { treeData, loading, expandedIds, setExpandedIds, toggleExpand, setTreeData } =
    useTreeRuntime({
      treeKey,
      selectedId,
    });
  // console.log("TreeContainer render", { treeKey, selectedId, treeData, loading, expandedIds });
  // =====================================
  // select
  // =====================================

  function handleSelect(node: TreeNode) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(queryKey, node.id);

    router.replace(`?${params.toString()}`);
  }

  return (
    <Tree
      data={treeData}
      selectedId={selectedId}
      expandedIds={expandedIds}
      loading={loading}
      onSelect={handleSelect}
      onToggleExpand={toggleExpand}
    />
  );
}
