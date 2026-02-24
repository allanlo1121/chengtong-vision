import { createClient } from "@supabase/supabase-js";

export async function runBootstrap() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 👈 只在服务器环境存在
  );

  const { error } = await supabase.rpc("bootstrap");

  if (error) {
    throw new Error(error.message);
  }
}
