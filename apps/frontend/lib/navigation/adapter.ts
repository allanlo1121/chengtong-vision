import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MenuNode } from "@/app/core/runtime/menu/types";
import type { NavMainItem } from "./types";

function resolveIcon(iconName: string | null): LucideIcon | undefined {
  if (!iconName) return undefined;

  const icon = Icons[iconName as keyof typeof Icons];

  return icon as LucideIcon | undefined;
}

export function mapMenuToNav(menus: MenuNode[]): NavMainItem[] {
  return menus.map((menu) => ({
    title: menu.label,
    url: menu.path ?? "#",
    icon: resolveIcon(menu.icon),
    items: menu.children ? mapMenuToNav(menu.children) : undefined,
  }));
}
