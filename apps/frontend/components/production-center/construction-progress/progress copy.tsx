import React from "react";
import { fetchProgressByTunnelId } from "@/lib/production-center/progress/data";
import dayjs from "dayjs";
import { Chart } from "./chart";

export default async function Progress() {
  const rawData = await fetchProgressByTunnelId(
    "5d124de7-75a0-429c-bb28-5136a62316b3"
  );

  const chartData = rawData.map((item) => {
    const date = new Date(item.report_date);
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();

    const ringDiff = (item.end_ring ?? 0) - (item.start_ring ?? 0); // 防止null出错

    return {
      date: `${month}月${day}日`,
      ringDiff: ringDiff,
    };
  });

  // 输出结果
  console.log(chartData);

  return (
    <div className="mt-6 mx-10 px-10 flow-root">
      <Chart chartData={chartData}/>
    </div>
  );
}
