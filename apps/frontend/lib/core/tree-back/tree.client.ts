import { createClient } from "@/lib/infra/supabase/client";
import { TreeEntity, TreeNode, TreeNodeRow } from "./types";
import { Result } from "@/modules/shared/contracts/service-result";
import { buildTreeFromRows } from "./build-tree-from-rows";
import { mapTreeNode } from "./map-tree-node";

export async function getTreeChildren(
  parentId: string,
  entity: TreeEntity
): Promise<Result<TreeNode[]>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("v_tree_nodes")
    .select("*")
    .eq("entity", entity)
    .eq("parent_id", parentId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching tree children:", error);
    return {
      success: false,
      message: "获取树子节点失败",
    };
  }
  const items = buildTreeFromRows(data as TreeNodeRow[], mapTreeNode);

  return {
    success: true,
    data: items ?? [],
  };
}
