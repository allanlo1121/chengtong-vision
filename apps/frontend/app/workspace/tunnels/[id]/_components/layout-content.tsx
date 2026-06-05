"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/common/bread-crubms";
import { TunnelSwitcher } from "@/components/layout/tunnel-switcher";

import { useBreadcrumbContext } from "@/components/layout/breadcrumb-context";
import { Button } from "@/components/ui/button";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { breadcrumbs } = useBreadcrumbContext();

  return (
    <SidebarProvider className="h-screen flex">
      <AppSidebar />

      <SidebarInset className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />

          <Button variant="ghost" size="sm" asChild>
            <Link href={"/workspace/command-center/dashboard"}>
              <ArrowLeft />
              返回首页
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-4" />

          {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          <div className="flex-1" />
          <TunnelSwitcher />
        </header>

        <main className="flex-1 overflow-auto px-4 pt-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
