import React from "react";
import TbmOverviewCard from "@/components/tbm/dashboard/TbmOverviewCard";
import { fetchActivatedTbms } from "@/lib/tbm/data";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { fetchInprogressTunnels } from "@/lib/resource-center/tunnel/data";

export default async function Page() {
  // 获取已激活的 TBM 数据
  // const data = await fetchActivatedTbms();
  // const subProjectData = await fetchActivatedSubProjects();

  const data = await fetchInprogressTunnels();

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // 数据加载中状态
  }

  // const areaOptions = [
  //   "所有地区",
  //   ...new Set(subProjectData.map((item) => item.region)),
  // ];

  // console.log(areaOptions);

  console.log("data", data); // 调试输出数据

//   const filtered = data.filter(item => item.tbmId !== null);

// console.log(filtered);

  return (
    <div className="w-full h-full  px-8 grid grid-cols-4 items-center justify-start bg-gray-800 text-gray-100">
      <div className="w-full h-8 flex flex-row bg-gray-200">
        {/* <Select onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择区域" />
          </SelectTrigger>
          <SelectContent>
            {areaOptions.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        {/* 状态筛选 */}
        {/* <Select onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="盾构机状态" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      {/* 动态渲染每个  TbmOverviewCard 组件 */}
      {/* {data.map((item) => (
        <TbmOverviewCard
          key={item.tbm_id}
          tbmId={item.tbm_id}
          subProjectId={item.sub_project_id}
        />
      ))} */}
    </div>
  );
}
