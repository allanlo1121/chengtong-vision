// menu/MenuProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { MenuContext } from "./MenuContext";
import { createClient } from "@/lib/core/supabase/client";
import { buildTree } from "./buildTree";
import type { MenuNode } from "./types";

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<MenuNode[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("menus")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setMenus(buildTree(data as MenuNode[]));
        }
      });
  }, []);

  return <MenuContext.Provider value={menus}>{children}</MenuContext.Provider>;
}
