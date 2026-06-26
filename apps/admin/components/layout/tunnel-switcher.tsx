"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, Route } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useTunnelWorkspace } from "@/providers/workspace/TunnelWorkspaceProvider";

export function TunnelSwitcher() {
  const router = useRouter();
  const { tunnelOptions: tunnels, scope: activeTunnel } = useTunnelWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 gap-2 px-3">
          <Route className="h-4 w-4" />

          <span className="max-w-[220px] truncate">{activeTunnel.tunnelName}</span>

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[320px]">
        {tunnels.map((tunnel) => (
          <DropdownMenuItem
            key={tunnel.tunnelId}
            onClick={() => {
              router.push(`/workspace/tunnels/${tunnel.tunnelId}`);
            }}
          >
            <div className="flex flex-col">
              <span>{tunnel.tunnelName}</span>

              <span className="text-xs text-muted-foreground">{tunnel.projectName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
