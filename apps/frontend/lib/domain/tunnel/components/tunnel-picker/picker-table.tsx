"use client";

import useSWR from "swr";

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { TunnelPickerItem, TunnelPickerQuery } from "../../types";
import { listTunnelPicker } from "../../services/client";

type Props = {
  query: TunnelPickerQuery;

  selected: TunnelPickerItem | null;

  onSelectedChange: (row: TunnelPickerItem) => void;
};

export function PickerTable({ query, selected, onSelectedChange }: Props) {
  const { data, isLoading } = useSWR(["tunnel-picker", query], () => listTunnelPicker(query));

  console.log("picker tunnel table data:", data);

  const columns: ColumnDef<TunnelPickerItem>[] = [
    {
      id: "select",
      header: "",
      cell: ({ row }) => (
        <RadioGroup value={selected?.id}>
          <RadioGroupItem value={row.original.id} onClick={() => onSelectedChange(row.original)} />
        </RadioGroup>
      ),
    },

    {
      accessorKey: "name",
      header: "隧道名称",
    },

    {
      accessorKey: "organizationName",
      header: "项目部名称",
    },
    {
      accessorKey: "projectName",
      header: "项目名称",
    },

    {
      accessorKey: "tunnelStatusName",
      header: "隧道施工状态",
    },
  ];

  const rows = data?.success ? data.data.items : [];

  const table = useReactTable({
    data: rows,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>加载中...</TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={selected?.id === row.original.id ? "bg-muted" : ""}
                onClick={() => onSelectedChange(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
