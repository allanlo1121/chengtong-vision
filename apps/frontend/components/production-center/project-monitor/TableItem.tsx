"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { EditProgress } from "./buttons";
import { formatDecimal } from "@/utils/formatDecimal";
import { ITunnelTask } from "@/lib/project/tunnel/types";



export default function TableItem({
  tunnel,
  index,
  paramColumns,
}: {
  tunnel: ITunnelTask & { realtime?: Record<string, any> } & { hasRealtime?: boolean };
  index: number;
  paramColumns: { key: string; label: string; digits: number }[];
}) {
  //console.log("paramColumns", paramColumns);

  const data = tunnel.realtime || {};
  return (
    <TableRow
      className={`h-8 text-center border-b border-b-slate-200 ${!tunnel.hasRealtime || !data.isPlcOnline ? 'bg-red-100' : data.b000000001 ? 'bg-green-100' : data.b000000002 ? 'bg-yellow-100' : 'bg-gray-100'
        }`}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{tunnel.projectShortName}</TableCell>
      <TableCell>{tunnel.shortName} </TableCell>
      <TableCell>{tunnel.tbmName || "未绑定"}</TableCell>
      <TableCell>{data?.s100100008}</TableCell>
      <TableCell>
        {!tunnel.hasRealtime || !data.isPlcOnline
          ? "掉线"
          : data.b000000001
            ? "掘进"
            : data.b000000002
              ? "拼装"
              : "待机"}
      </TableCell>

      {paramColumns.map((param) => (
        <TableCell key={param.key} className="text-center">
          {data[param.key] != null
            ? formatDecimal(data[param.key], param.digits ?? 2)
            : "-"}
        </TableCell>
      ))}
      <TableCell className="text-right">编辑</TableCell>
    </TableRow>
  );
}
