"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@frontend/components/ui/checkbox";
import { equipmentStatuses, tbmTypes, mechSourceTypes } from "../data/data";
import { type TbmRow } from "@frontend/types/tbms";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@frontend/components/ui/badge";

export const columns: ColumnDef<TbmRow>[] = [
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
    accessorKey: "managementNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="管理编号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("managementNumber")}</div>,
  },
  {
    accessorKey: "tbmName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机名称" />,
    cell: ({ row }) => (
      <Link href={`/tbms/${row.original.id}`} className="w-[80px] text-blue-600 hover:underline">
        {" "}
        {row.getValue("tbmName")}
      </Link>
    ),
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
    accessorKey: "tbmTypeCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机类型" />,
    cell: ({ row }) => {
      const tbmType = tbmTypes.find((type) => type.value === row.getValue("tbmTypeCode"));
      if (!tbmType) {
        return null;
      }
      return (
        <div className="flex gap-2">
          {tbmType && <Badge variant="outline">{tbmType.label}</Badge>}
          {/* <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("regionName")}
                    </span> */}
        </div>
      );
    },
  },
  {
    accessorKey: "tbmModel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机规格" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("tbmModel")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "ownerSubjectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机产权" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("ownerSubjectName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "equipmentStatusName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="设备状态" />,
    cell: ({ row }) => {
      const status = equipmentStatuses.find(
        (status) => status.value === row.getValue("equipmentStatusName")
      );
      if (!status) {
        return null;
      }
      return (
        <div className="flex gap-2">
          {status && <Badge variant="outline">{status.label}</Badge>}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "mechSourceTypeCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="盾构机来源" />,
    cell: ({ row }) => {
      const tbmSource = mechSourceTypes.find(
        (source) => source.value === row.getValue("mechSourceTypeCode")
      );
      return <div className="w-[120px]">{tbmSource ? tbmSource.label : ""}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "manufacturerSubjectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="制造单位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("manufacturerSubjectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "custodianSubjectName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="所在单位" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("custodianSubjectName")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} />,
  },
];
