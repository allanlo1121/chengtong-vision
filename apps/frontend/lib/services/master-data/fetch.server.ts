// src/services/master-data/fetch.ts
// import { createClient } from "@frontend/lib/supabase/server";
// import type { MasterDataType } from "@frontend/constants/master-data-type";

// export async function fetchMasterOptions(type: MasterDataType) {
//     const supabase = await createClient();
//     const { data, error } = await supabase
//         .from("v_master_options")
//         .select("id, name")
//         .eq("type_code", type)
//         .order("sort_order");

//     if (error) throw error;
//     return data ?? [];
// }
