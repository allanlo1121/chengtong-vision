// import { createClient } from "@/lib/infra/supabase/server";

// export async function getCurrentUserPermissions(): Promise<string[]> {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return [];

//   const { data, error } = await supabase
//     .from("v_user_permissions")
//     .select("permission_code")
//     .eq("user_id", user.id);

//   if (error || !data) return [];

//   return data.map((row) => row.permission_code);
// }
