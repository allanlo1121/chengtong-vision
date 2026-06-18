// app/(platform)/command-center/page.tsx

import { DashboardBackground } from "@/components/command-center/DashboardBackground";
import { CommandCenterDashboard } from "./_components/CommandCenterPage";

export default async function CommandCenterDashboardPage() {
  // const summary = await fetchCommandCenterSummary();

  // return <div>111</div>

  return (
    <>
      <DashboardBackground />
      <CommandCenterDashboard />
    </>
  );
}
