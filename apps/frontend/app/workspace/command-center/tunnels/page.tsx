import { fetchCommandCenterTunnel } from "@/lib/domain/command-center/server.service";
import React from "react";
import { TunnelCenterDashboard } from "../../tunnels/_components/TunneCenterPage";

export default async function Page() {
  const tunnel = await fetchCommandCenterTunnel();
  console.log("Tunnel command data", tunnel);

  return <TunnelCenterDashboard initialTunnelsRuntimeData={tunnel} />;
}
