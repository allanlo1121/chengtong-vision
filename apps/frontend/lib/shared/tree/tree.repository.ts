"use client";

import { createClient } from "@/lib/infra/supabase/client";
import { TreeRow, TreeKey } from "./types";

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

  async getChildren() {
    console.log("getChildren is not implemented yet");
  },

  // =====================================================
  // ancestors
  // =====================================================

  async getAncestors() {
    console.log("getAncestors is not implemented yet");
  },

  // =====================================================
  // validate
  // =====================================================

  async validate() {
    console.log("validate is not implemented yet");
  },

  // =====================================================
  // rebuild
  // =====================================================

  async rebuild() {
    console.log("rebuild is not implemented yet");
  },

  async deleteNode() {
    console.log("deleteNode is not implemented yet");
  },

  // =====================================================
  // subtree
  // =====================================================

  async getSubtree() {
    console.log("getSubtree is not implemented yet");
  },
};
