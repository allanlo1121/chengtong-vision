// import { createClient } from "@/lib/infra/supabase/server";
// import { assertNoError } from "@/lib/infra/repositories/base.repository";
// import { TreeEntity, TreeNodeRow } from "./types";
// import { rpc } from "@/lib/core/db/rpc";

// export async function getTreeRows(
//   parentId?: string | null,
//   entity: TreeEntity = "organization"
// ): Promise<TreeNodeRow[]> {
//   // console.log(`Fetching tree rows for parentId: ${parentId}, entity: ${entity}`);

//   // 🌳 root
//   if (!parentId) {
//     return getRootTreeRows(entity);
//   }

//   const { data, error } = await rpc("tree_context_nodes", {
//     nodeId: parentId,
//     entity,
//   });

//   assertNoError(error);

//   return data ?? [];
// }

// export async function getRootTreeRows(entity: TreeEntity = "organization"): Promise<TreeNodeRow[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("v_tree_nodes")
//     .select("*")
//     .eq("entity", entity)
//     .is("parent_id", null)
//     .order("sort_order", { ascending: true });

//   assertNoError(error);

//   return (data as TreeNodeRow[]) ?? [];
// }
