import React from "react";
import { ThrustScreen } from "@/components/tbm/monitor/ThrustScreen";
import {
  fetchSubProjectByTbmcode,
  fetchTbmInfoByTbmcode,
} from "@/lib/tbm/tbm-data"; // 引入 tbmData01 数据

export default async function Page() {
  const tbmcode = "crec988";
  const tbmInfo = await fetchTbmInfoByTbmcode(tbmcode); // 获取 TBM 信息
  const subProject = await fetchSubProjectByTbmcode(tbmcode); // 获取子项目数据
  return (
    <div>
      <ThrustScreen
        tbmcode={tbmcode}
        tbmInfo={tbmInfo}
        subProject={subProject}
      />
    </div>
  );
}
