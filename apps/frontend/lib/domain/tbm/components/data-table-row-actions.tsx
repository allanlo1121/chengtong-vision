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

import { TbmListItem } from "@/lib/domain/tbm/types";

import { deleteTbmAction } from "../actions";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TbmListItem>) {
  const tbm = row.original as unknown as TbmListItem;
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("确认删除该隧道吗？")) return;

    try {
      const result = await deleteTbmAction(tbm.id!);

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
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">打开操作菜单</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={() => router.push(routes.tbms.edit(tbm.id!))}>
          编辑TBM
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(`/equip/tbms/${tbm.id}/assignment`)}>
          TBM绑定
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(routes.tbms.runtime(tbm.id!))}>
          TBM配置
        </DropdownMenuItem>

        {/* ===== 所属片区切换 ===== */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          删除TBM
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
