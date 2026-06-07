import { getAllTrees } from "./tree.repository";
import { Result } from "@/lib/shared/contracts";
import { buildTree } from "./build-tree";

import { TreeKey, TreeNode } from "./types";

export const treeService = {
  // =====================================
  // get tree
  // =====================================

  async getTreeNodes(treeKey: TreeKey): Promise<Result<TreeNode[]>> {
    try {
      // flat rows

      const rows = await getAllTrees(treeKey);

      // build tree

      const tree = buildTree(rows);

      return {
        success: true,
        data: tree,
      };
    } catch (error) {
      console.error("[treeService.getTreeNodes]", error);

      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to load tree",
      };
    }
  },
};
