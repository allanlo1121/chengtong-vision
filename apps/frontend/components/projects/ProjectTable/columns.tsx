"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@frontend/components/ui/checkbox";

import { projectStatuses, projectTypes, regions } from "../data/data";
import { type ProjectOverview } from "@frontend/types/projects";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@frontend/components/ui/badge";

export const columns: ColumnDef<ProjectOverview>[] = [
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
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "regionCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属区域" />,
    cell: ({ row }) => {
      const region = regions.find((region) => region.value === row.getValue("regionCode"));

      if (!region) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          <span>{region.label}</span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所属经理部" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("organizationName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "projectLeaderName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目负责人" />,
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("projectLeaderName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "projectStatusCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目状态" />,
    cell: ({ row }) => {
      const projectStatusName = projectStatuses.find(
        (status) => status.value === row.getValue("projectStatusCode")
      );

      if (!projectStatusName) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {projectStatusName.icon && (
            <projectStatusName.icon className="text-muted-foreground size-4" />
          )}
          <span>{projectStatusName.label}</span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "projectTypeCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目类型" />,
    cell: ({ row }) => {
      const projectTypeName = projectTypes.find(
        (type) => type.value === row.getValue("projectTypeCode")
      );

      if (!projectTypeName) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {projectTypeName.icon && (
            <projectTypeName.icon className="text-muted-foreground size-4" />
          )}
          <span>{projectTypeName.label}</span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: true,
  },

  {
    accessorKey: "projectManagementModeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目管理模式" />,
    cell: ({ row }) => <div className="w-[60px]">{row.getValue("projectManagementModeName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  // {
  //     accessorKey: "projectTypeCode",
  //     enableHiding: false,
  //     enableSorting: false,
  //     enableColumnFilter: true,
  // },
  {
    accessorKey: "projectRiskLevelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目风险等级" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectRiskLevelName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  // {
  //     accessorKey: "regionCode",
  //     enableHiding: false,
  //     enableSorting: false,
  //     enableColumnFilter: true,
  // },
  {
    accessorKey: "projectControlLevelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="项目控制等级" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("projectControlLevelName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "cityCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在城市" />,
    cell: ({ row }) => {
      const name = row.original.cityName as string | null;
      return <div className="w-[120px]">{name ?? "-"}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} />,
  },
];
