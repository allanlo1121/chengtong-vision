"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@frontend/components/ui/checkbox";

import { tunnelStatuses, tunnelTypes, regionNames } from "../data/data";
import { type TunnelOverview } from "@frontend/types/tunnels";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@frontend/components/ui/badge";

export const columns: ColumnDef<TunnelOverview>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目简称" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "regionName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属区域" />,
    cell: ({ row }) => {
      const region = regionNames.find((region) => region.value === row.getValue("regionName"));
      if (!region) {
        return null;
      }
      return (
        <div className="flex gap-2">
          {region && <Badge variant="outline">{region.label}</Badge>}
          {/* <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("regionName")}
                    </span> */}
        </div>
      );
    },
  },
  // {
  //     accessorKey: "fullname",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="项目全称" />
  //     ),
  //     cell: ({ row }) => <div className="w-[200px]">{row.getValue("fullname")}</div>,
  //     enableSorting: false,
  //     enableHiding: false,
  // },
  {
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属项目" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "workPointName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属工点" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("workPointName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "workPointFullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属工点全称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("workPointFullName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="施工状态" />,
    cell: ({ row }) => {
      const tunnelStatusName = tunnelStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!tunnelStatusName) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {tunnelStatusName.icon && (
            <tunnelStatusName.icon className="text-muted-foreground size-4" />
          )}
          <span>{tunnelStatusName.label}</span>
        </div>
      );
    },
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="管片环数" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("segmentCount")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "tbmName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机名称" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tbmName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  // {
  //     accessorKey: "projectTypeName",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="项目类型" />
  //     ),
  //     cell: ({ row }) => {
  //         const projectTypeName = tunnelTypes.find(
  //             (status) => status.value === row.getValue("projectTypeName")
  //         )

  //         if (!projectTypeName) {
  //             return null
  //         }

  //         return (
  //             <div className="flex w-[100px] items-center gap-2">
  //                 {projectTypeName.icon && (
  //                     <projectTypeName.icon className="text-muted-foreground size-4" />
  //                 )}
  //                 <span>{projectTypeName.label}</span>
  //             </div>
  //         )
  //     },
  // },

  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} />,
  },
];
