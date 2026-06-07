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

import type { TbmPickerItem, TbmPickerQuery } from "../../types";
import { listTbmPicker } from "../../services/client";

type Props = {
  query: TbmPickerQuery;

  selected: TbmPickerItem | null;

  onSelectedChange: (row: TbmPickerItem) => void;
};

export function PickerTable({ query, selected, onSelectedChange }: Props) {
  const { data, isLoading } = useSWR(["tbm-picker", query], () => listTbmPicker(query));

  const columns: ColumnDef<TbmPickerItem>[] = [
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
      header: "盾构机名称",
    },

    {
      accessorKey: "code",
      header: "TBM编号",
    },

    {
      accessorKey: "manageCode",
      header: "管理编号",
    },
    {
      accessorKey: "tbmTypeName",
      header: "盾构机类型",
    },

    {
      accessorKey: "manufacturerName",
      header: "制造商",
    },
    {
      accessorKey: "diameter",
      header: "掘进直径",
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
