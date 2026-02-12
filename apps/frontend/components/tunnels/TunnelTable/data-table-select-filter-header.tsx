"use client";

import { Column } from "@tanstack/react-table";
import { cn } from "@frontend/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@frontend/components/ui/select";

export type SelectOption = {
  label: string;
  value: string;
};

interface DataTableSelectFilterHeaderProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, unknown>;
  title: string;
  options: SelectOption[];
}

export function DataTableSelectFilterHeader<TData>({
  column,
  title,
  options,
  className,
}: DataTableSelectFilterHeaderProps<TData>) {
  const value = column.getFilterValue() as string | undefined;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm font-medium">{title}</span>
      <Select
        value={value ?? "__all"}
        onValueChange={(val) => {
          column.setFilterValue(val === "__all" ? undefined : val);
        }}
      >
        <SelectTrigger className="h-6">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all">全部</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
