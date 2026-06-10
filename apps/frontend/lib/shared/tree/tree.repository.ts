"use client";

import { createClient } from "@/lib/infra/supabase/client";
import { TreeRow, TreeKey } from "./types";

export async function getAllTrees(treeKey: TreeKey): Promise<TreeRow[]> {
  const supabase = createClient();

  const pageSize = 1000; // adjust as needed
  let page = 0;
  let allData: TreeRow[] = [];

  while (true) {
    const { data, error } = await supabase
      .schema("system")
      .from("v_tree_nodes")
      .select("*")
      .eq("tree_key", treeKey)
      .range(page * pageSize, (page + 1) * pageSize - 1);

    // console.log(`[getAllTrees] page ${page}`, { treeKey, data, error });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      break;
    }

    allData = allData.concat(data);
    page++;
  }

  return allData ?? [];
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
