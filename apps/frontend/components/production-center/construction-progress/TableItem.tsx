"use client";

import { useDataContext } from "@/utils/WebSocketProvider";
import { TableCell, TableRow } from "@/components/ui/table";
import { EditProgress } from "./buttons"
import { Progress } from "@/components/ui/progress"
import { formatDecimal } from "@/utils/formatDecimal";
import { cursorTo } from "readline";



export default function TableItem({
  tunnel,
  index,
}: {
  tunnel: any;
  index: number;
}) {
  const context = useDataContext();
  const realtimeData = context?.latestData[tunnel.tbmcode];
  // console.log("context", context);
  //  console.log("realtimeData", realtimeData);
  //  console.log("tunnel", tunnel);

  tunnel = {
    ...tunnel,
    isPlcOnline: realtimeData?.isPlcOnline ?? false,
    thrustSpeed: realtimeData?.s010109001 ?? 0,
    currentRing: realtimeData?.s100100008 ?? 0,
    currentOpNum:realtimeData?.s100100005?? 0,   
    // 可以继续添加你需要的字段
  };

  return (
    <TableRow
      className={`h-8 text-center border-b border-b-slate-200 ${tunnel.isPlcOnline ? 'bg-green-100' : 'bg-red-100'
        }`}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{tunnel.projectShortName}</TableCell>
      <TableCell>

        <EditProgress tunnel={tunnel} />      </TableCell>

      <TableCell>{tunnel.tbmName || "未绑定"}</TableCell>
      <TableCell>{tunnel.ringEnd}</TableCell>
      <TableCell className="w-40 grid grid-cols-12 items-center"><Progress className="col-span-10" value={tunnel.currentRing / tunnel.ringEnd*100} /><div className="col-span-2">{tunnel.currentRing}</div></TableCell>
      <TableCell>{tunnel.planRingCount}</TableCell>
      <TableCell>{tunnel.dayRingStart} - {tunnel.currentRing}</TableCell>
      <TableCell>{tunnel.currentRing - tunnel.dayRingStart}</TableCell>
      <TableCell>{formatDecimal(tunnel.dayOpNumStart,1)} - {formatDecimal(tunnel.currentOpNum,1)}</TableCell>
      <TableCell>{formatDecimal(Math.abs(tunnel.dayOpNumStart-tunnel.currentOpNum),1)}</TableCell>
      <TableCell>{tunnel.isPlcOnline ? "在线" : "离线"}</TableCell>
      <TableCell className="text-right">编辑</TableCell>
    </TableRow>
  );
}
