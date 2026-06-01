// app/workspace/tunnels/[id]/_components/TunnelWorkspaceHeader.tsx

"use client";

import { useTunnelWorkspace } from "@/providers/workspace/TunnelWorkspaceProvider";

export function TunnelWorkspaceHeader() {
  const { tunnel } = useTunnelWorkspace();

  return (
    <div>
      <div className="text-sm text-muted-foreground ">{tunnel.projectName}</div>

      <h1 className="text-xl font-semibold">{tunnel.name}</h1>
    </div>
  );
}
