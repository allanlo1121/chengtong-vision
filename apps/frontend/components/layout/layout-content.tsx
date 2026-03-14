"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs, BreadcrumbItem } from "../common/bread-crubms";

export function LayoutContent({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <SidebarProvider className="h-screen flex">
      <AppSidebar />

      <SidebarInset className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-4" />

          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </header>

        <main className="flex-1 overflow-auto px-4 pt-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
