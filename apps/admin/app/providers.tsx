"use client";

import { RuntimeProvider } from "@/lib/runtime/RuntimeProvider";
import { RuntimeUser } from "@/lib/domain/system/types";
import { MenuNode } from "@/lib/domain/system/navigation";
import { AppContextType } from "@/lib/domain/system/appContext/types";

export function Providers({
  children,
  runtimeUser,
  appContext,
  menus,
}: {
  children: React.ReactNode;
  runtimeUser: RuntimeUser;
  appContext: AppContextType;
  menus: MenuNode[];
}) {
  return (
    <RuntimeProvider runtimeUser={runtimeUser} menus={menus} appContext={appContext}>
      {children}
    </RuntimeProvider>
  );
}
