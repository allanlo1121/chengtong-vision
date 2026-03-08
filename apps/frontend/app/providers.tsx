"use client";

import { RuntimeProvider } from "@/lib/runtime/RuntimeProvider";
import { RuntimeUser } from "@/lib/runtime/user/types";
import { MenuNode } from "@/lib/runtime/menu/types";

export function Providers({
  children,
  runtimeUser,
  menus,
}: {
  children: React.ReactNode;
  runtimeUser: RuntimeUser;
  menus: MenuNode[];
}) {
  return (
    <RuntimeProvider runtimeUser={runtimeUser} menus={menus}>
      {children}
    </RuntimeProvider>
  );
}
