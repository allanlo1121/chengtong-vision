"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
// import { DataTableRowActions } from "../domain/tbm-runtime/data-tables/data-table-row-actions";
// import { formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/router/router";

import { TunnelProgressOverview } from "@/lib/domain/command-center/types";
import { calcDistance, formatMeters } from "@/lib/utils/format";

export const columns: ColumnDef<TunnelProgressOverview>[] = [
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
    accessorKey: "projectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目名称" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center items-center">
        {row.getValue("projectName")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tunnelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道名称" />,
    cell: ({ row }) => {
      const tunnelId = row.original.tunnelId;
      const tunnelName = row.original.tunnelName;
      return (
        <Link
          href={routes.tunnels.workspace(tunnelId!)}
          className="w-full text-primary text-center"
        >
          {tunnelName}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tbmName",
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="TBM名称" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("tbmName")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "todayRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="当日环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("todayRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "todayAdvanceMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="当日进尺" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("todayAdvanceMeter")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "weekRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="本周环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("weekRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "weekAdvanceMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="本周进尺" />,
    cell: ({ row }) => {
      return (
        <div className="w-full text-primary text-center">{row.getValue("weekAdvanceMeter")}</div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "monthRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="本月环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("monthRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "monthAdvanceMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="本月进尺" />,
    cell: ({ row }) => {
      return (
        <div className="w-full text-primary text-center">{row.getValue("monthAdvanceMeter")}</div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "totalAdvanceRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="总掘进环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("totalAdvanceRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "totalAdvanceMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="总进尺" />,
    cell: ({ row }) => {
      return (
        <div className="w-full text-primary text-center">{row.getValue("totalAdvanceMeter")}</div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "totalRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="总环数" />,
    cell: ({ row }) => (
      <div className="w-full text-primary text-center">{row.getValue("totalRingCount")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "totalLengthMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="总里程" />,
    cell: ({ row }) => {
      return (
        <div className="w-full text-primary text-center">{row.getValue("totalLengthMeter")}</div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "remainingRingCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="剩余环数" />,
    cell: ({ row }) => {
      const totalAdvanceRing = row.original.totalAdvanceRingCount ?? 0;
      const totalRing = row.original.totalRingCount ?? 0;

      const remaining = totalRing - totalAdvanceRing;

      return <div className="w-full text-primary text-center">{remaining}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "remainingLengthMeter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="剩余里程" />,
    cell: ({ row }) => {
      const totalAdvance = row.original.totalAdvanceMeter ?? 0;
      const totalLength = row.original.totalLengthMeter ?? 0;

      const remaining = formatMeters(calcDistance(totalLength - totalAdvance));

      return <div className="w-full text-primary text-center">{remaining}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
