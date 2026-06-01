"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { MenuNode } from "@/lib/domain/system/navigation";
import { resolveIcon } from "@/lib/domain/system/navigation/adapter";

export function getWorkspaceBase(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);

  // /workspace/tunnel/123/xxx
  if (parts[0] === "workspace" && parts.length >= 3) {
    return `/${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  return "";
}

export function resolveMenuPath(pathname: string, pathUrl?: string | null) {
  if (!pathUrl) return "#";

  // /dashboard、/proj/projects 这类平台绝对路径
  if (pathUrl.startsWith("/")) {
    return pathUrl;
  }

  // workspace 下的相对路径
  const workspaceBase = getWorkspaceBase(pathname);

  if (workspaceBase) {
    return `${workspaceBase}/${pathUrl}`;
  }

  // 非 workspace 下的兜底
  return `/${pathUrl}`;
}

function isPathActive(pathname: string, pathUrl: string) {
  if (pathUrl === "#") return false;

  return pathname === pathUrl || pathname.startsWith(`${pathUrl}/`);
}

export function NavMain({ items }: { items: MenuNode[] }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);

  const groupLabel = pathname.startsWith("/workspace") ? "Workspace" : "Platform";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const children = item.children ?? [];

          const isRouteOpen = children.some((subItem) => {
            const pathUrl = resolveMenuPath(pathname, subItem.pathUrl);
            return isPathActive(pathname, pathUrl);
          });

          const isOpen = isRouteOpen || openMenus.includes(item.id);
          const Icon = resolveIcon(item.icon);

          return (
            <Collapsible
              key={item.id}
              asChild
              open={isOpen}
              onOpenChange={(open) => {
                setOpenMenus((prev) =>
                  open
                    ? Array.from(new Set([...prev, item.id]))
                    : prev.filter((id) => id !== item.id)
                );
              }}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label}>
                    {Icon && <Icon />}
                    <span>{item.label}</span>

                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {children.map((subItem) => {
                      const pathUrl = resolveMenuPath(pathname, subItem.pathUrl);

                      const isActive = isPathActive(pathname, pathUrl);
                      const SubIcon = resolveIcon(subItem.icon);

                      return (
                        <SidebarMenuSubItem key={subItem.id} data-active={isActive}>
                          <SidebarMenuSubButton asChild isActive={isActive}>
                            <Link href={pathUrl}>
                              {SubIcon && <SubIcon />}
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
