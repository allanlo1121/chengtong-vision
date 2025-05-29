'use client'

import React, { useMemo } from "react";

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
import { Button } from "@/components/ui/button";
import { EditProgress } from "./buttons"
import { Progress } from "@/components/ui/progress"
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { formatDecimal } from "@/utils/formatDecimal";



type Tunnel = {
  id: string;
  short_name: string;
  region_name: string;
  status: string;
  project_short_name: string;
  ring_start: number;
  ring_end: number;
  total: number;
  op_num_start: number;
  op_num_end: number;
  current_op: number;
  current_ring: number;
  tbm_name: string;
};





export default function ProgressTable() {


  const { tunnels } = useTunnelFilter();

  if (!tunnels || tunnels.length === 0) {
    return <div className="text-center text-gray-500">没有数据</div>;
  }

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
            <TableHead className="text-center">累计完成环数</TableHead>
            <TableHead className="text-center">累计掘进距离</TableHead>

            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tunnels.map((tunnel, index) => (
            <TableRow key={tunnel.id} className="h-8 text-center border-b border-b-slate-200 "           >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{tunnel.projectShortName}</TableCell>
              <TableCell>
                <EditProgress tunnelId={tunnel.id}><Button variant="outline">{tunnel.shortName} </Button></EditProgress>     </TableCell>
              <TableCell>{tunnel.tbmName || "未绑定"}</TableCell>
              <TableCell>{tunnel.ringEnd}</TableCell>
              <TableCell className="w-40 grid grid-cols-12 items-center"><Progress className="col-span-10" value={tunnel.currentRing / tunnel.ringEnd * 100} /><div className="col-span-2">{tunnel.currentRing}</div></TableCell>
              <TableCell>{formatDecimal((tunnel.currentOp - tunnel.opNumStart), 0)}</TableCell>

              <TableCell className="text-right">编辑</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right"> 环</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
