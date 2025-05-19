import ProgressTable from "@/components/production-center/construction-progress/table";

import React from "react";
import { fetchInprogressTunnels,ensureTodayProgressRecord } from "@/lib/project/tunnel/data";

export default async function Page() {
  const tunnels = await fetchInprogressTunnels();
  //const progress =await ensureTodayProgressRecord("8a207206-810d-4bab-8398-9b4bd569bcc8")
// 👇 循环每个 tunnel 查进度，并合并字段
const enrichedTunnels = await Promise.all(
  tunnels.map(async (tunnel) => {
    const progress = await ensureTodayProgressRecord(tunnel.id);

    return {
      ...tunnel,
      dayRingStart: progress?.ring_start ?? null,
      dayOpNumStart: progress?.op_num_start ?? null,
      dayPlanRingCount: progress?.plan_ring_count ?? null,
    };
  })
);
//console.log("enrichedTunnels", enrichedTunnels);



  return (
    <div>
      {" "}
      <ProgressTable tunnels={enrichedTunnels} />
    </div>
  );
}
