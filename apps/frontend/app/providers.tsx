"use client";

import { RuntimeProvider } from "@/app/core/runtime/RuntimeProvider";
import { RuntimeUser } from "@/app/core/runtime/user/types";
import { MenuNode } from "./core/runtime/menu/types";

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
