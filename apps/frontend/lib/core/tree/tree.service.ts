import { mapTreeNode } from "./map-tree-node";
import { getTreeRows } from "./tree.repository";
import { Result } from "@/modules/shared/contracts";
import { TreeEntity, TreeNode } from "./types";

export async function getTreeNodes(
  parentId: string | null = null,
  entity: TreeEntity = "organization"
): Promise<Result<TreeNode[]>> {
  try {
    const rows = await getTreeRows(parentId, entity);

    const items = rows.map(mapTreeNode);

    return {
      success: true,
      data: items ?? [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "获取树节点失败",
    };
  }
}
