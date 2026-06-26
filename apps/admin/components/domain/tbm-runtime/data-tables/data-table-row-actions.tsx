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

import { deleteTbmDailyProgressAction } from "@/lib/domain/tbm-runtime/actions";
import { routes } from "@/lib/core/router/router";
import { TbmDailyProgressListItem } from "@/lib/domain/tbm-runtime/types/tbm-daily-progress.types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TbmDailyProgressListItem>) {
  const tbmDailyProgress = row.original as unknown as TbmDailyProgressListItem;
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("确认删除该TBM吗？")) return;

    deleteTbmDailyProgressAction(tbmDailyProgress.id)
      .then((res) => {
        if (res.success) {
          alert("删除成功");
          router.refresh();
        } else {
          alert("删除失败：" + res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("删除过程中发生错误");
      });
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
        <DropdownMenuItem onClick={() => router.push(routes.tbms.edit(tbmDailyProgress.id))}>
          编辑TBM
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(routes.tbms.runtime(tbmDailyProgress.id))}>
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
