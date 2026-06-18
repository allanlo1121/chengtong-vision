"use client";
import * as React from "react";
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
import {
  TbmDailyProgress,
  TbmDailyProgressListItem,
} from "@/lib/domain/tbm-runtime/types/tbm-daily-progress.types";
import { UpdateTbmDailyProgressDrawer } from "../update-daily-progress-drawer";
import { UpdateTbmDailyProgressInput } from "@/lib/domain/tbm-runtime/schemas";

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const updateTbmDailyProgress: UpdateTbmDailyProgressInput = {
    id: tbmDailyProgress.id,
    tbmId: tbmDailyProgress.tbmId!,
    ringEnd: tbmDailyProgress.ringEnd!,
    chainageEnd: tbmDailyProgress.chainageEnd!,
    workDate: tbmDailyProgress.workDate!,
    planRingCount: tbmDailyProgress.planRingCount!,
  };

  const handleDelete = () => {
    if (!confirm("确认删除该进度吗？")) return;

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">打开操作菜单</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem onClick={() => setDrawerOpen(true)}>编辑进度</DropdownMenuItem>

          {/* ===== 所属片区切换 ===== */}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            删除进度
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateTbmDailyProgressDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        data={updateTbmDailyProgress}
      />
    </>
  );
}
