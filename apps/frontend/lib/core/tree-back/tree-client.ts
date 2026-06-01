import { createClient } from "@/lib/infra/supabase/client";
import { TreeEntity, TreeNodeRow } from "./types";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function getAllTreeRows(entity: TreeEntity = "organization"): Promise<TreeNodeRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("v_tree_nodes")
    .select("*")
    .eq("entity", entity)
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (data as TreeNodeRow[]) ?? [];
}
