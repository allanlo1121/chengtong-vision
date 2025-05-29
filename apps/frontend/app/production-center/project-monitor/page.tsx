import MonitorTable from "@/components/production-center/project-monitor/table";

import React from "react";
import { fetchInprogressTunnels } from "@/lib/project/tunnel/data";
import { fetchTbmAdvanceParams } from "@/lib/tbm/data";

export default async function Page() {
  const tunnels = await fetchInprogressTunnels();
  const tbmAdvanceParams = await fetchTbmAdvanceParams();

  return (
    <div>
      {" "}
      <MonitorTable tunnels={tunnels} tbmAdvanceParams={tbmAdvanceParams} />
    </div>
  );
}
