import { supabaseAdmin } from "../supabase-admin";

import { createAdminUser } from "./create-admin-user";

const VERSION = "1.0.0";

export async function runBootstrap() {
  console.log("Running bootstrap...");

  const supabase = supabaseAdmin;

  // 检查是否已初始化

  const { data, error } = await supabase
    .schema("system")
    .from("bootstrap_state")
    .select("completed")
    .eq("version", VERSION)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data?.completed) {
    console.log("System already initialized");

    return;
  }

  // 创建管理员

  const userId = await createAdminUser();

  console.log("Admin user id:", userId);

  // 调用数据库 bootstrap

  const { error: bootstrapError } = await supabase.rpc("bootstrap", {
    p_user_id: userId,
  });

  if (bootstrapError) {
    throw bootstrapError;
  }

  console.log("Bootstrap completed");
}
