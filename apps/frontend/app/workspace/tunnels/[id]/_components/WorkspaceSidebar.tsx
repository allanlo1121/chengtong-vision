// app/workspace/tunnels/[id]/_components/WorkspaceSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

import * as LucideIcons from "lucide-react";

import type { MenuNode } from "@/lib/domain/system/navigation";
import { cn } from "@/lib/core/utils";

interface WorkspaceSidebarProps {
  menus: MenuNode[];
}

export function WorkspaceSidebar({ menus }: WorkspaceSidebarProps) {
  const pathname = usePathname();

  const params = useParams<{ id: string }>();

  const tunnelId = params.id;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-card">
      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold">Tunnel Workspace</div>

        <div className="text-xs text-muted-foreground">隧道业务工作台</div>
      </div>

      <nav className="flex-1 space-y-1 overflow-auto p-2">
        {menus.map((menu) => {
          const href = (menu.pathUrl ?? "#").replace(":id", tunnelId);

          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          const Icon = menu.icon
            ? (LucideIcons[menu.icon as keyof typeof LucideIcons] as React.ComponentType<{
                className?: string;
              }>)
            : null;

          return (
            <Link
              key={menu.id}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}

              <span className="truncate">{menu.label ?? menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
