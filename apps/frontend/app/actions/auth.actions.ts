// app/actions/auth.actions.ts
"use server";

import { createClient } from "@/lib/infra/supabase/server";

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
