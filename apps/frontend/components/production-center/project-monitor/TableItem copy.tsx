"use client";

import { useDataContext } from "@/utils/WebSocketProvider";
import { TableCell, TableRow } from "@/components/ui/table";
import { EditProgress } from "./buttons";
import {formatDecimal} from "@/utils/formatDecimal";



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
 // console.log("realtimeData", realtimeData);
 // console.log("tunnel", tunnel);

  tunnel = {
    ...tunnel,
    isPlcOnline: realtimeData?.isPlcOnline ?? false,
    currentRing: realtimeData?.s100100008 ?? 0,
    planRingCount: realtimeData?.s100900011 ?? 0,
    ringStart: realtimeData?.s100900001 ?? 0,
    excavationMode: realtimeData?.b000000001 ?? 0,
    segmentBuildMode: realtimeData?.b000000002 ?? 0,
    CHDTorgue: realtimeData?.s010102004 ?? 0,
    CHDSpeed: realtimeData?.s010109001 ?? 0,
    CHDPenetrationRate: realtimeData?.s050109001 ?? 0,
    thrustSpeed: realtimeData?.s050009003 ?? 0,
    thrustForce: realtimeData?.s050001001 ?? 0,
    thrustStroke: realtimeData?.s050006006 ?? 0,
    earthPressure: realtimeData?.s020901001 ?? 0,
  };

  return (
    <TableRow
      className={`h-8 text-center border-b border-b-slate-200 ${!tunnel.isPlcOnline ?  'bg-red-100':tunnel.excavationMode ? 'bg-green-100' : tunnel.segmentBuildMode ? 'bg-yellow-100' : 'bg-gray-100'
        }`}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{tunnel.projectShortName}</TableCell>
      <TableCell><EditProgress tunnel={tunnel} /></TableCell>
      <TableCell>{tunnel.tbmName || "未绑定"}</TableCell>
      <TableCell>{tunnel.realtime.s100100008}</TableCell>
      <TableCell>{tunnel.excavationMode ? "掘进" : tunnel.segmentBuildMode ? "拼装" : "待机"}</TableCell>
      <TableCell>{formatDecimal(tunnel.thrustForce,0)}</TableCell>
      <TableCell>{formatDecimal(tunnel.CHDTorgue,0)}</TableCell>
      <TableCell>{formatDecimal(tunnel.CHDSpeed,2)}</TableCell>
      <TableCell>{formatDecimal(tunnel.thrustSpeed,2)}</TableCell>
      <TableCell>{formatDecimal(tunnel.thrustStroke,0)}</TableCell>
      <TableCell>{formatDecimal(tunnel.CHDPenetrationRate,2)}</TableCell>
      <TableCell>{formatDecimal(tunnel.earthPressure,2)}</TableCell>
      <TableCell className="text-right">编辑</TableCell>
    </TableRow>
  );
}
