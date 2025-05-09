import ProgressTable from "@/components/production-center/construction-progress/table";

import React from "react";
import { fetchInprogressTunnels } from "@/lib/project/tunnel/data";

export default async function Page() {
  const tunnels = await fetchInprogressTunnels();

  return (
    <div>
      {" "}
      <ProgressTable tunnels={tunnels} />
    </div>
  );
}
