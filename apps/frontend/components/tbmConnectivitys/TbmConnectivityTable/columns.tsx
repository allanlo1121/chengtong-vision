"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@frontend/components/ui/checkbox";

import { tbmOperationStatuses } from "../data/data";
import { type TbmConnectivityRow } from "@frontend/types/realtime";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@frontend/components/ui/badge";
import OnlineDot from "@frontend/components/online-dot";

export const columns: ColumnDef<TbmConnectivityRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tbmName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机名称" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("tbmName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tbmCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机编号" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("tbmCode")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tunnelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tunnelName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tbmOperationStatusCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机状态" />,
    cell: ({ row }) => {
      const tbmOperationStatus = tbmOperationStatuses.find(
        (type) => type.value === row.getValue("tbmOperationStatusCode")
      );
      if (!tbmOperationStatus) {
        return null;
      }
      return (
        <div className="flex w-[100px] items-center gap-2">
          {tbmOperationStatus.icon && (
            <tbmOperationStatus.icon className="text-muted-foreground size-4" />
          )}
          <span>{tbmOperationStatus.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "plcOnline",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PLC在线状态" />,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <OnlineDot value={row.getValue("plcOnline")} />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "networkOnline",
    header: ({ column }) => <DataTableColumnHeader column={column} title="网络状态" />,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <OnlineDot value={row.getValue("networkOnline")} />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目名称" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("projectName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "workPointName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="区间名称" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("workPointName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "tunnelLength",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道长度" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tunnelLength")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "segmentCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="环号数量" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("segmentCount")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "lastRealdataAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="最后实况时间" />,
    cell: ({ row }) => <div className="w-[160px]">{row.getValue("lastRealdataAt")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "lastHeartbeatAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="最后心跳时间" />,
    cell: ({ row }) => <div className="w-[160px]">{row.getValue("lastHeartbeatAt")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} />,
  },
];
