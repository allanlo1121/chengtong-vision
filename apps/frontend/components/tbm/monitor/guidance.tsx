"use client"; // 指定为客户端组件，确保可以使用 useState 和 useEffect 等 React Hook
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"; // 引入表格创建助手
import { useDataContext } from "../WebSocketProvider"; // 获取数据上下文

type TbmGuidanceData = {
  tbmcode: string; // TBM 代码
  guidanceMileage: string; // 里程
  guidanceRingNumber: string; // 环号
  horizontalDeviationTrend: string; // 水平偏差趋势
  verticalDeviationTrend: string; // 垂直偏差趋势
  guidanceFrontPointRollAngle: string; // 前点滚动角
  guidanceFrontPointPitchAngle: string; // 前点俯仰角
  guidanceRearPointRollAngle: string; // 后点滚动角
  guidanceRearPointPitchAngle: string; // 后点俯仰角
  frontPointDeviationX: string; // 前点偏差X
  frontPointDeviationY: string; // 前点偏差Y
  rearPointDeviationX: string; // 后点偏差X
  rearPointDeviationY: string; // 后点偏差Y
  middlePointDeviationX: string; // 中点偏差X
  middlePointDeviationY: string; // 中点偏差Y
  timestamp: number | "-"; // 时间戳
};

export const Guidance = () => {
  const context = useDataContext(); // 获取数据上下文
  const tbmCodes = ["crec988", "s1286"]; // 假设有多个 TBM 代码

  // 直接从 context 获取数据并处理
  const data: TbmGuidanceData[] = tbmCodes.map((tbmcode) => ({
    tbmcode,
    guidanceMileage:
      context?.latestData[tbmcode]?.s100100005?.toFixed(2) ?? "-", // 里程
    guidanceRingNumber:
      context?.latestData[tbmcode]?.s100100008?.toFixed(0) ?? "-", // 环号
    horizontalDeviationTrend:
      context?.latestData[tbmcode]?.s100100006?.toFixed(2) ?? "-", // 水平偏差趋势
    verticalDeviationTrend:
      context?.latestData[tbmcode]?.s100100007?.toFixed(2) ?? "-", // 垂直偏差趋势
    guidanceFrontPointRollAngle:
      context?.latestData[tbmcode]?.s100111009?.toFixed(2) ?? "-", // 前点滚动角
    guidanceFrontPointPitchAngle:
      context?.latestData[tbmcode]?.s100111010?.toFixed(2) ?? "-", // 前点俯仰角
    guidanceRearPointRollAngle:
      context?.latestData[tbmcode]?.s100111011?.toFixed(2) ?? "-", // 后点滚动角
    guidanceRearPointPitchAngle:
      context?.latestData[tbmcode]?.s100111012?.toFixed(2) ?? "-", // 后点俯仰角
    frontPointDeviationX:
      context?.latestData[tbmcode]?.s100206003?.toFixed(2) ?? "-", // 前点偏差X
    frontPointDeviationY:
      context?.latestData[tbmcode]?.s100206004?.toFixed(2) ?? "-", // 前点偏差Y
    rearPointDeviationX:
      context?.latestData[tbmcode]?.s100206006?.toFixed(2) ?? "-", // 后点偏差X
    rearPointDeviationY:
      context?.latestData[tbmcode]?.s100206007?.toFixed(2) ?? "-", // 后点偏差Y
    middlePointDeviationX:
      context?.latestData[tbmcode]?.s100206009?.toFixed(2) ?? "-", // 中点偏差X
    middlePointDeviationY:
      context?.latestData[tbmcode]?.s100206010?.toFixed(2) ?? "-", // 中点偏差Y
    timestamp: context?.latestData[tbmcode]?.timestamp ?? "-", // 时间戳
  }));

  const columnHelper = createColumnHelper<TbmGuidanceData>();

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
      columnHelper.accessor("guidanceFrontPointRollAngle", {
        header: "前点滚动角",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("guidanceFrontPointPitchAngle", {
        header: "前点俯仰角",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("guidanceRearPointRollAngle", {
        header: "后点滚动角",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("guidanceRearPointPitchAngle", {
        header: "后点俯仰角",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("frontPointDeviationX", {
        header: "前点偏差X",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("frontPointDeviationY", {
        header: "前点偏差Y",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rearPointDeviationX", {
        header: "后点偏差X",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rearPointDeviationY", {
        header: "后点偏差Y",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("middlePointDeviationX", {
        header: "中点偏差X",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("middlePointDeviationY", {
        header: "中点偏差Y",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("timestamp", {
        header: "时间戳",
        cell: (info) => info.getValue(),
      }),

    ],
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <div>数据加载中...</div>; // 如果没有数据，显示加载中
  }

  return (
    <div>
      <table className="w-screen border border-gray-500">
        <thead className="border border-gray-500 bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="border border-gray-500" key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border border-gray-500">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="border border-gray-500" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
