import { TunnelCenterDashboard } from "../../tunnels/_components/TunneCenterPage";
import { DashboardBackground } from "@/components/command-center/DashboardBackground";

export default async function Page() {
  return (
    <>
      <DashboardBackground />
      <TunnelCenterDashboard />
    </>
  );
}
