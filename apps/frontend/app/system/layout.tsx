// app/system/layout.tsx
import { createClient } from "@/lib/infra/supabase/server";
import { Providers } from "@/app/providers";
import { RuntimeUser } from "@/lib/runtime/user/types";
import { buildMenuTree } from "@/lib/runtime/menu/buildMenuTree";
import { LayoutContent } from "@/components/layout/layout-content";

export default async function SystemLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  // 1️⃣ 查询 RuntimeUser
  const { data: runtimeUser } = await supabase
    .from("v_runtime_user")
    .select("*")
    .single<RuntimeUser>();

  if (!runtimeUser) {
    return <div>未绑定员工</div>;
  }

  // 2️⃣ 查询菜单（RLS 自动过滤）
  const { data: menus } = await supabase
    .schema("system")
    .from("menus")
    .select("*")
    .order("sort_order", { ascending: true });

  const menuTree = buildMenuTree(menus ?? []);

  return (
    <Providers runtimeUser={runtimeUser} menus={menuTree}>
      <LayoutContent>{children}</LayoutContent>
    </Providers>
  );
}
