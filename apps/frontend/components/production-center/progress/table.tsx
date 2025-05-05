import React from "react";
// import {
//   UpdateTunnel,
//   DeleteTunnel,
// } from "@/components/resource-center/tunnel/buttons";
import { formatDecimal } from "@/utils/utils";
import { fetchProgressByTunnelId } from "@/lib/production-center/progress/data";
import dayjs from 'dayjs'

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

export default async function ProgressTable() {
  const data = await fetchProgressByTunnelId(
    "5d124de7-75a0-429c-bb28-5136a62316b3"
  );
  console.log(data);

  return (
    <div className="mt-6 mx-10 px-10 flow-root">
      <Table>
        <TableCaption>A list of your recent items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4">序号</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>开始桩号</TableHead>
            <TableHead>结束桩号</TableHead>
            <TableHead>开始环号</TableHead>
            <TableHead>结束环号</TableHead>
            <TableHead>掘进里程</TableHead>
            <TableHead>掘进环数</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{dayjs(item.report_date).format('YYYY年MM月DD日')}</TableCell>
              <TableCell>{item.max_op}</TableCell>
              <TableCell>{item.min_op}</TableCell>
              <TableCell>{item.start_ring}</TableCell>
              <TableCell>{item.end_ring}</TableCell>
              <TableCell>{formatDecimal(item.max_op - item.min_op)}</TableCell>
              <TableCell>{item.end_ring - item.start_ring}</TableCell>
              <TableCell className="text-right">编辑</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
