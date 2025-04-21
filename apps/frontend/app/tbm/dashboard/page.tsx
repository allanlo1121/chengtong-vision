import React from "react";
import TbmOverviewCard from "@/components/tbm/dashboard/TbmOverviewCard";
import { fetchActivatedTbms } from "@/lib/tbm/tbm-data";

export default async function Page() {
  // 获取已激活的 TBM 数据
  const data = await fetchActivatedTbms();

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // 数据加载中状态
  }

  console.log("data", data); // 调试输出数据

  

  return (
    <div className="w-full h-full  px-8 grid grid-cols-4 items-center justify-start bg-gray-800 text-gray-100">
      {/* 动态渲染每个  TbmOverviewCard 组件 */}
      {data.map((item) => (
        <TbmOverviewCard
          key={item.tbm_id}
          tbmId={item.tbm_id}
          subProjectId={item.sub_project_id}
        />
      ))}
    </div>
  );
}
