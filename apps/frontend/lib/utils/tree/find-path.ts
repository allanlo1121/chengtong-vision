import { TreeIndex } from "@/modules/shared/tree/tree.types";
import { TreeNode } from "./types";

export function findPath<T>(index: TreeIndex<T>, id: string) {
  const path: any[] = [];

  let current: string | null = id;

  while (current) {
    const node = index.nodeMap.get(current);

    if (!node) break;

    path.unshift(node);

    current = index.parentMap.get(current) ?? null;
  }

  return path;
}
