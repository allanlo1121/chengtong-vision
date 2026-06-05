"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EmployeeListItem } from "@/lib/domain/employee/types";

import { useCrudMutation } from "@/lib/ui/crud/hooks/useCrudMutation";
// import { deleteEmployeeAction } from "../actions/delete.action";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";
import { deleteEmployeeAction } from "../actions";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<EmployeeListItem>) {
  const employee = row.original as unknown as EmployeeListItem;
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("确认删除该员工吗？")) return;

    try {
      const result = await deleteEmployeeAction(employee.id!);

      if (!result.success) {
        toast.error(result.message ?? "删除失败");
        return;
      }

      toast.success(result.message ?? "删除成功");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={() => router.push(routes.employees.edit(employee.id!))}>
          编辑员工
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== 所属片区切换 ===== */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          删除员工
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
