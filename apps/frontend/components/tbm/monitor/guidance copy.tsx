"use client"; // 指定为客户端组件，确保可以使用 useState 和 useEffect 等 React Hook
import React from "react";
import { createColumnHelper,flexRender,getCoreRowModel,useReactTable } from "@tanstack/react-table"; // 引入表格创建助手
import { useDataContext } from "../WebSocketProvider"; // 获取数据上下文

type TbmGuidanceData = {
  tbmcode: string; // TBM 代码
  guidanceMileage: number; // 里程
  guidanceRingNumber: number; // 环号
  horizontalDeviationTrend: number; // 水平偏差趋势
  verticalDeviationTrend: number; // 垂直偏差趋势
  guidanceFrontPointRollAngle: number; // 前点滚动角
  guidanceFrontPointPitchAngle: number; // 前点俯仰角
  guidanceRearPointRollAngle: number; // 后点滚动角
  guidanceRearPointPitchAngle: number; // 后点俯仰角
  frontPointDeviationX: number; // 前点偏差X
  frontPointDeviationY: number; // 前点偏差Y
  rearPointDeviationX: number; // 后点偏差X
  rearPointDeviationY: number; // 后点偏差Y
  middlePointDeviationX: number; // 中点偏差X
  middlePointDeviationY: number; // 中点偏差Y
  timestamp: number; // 时间戳
};

export const Guidance = () => {
  const context = useDataContext(); // 获取数据上下文
  const tbmCodes = ["crec988", "s1286"]; // 假设有多个 TBM 代码
 // console.log("guidance context", context); // 调试输出

  if (!context) {
    return <div>数据加载中...</div>; // 如果 context 不存在，显示加载提示
  }

  const data:TbmGuidanceData[] = tbmCodes.map((tbmcode) => ({
    tbmcode,
    guidanceMileage: context?.latestData[tbmcode]?.s100100005, // 里程
    guidanceRingNumber: context?.latestData[tbmcode]?.s100100008, // 环号
    horizontalDeviationTrend: context?.latestData[tbmcode]?.s100100006, // 水平偏差趋势
    verticalDeviationTrend: context?.latestData[tbmcode]?.s100100007, // 垂直偏差趋势
    guidanceFrontPointRollAngle: context?.latestData[tbmcode]?.s100111009, // 前点滚动角
    guidanceFrontPointPitchAngle: context?.latestData[tbmcode]?.s100111010, // 前点俯仰角
    guidanceRearPointRollAngle: context?.latestData[tbmcode]?.s100111011, // 后点滚动角
    guidanceRearPointPitchAngle: context?.latestData[tbmcode]?.s100111012, // 后点俯仰角
    frontPointDeviationX: context?.latestData[tbmcode]?.s100206003, // 前点偏差X
    frontPointDeviationY: context?.latestData[tbmcode]?.s100206004, // 前点偏差Y
    rearPointDeviationX: context?.latestData[tbmcode]?.s100206006, // 后点偏差X
    rearPointDeviationY: context?.latestData[tbmcode]?.s100206007, // 后点偏差Y
    middlePointDeviationX: context?.latestData[tbmcode]?.s100206009, // 中点偏差X
    middlePointDeviationY: context?.latestData[tbmcode]?.s100206010, // 中点偏差Y
    timestamp: context?.latestData[tbmcode]?.timestamp, // 时间戳
  }));

  const columnHelper = createColumnHelper<TbmGuidanceData>()

  const table = useReactTable({
    data,
    columns: [
      columnHelper.accessor("tbmcode", {
        header: "盾构机",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("guidanceMileage", {
        header: "里程",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("guidanceRingNumber", {
        header: "环号",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("horizontalDeviationTrend", {
        header: "水平偏差趋势",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("verticalDeviationTrend", {
        header: "垂直偏差趋势",
        cell: (info) => info.getValue(),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.some((d) => !d)) {
    return <div>数据加载中...</div>; // 如果有任何数据为空，显示加载中
  }

  return (
    <div>
<table>
  <thead>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <th key={header.id}>
            {header.isPlaceholder ? null : (
              <div>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
</table>
    </div>
  );
};
