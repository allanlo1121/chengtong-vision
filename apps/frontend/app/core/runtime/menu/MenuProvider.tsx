// menu/MenuProvider.tsx
"use client";

import { MenuContext } from "./MenuContext";
import type { MenuNode } from "./types";

export function MenuProvider({
  children,
  initialMenus,
}: {
  children: React.ReactNode;
  initialMenus: MenuNode[];
}) {
  return <MenuContext.Provider value={initialMenus}>{children}</MenuContext.Provider>;
}
