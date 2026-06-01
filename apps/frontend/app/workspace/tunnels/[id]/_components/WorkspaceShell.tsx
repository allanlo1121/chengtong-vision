// app/workspace/tunnels/[id]/_components/WorkspaceShell.tsx
"use client";

import type { ReactNode } from "react";
import type { MenuNode } from "@/lib/domain/system/navigation";
import type { RuntimeUser } from "@/lib/domain/system/types";

import { Providers } from "@/app/providers";
import { BreadcrumbProvider } from "@/components/layout/breadcrumb-context";
import { cn } from "@/lib/core/utils";

import { TunnelWorkspaceHeader } from "./TunnelWorkspaceHeader";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { WorkspaceTopBar } from "./WorkspaceTopBar";

interface WorkspaceShellProps {
  children: ReactNode;
  runtimeUser: RuntimeUser;
  menus: MenuNode[];
  className?: string;
}

export function WorkspaceShell({ children, runtimeUser, menus, className }: WorkspaceShellProps) {
  return (
    <Providers runtimeUser={runtimeUser} menus={menus}>
      <BreadcrumbProvider>
        <div className={cn("flex h-screen min-h-0 w-full bg-background", className)}>
          <WorkspaceSidebar menus={menus} />

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-4">
            <WorkspaceTopBar />
            <TunnelWorkspaceHeader />

            <main className="min-h-0 flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </BreadcrumbProvider>
    </Providers>
  );
}
