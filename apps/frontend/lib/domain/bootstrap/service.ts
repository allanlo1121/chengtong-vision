// lib/modules/bootstrap/service.ts
"use server";

import { createAdminClient } from "@/lib/infra/supabase/adminSupabase";
import { createAdminUser } from "./auth";

const VERSION = "1.0.0";

export async function runBootstrap() {
  console.log("runBootstrap");

  const supabase = createAdminClient();

  // 1️⃣ 查是否已完成
  const { data } = await supabase
    .from("system.bootstrap_state")
    .select("completed")
    .eq("version", VERSION)
    .maybeSingle();

  if (data?.completed) {
    return;
  }

  // 2️⃣ 创建 admin 用户
  const userId = await createAdminUser();

  console.log("admin user created with id:", userId);

  // 3️⃣ 调数据库 bootstrap
  const { error } = await supabase.rpc("bootstrap", {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }
}
