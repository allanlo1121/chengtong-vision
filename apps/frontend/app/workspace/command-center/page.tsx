// app/(platform)/command-center/page.tsx

import { DashboardBackground } from "@/components/command-center/DashboardBackground";
import { CommandCenterDashboard } from "./_components/CommandCenterPage";

import { fetchCommandCenterSummary } from "@/lib/domain/command-center/server.service";

export default async function CommandCenterDashboardPage() {
  const summary = await fetchCommandCenterSummary();

  // return <div>111</div>

  return (
    <>
      <DashboardBackground />
      <CommandCenterDashboard initialSummary={summary} />
    </>
  );
}
