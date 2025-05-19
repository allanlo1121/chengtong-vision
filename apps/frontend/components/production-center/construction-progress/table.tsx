'use client'

import React, { useMemo } from "react";
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
import { getSortedTunnelsByTask, getTotalExcavatedRings } from "@/lib/project/tunnel/utils";



export default function ProgressTable({ tunnels }: { tunnels: ITunnelTask[] }) {
  // const tunnels = await fetchInprogressTunnels();
  // console.log("tunnels", tunnels);

  const { latestData } = useDataContext();
  //console.log("latestData", latestData);

  // 整合 realdata + 排序
  const enrichedAndSorted = useMemo(() => {
    return getSortedTunnelsByTask(tunnels, latestData)
  }, [tunnels, latestData])

  const totalRings = useMemo(() => {
    return getTotalExcavatedRings(enrichedAndSorted);
  }, [enrichedAndSorted]);

  return (
    <div className="mt-6 mx-10 px-10 flow-root">
      <Table>
        <TableCaption>A list of your recent items.</TableCaption>
        <TableHeader>
          <TableRow className="h-8 text-center bg-blue-400">
            <TableHead className="w-4 text-center">序号</TableHead>
            <TableHead className="text-center">项目名称</TableHead>
            <TableHead className="text-center">区间名称</TableHead>
            <TableHead className="text-center">盾构机型号</TableHead>
            <TableHead className="text-center">设计环数</TableHead>
            <TableHead className="text-center">累计完成</TableHead>
            <TableHead className="text-center">今日计划</TableHead>
            <TableHead className="text-center">掘进环号</TableHead>
            <TableHead className="text-center">今日完成</TableHead>
            <TableHead className="text-center">里程范围</TableHead>
             <TableHead className="text-center">掘进距离</TableHead>
            <TableHead className="text-center">PLC状态</TableHead>
            {/*  <TableHead>剩余</TableHead>
            <TableHead>掘进环数</TableHead> */}
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedAndSorted.map((tunnel, index) => (
            <TableItem tunnel={tunnel} index={index} key={tunnel.id} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{totalRings} 环</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
