import { fetchCommandCenterTunnel } from "@/lib/domain/command-center/server.service";
import React from "react";
import { TunnelCenterDashboard } from "../../tunnels/_components/TunneCenterPage";

export default async function Page() {
  const tunnel = await fetchCommandCenterTunnel();

  return <TunnelCenterDashboard initialTunnelsRuntimeData={tunnel} />;
}
