"use client";

import { createClient } from "@/lib/infra/supabase/client";
import { TreeRow, TreeNode, TreeKey } from "./types";

import { buildTree } from "./build-tree";

export async function getAllTrees(treeKey: TreeKey): Promise<TreeRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("system")
    .from("v_tree_nodes")
    .select("*")
    .eq("tree_key", treeKey);

  console.log("[getAllTrees]", { treeKey, data, error });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export const treeRepository = {
  // =====================================================
  // children
  // =====================================================

  async getChildren(
    treeKey: TreeKey,

    parentId: string | undefined = undefined
  ): Promise<TreeRow[]> {
    const supabase = createClient();

    const { data, error } = await supabase.schema("system").rpc("tree_get_children", {
      p_tree_key: treeKey,

      p_parent_id: parentId,
    });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  // =====================================================
  // ancestors
  // =====================================================

  async getAncestors(
    treeKey: TreeKey,

    id: string
  ): Promise<TreeRow[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.schema("system").rpc("tree_get_ancestors", {
      p_tree_key: treeKey,

      p_id: id,
    });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  // =====================================================
  // validate
  // =====================================================

  async validate(treeKey: TreeKey): Promise<
    {
      id: string;
      issue: string;
    }[]
  > {
    const supabase = await createClient();

    const { data, error } = await supabase.schema("system").rpc("tree_validate", {
      p_tree_key: treeKey,
    });

    if (error) {
      throw error;
    }

    return data ?? [];
  },

  // =====================================================
  // rebuild
  // =====================================================

  async rebuild(treeKey: TreeKey): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.schema("system").rpc("tree_rebuild", {
      p_tree_key: treeKey,
    });

    if (error) {
      throw error;
    }
  },

  // =====================================================
  // move node
  // =====================================================

  // async moveNode(
  //     treeKey: TreeKey,

  //     id: string,

  //     newParentId: string | null,
  // ): Promise<void> {

  //     const supabase =
  //         await createClient();

  //     const { error } =
  //         await supabase
  //             .schema("system")
  //             .rpc(
  //                 "tree_move_node",
  //                 {
  //                     p_tree_key: treeKey,

  //                     p_id: id,

  //                     p_new_parent_id:
  //                         newParentId,
  //                 }
  //             );

  //     if (error) {
  //         throw error;
  //     }
  // },

  // =====================================================
  // delete node
  // =====================================================

  async deleteNode(
    treeKey: TreeKey,

    id: string
  ): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.schema("system").rpc("tree_delete_node", {
      p_tree_key: treeKey,

      p_id: id,
    });

    if (error) {
      throw error;
    }
  },

  // =====================================================
  // subtree
  // =====================================================

  async getSubtree(
    treeKey: TreeKey,

    id: string
  ): Promise<TreeNode[]> {
    const rows = await this.getAncestors(treeKey, id);

    return buildTree(rows);
  },
};
