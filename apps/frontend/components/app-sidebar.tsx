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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={menuData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
        <NavProjects projects={menuData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={menuData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
