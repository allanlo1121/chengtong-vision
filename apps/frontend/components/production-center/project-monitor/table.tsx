'use client'

import React, { useMemo, useState } from "react";
import TableItem from "./TableItem";
import { useDataContext } from "@/utils/WebSocketProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITunnelTask } from "@/lib/project/tunnel/types";
import { getSortedTunnelsByStatus } from "@/lib/project/tunnel/utils";
import { ITbmAdvanceParam } from "@/lib/tbm/types";

export default function MonitorTable({ tunnels, tbmAdvanceParams }: { tunnels: ITunnelTask[], tbmAdvanceParams: ITbmAdvanceParam[] }) {
  // console.log("tunnels", tunnels);
  // console.log("tbmAdvanceParams", tbmAdvanceParams);

  const [viewKey, setViewKey] = useState("default");

  const { latestData } = useDataContext();

  // 假设 paramList 是从后端传过来的
  //const paramList = [...]; // 你已有的字段数组

  // 根据 code 快速查找对应的字段对象
  const paramMap = Object.fromEntries(tbmAdvanceParams.map(p => [p.code, p]));

  // 构建参数视图配置
  const PARAMETER_VIEWS =
    [
      {
        key: "default",
        label: "推进参数",
        columns: [
          "s050001001",
          "s050009003",
          "s010102004",
          "s010109001",
          "s050109001",
          "s050006006",
          "s020901001",
        ],
      },
      {
        key: "guidance",
        label: "导向数据",
        columns: [
          "s100111009",
          "s100111010",
          "s100111011",
          "s100111012",
          "s100206003",
          "s100206004",
          "s100206006",
          "s100206007",
          "s100206009",
          "s100206010",
        ],
      },
    ];




  // 整合 realdata + 排序
  const enrichedAndSorted = useMemo(() => {
    return getSortedTunnelsByStatus(tunnels, latestData)
  }, [tunnels, latestData])

  const currentView = PARAMETER_VIEWS.find((v) => v.key === viewKey) || PARAMETER_VIEWS[0];

  const parameterColumns = currentView.columns.map((code) => ({
    key: code,
    label: paramMap[code]?.name || code,
    digits: paramMap[code]?.digits ?? 2,
  }));

  return (
    <div className="mt-6 mx-10 px-10 flow-root">
      {/* 视图切换按钮 */}
      <div className="mb-4 space-x-2">
        {PARAMETER_VIEWS.map((view) => (
          <button
            key={view.key}
            className={`px-4 py-1 border rounded ${view.key === viewKey ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
            onClick={() => setViewKey(view.key)}
          >
            {view.label}
          </button>
        ))}
      </div>
      <Table>
        <TableCaption>A list of your recent items.</TableCaption>
        <TableHeader>
          <TableRow className="h-8 text-center bg-blue-400">
            <TableHead className="w-4 text-center">序号</TableHead>
            <TableHead className="text-center">项目名称</TableHead>
            <TableHead className="text-center">区间名称</TableHead>
            <TableHead className="text-center">盾构机型号</TableHead>
            <TableHead className="text-center">当前环号</TableHead>
            <TableHead className="text-center">盾构机状态</TableHead>
            {/* 动态参数列 */}
            {parameterColumns.map((param) => (
              <TableHead key={param.key} className="text-center">
                {param.label}
              </TableHead>
            ))}

            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedAndSorted.map((tunnel, index) => (
            <TableItem tunnel={tunnel} index={index} key={tunnel.id} paramColumns={parameterColumns} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">100.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
