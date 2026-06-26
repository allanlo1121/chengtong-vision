import { supabaseAdmin } from "../supabase-admin";

export async function createAdminUser(): Promise<string> {
  const supabase = supabaseAdmin;

  const email = process.env.ADMIN_EMAIL;

  const password = process.env.ADMIN_PASSWORD;

  console.log("Creating admin user with email:", email);
  console.log("Using password:", password);

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  // 查询是否已存在

  const { data: users, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    throw listError;
  }

  const existing = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (existing) {
    console.log("Admin user already exists");

    return existing.id;
  }

  // 创建管理员

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw error ?? new Error("Failed to create admin user");
  }

  console.log("Admin user created");

  return data.user.id;
}
