// app/workspace/tunnels/[id]/_components/TunnelWorkspaceHeader.tsx

"use client";

import { useTunnelWorkspace } from "@/providers/workspace/TunnelWorkspaceProvider";

export function TunnelWorkspaceHeader() {
  const { scope } = useTunnelWorkspace();

  return (
    <div>
      <div className="text-sm text-muted-foreground ">{scope.projectName}</div>

      <h1 className="text-xl font-semibold">{scope.tunnelName}</h1>
    </div>
  );
}
