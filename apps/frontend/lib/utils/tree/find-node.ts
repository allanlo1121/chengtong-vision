import { TreeIndex } from "@/modules/shared/tree/tree.types";

export function findNode<T>(index: TreeIndex<T>, id: string) {
  return index.nodeMap.get(id);
}
