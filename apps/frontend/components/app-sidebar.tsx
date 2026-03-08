"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { menuData } from "@/lib/navigation/menu-data";
import { useMenu } from "@/lib/runtime/menu/useMenu";
import { useMemo } from "react";
import { mapMenuToNav } from "@/lib/navigation/adapter";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menus = useMenu();
  const navItems = useMemo(() => mapMenuToNav(menus), [menus]);
  // console.log("navItems",navItems);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={menuData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects projects={menuData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={menuData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
