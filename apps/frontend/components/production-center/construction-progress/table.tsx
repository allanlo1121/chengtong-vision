import React from "react";
import TableItem from "./TableItem";

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
import { fetchInprogressTunnels } from "@/lib/resource-center/tunnel/data";

export default async function ProgressTable() {
  const tunnels = await fetchInprogressTunnels();
  console.log("tunnels", tunnels);

  return (
    <div className="mt-6 mx-10 px-10 flow-root">
      <Table>
        <TableCaption>A list of your recent items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4">序号</TableHead>
            <TableHead>项目名称</TableHead>
            <TableHead>区间名称</TableHead>
            <TableHead>盾构机型号</TableHead>
            <TableHead>设计环数</TableHead>
            <TableHead>累计完成</TableHead>
            <TableHead>PLC状态</TableHead>            
            {/*  <TableHead>剩余</TableHead>
            <TableHead>掘进环数</TableHead> */}
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tunnels.map((tunnel, index) => (
            <TableItem tunnel={tunnel} index={index} key={tunnel.id} />
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
