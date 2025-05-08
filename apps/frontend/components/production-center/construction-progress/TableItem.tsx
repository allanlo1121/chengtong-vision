"use client";

import { useDataContext } from "@/utils/WebSocketProvider";
import { TableCell, TableRow } from "@/components/ui/table";
import { EditProgress } from "./buttons"
import Link from "next/link";
import { Edit } from "lucide-react";
import { pl } from "date-fns/locale";

export default function TableItem({
  tunnel,
  index,
}: {
  tunnel: any;
  index: number;
}) {
  const context = useDataContext();
  const realtimeData = context?.latestData[tunnel.tbmcode];
  console.log("context", context);
  console.log("realtimeData", realtimeData);
  console.log("tunnel", tunnel);

  tunnel = {
    ...tunnel,
    isPlcOnline: realtimeData?.isPlcOnline ?? false,
    thrustSpeed: realtimeData?.s010109001 ?? 0,
    currentRing: realtimeData?.s100100008 ?? 0,
    planRingCount: realtimeData?.s100900011 ?? 0,
    ringStart: realtimeData?.s100900001 ?? 0,
    // 可以继续添加你需要的字段
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <EditProgress tunnel={tunnel} />
      </TableCell>
      <TableCell>{tunnel.shortName}</TableCell>
      <TableCell>{tunnel.tbmName || "未绑定"}</TableCell>
      <TableCell>{tunnel.ringEnd}</TableCell>
      <TableCell>{tunnel.currentRing}</TableCell>      
      <TableCell>{tunnel.planRingCount}</TableCell>
      <TableCell>{tunnel.currentRing-tunnel.ringStart}</TableCell>
      <TableCell>{tunnel.isPlcOnline ? "在线" : "离线"}</TableCell>
      <TableCell className="text-right">编辑</TableCell>
    </TableRow>
  );
}
