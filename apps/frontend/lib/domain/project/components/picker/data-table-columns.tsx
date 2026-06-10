"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { ProjectPickerItem } from "../../types";

export const projectPickerColumns: ColumnDef<ProjectPickerItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="工程简称" />,
    cell: ({ row }) => {
      const project = row.original;
      return <div className="w-[80px]">{project.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="工程全称" />,
    cell: ({ row }) => {
      const project = row.original;
      return <div className="w-[80px]">{project.fullName}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属组织" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "regionName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属片区" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("regionName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "statusName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="施工状态" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("statusName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
];
