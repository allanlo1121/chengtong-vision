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

      // console.log(
      //   "flat rows",
      //   rows.length,
      //   rows.map((x) => ({
      //     id: x.id,
      //     name: x.name,
      //     parentId: x.parent_id,
      //   }))
      // );

      // build tree

      const tree = buildTree(rows);
      // console.log(
      //   "tree roots",
      //   tree.map((x) => ({
      //     id: x.id,
      //     name: x.name,
      //     parentId: x.parentId,
      //   }))
      // );

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
