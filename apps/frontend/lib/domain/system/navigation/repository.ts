import { createClient } from "@/lib/infra/supabase/server";

import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { MenuScope, MenuTreeRow } from "./types";

// export async function getNavigationMenus(menuScope: string): Promise<MenuTreeRow[]> {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .schema("system")
//         .from("v_menu_tree")
//         .select("*")
//         .eq("menu_scope", menuScope)
//         .order("sort_order", { ascending: true });

//     assertNoError(error);
//     return data as MenuTreeRow[];
// }

export async function getMenusByScope(menuScope: MenuScope): Promise<MenuTreeRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("system")
    .from("v_menu_tree")
    .select("*")
    .eq("menu_scope", menuScope)
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (data ?? []) as MenuTreeRow[];
}
