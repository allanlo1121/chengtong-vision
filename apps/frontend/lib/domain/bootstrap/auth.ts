// lib/modules/bootstrap/auth.ts
"use server";

import { createAdminClient } from "@/lib/core/supabase/adminSupabase";

export async function createAdminUser() {
  const supabase = createAdminClient();

  // 先检查是否已存在
  const { data: existing } = await supabase.auth.admin.listUsers();

  const found = existing?.users.find((u) => u.email === "admin@system.local");

  if (found) {
    return found.id;
  }

  // 创建用户
  const { data, error } = await supabase.auth.admin.createUser({
    email: "admin@system.local",
    password: "Admin123456",
    email_confirm: true,
  });

  if (error) {
    throw error;
  }

  return data.user.id;
}
