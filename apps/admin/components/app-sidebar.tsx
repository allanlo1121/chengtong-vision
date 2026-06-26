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

import { useMenu } from "@/lib/runtime/menu/useMenu";
import { useAppContext } from "@/lib/runtime/appContext/useAppContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menus = useMenu();
  const appContext = useAppContext();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={appContext.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
        <NavProjects projects={appContext.favoriteProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={appContext.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
